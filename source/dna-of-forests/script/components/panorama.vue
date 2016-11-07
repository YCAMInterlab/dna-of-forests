<template lang="pug">

#container
  <start-modal v-if="$route.path=='/'"></start-modal>
  .marker.sample(v-for="(item, index) in samples" v-bind:id="'s-'+(index+1)" v-on:click="$router.push('./s-'+(index+1))")
  .marker.knowledge(v-for="(item, index) in knowledges" v-bind:id="'k-'+(index+1)" v-on:click="$router.push('./k-'+(index+1))")

</template>

<style lang="sass?indentedSyntax" scoped>

section
  height: 100%
  overflow: hidden

</style>

<script>

import Vue from 'vue';
import THREELib from 'three-js';
import Cookies from 'js-cookie';

var THREE = THREELib(["Projector"]);

// 登録
Vue.component('sound-button', require('./sound-button.vue'));
Vue.component('start-modal',  require('./start-modal.vue'));

export default Vue.extend({

  mounted: function() {

    this.width = this.$el.offsetWidth;
    this.height = window.innerHeight;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.raycaster = null;
    this.mouse = null;
    this.onPointerDownLon = null;
    this.onPointerDownLat = null;
    this.phi = 0;
    this.theta = 0;
    this.lon = (Cookies.get('lon') || 0)*1;
    this.lat = (Cookies.get('lat') || 0)*1;
    this.onPointerDownPointerX = null;
    this.onPointerDownPointerY = null;
    this.isUserInteracting = false;
    this.markers = [];

    this.projector     = new THREE.Projector();
    this.frustum       = new THREE.Frustum();
    this.scene         = new THREE.Scene();
    this.raycaster     = new THREE.Raycaster();
    this.mouse         = new THREE.Vector2();
    this.camera        = new THREE.PerspectiveCamera( 75, this.width / this.height, 1, 1100 );
    this.camera.target = new THREE.Vector3( 0, 0, 0 );

    // 光
    var ambient = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambient);

    // ジオメトリの追加

    var pano_sphere = this.create_pano_sphere();
    this.scene.add( pano_sphere );

    // グリッド
    // var sphere = new THREE.Mesh(
    //   new THREE.SphereGeometry( 500, 36, 18 ),
    //   new THREE.MeshPhongMaterial({
    //     color: 0xffffff,
    //     wireframe: true
    //   })
    // );
    // this.scene.add(sphere);

    // 半径は全てメートルで大体目測で合わせる
    // サンプルマーカー
    for(var i = 0; i<this.samples.length; i++){
      var data = this.samples[i].marker_position;
      var geo = this.translateGeoCoords(data.latitude, data.longtitude, data.radius);
      this.create_marker('sample', 's-'+(i+1), geo.x, geo.y, geo.z);
    }

    // // 森の知識マーカー
    for(var i = 0; i<this.knowledges.length; i++){
      var data = this.knowledges[i].marker_position;
      var geo = this.translateGeoCoords(data.latitude, data.longtitude, data.radius);
      this.create_marker('knowledge', 'k-'+(i+1), geo.x, geo.y, geo.z);
    }

    // 座標軸の表示
    // var axis = new THREE.AxisHelper(300);
    // axis.position.set(0,-10,0); // 原点だとカメラと同じ視点になるので表示されない
    // this.scene.add(axis);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.width, this.height );
    this.$el.appendChild( this.renderer.domElement );

    window.addEventListener( 'resize', this.onWindowResize, false );
    document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
    document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
    document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', this.onDocumentMouseUp, false );
    // document.addEventListener( 'mousewheel', this.onDocumentMouseWheel, false );
    document.addEventListener( 'MozMousePixelScroll', this.onDocumentMouseWheel, false);

    document.addEventListener( 'dragover', function( e ) {

      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';

    }, false );

    document.addEventListener( 'dragenter', function( e ) {

      document.body.style.opacity = 0.5;

    }, false );

    document.addEventListener( 'dragleave', function( e ) {

      document.body.style.opacity = 1;

    }, false );

    document.addEventListener( 'drop', function( e ) {

      e.preventDefault();

      var reader = new FileReader();
      reader.addEventListener( 'load', function( e ) {

        material.map.image.src = e.target.result;
        material.map.needsUpdate = true;

      }, false );
      reader.readAsDataURL( e.dataTransfer.files[ 0 ] );

      document.body.style.opacity = 1;

    }, false );

    this.animate();
  },

  methods: {

    animate( ts ) {

      requestAnimationFrame( this.animate );
      this.update();
    },

    render( elapsed, ts ) {

      if (this.options.orbitControls) {
        let position = this.camera.position.toArray();
        let direction = this.target.toArray();
        this.controls.update(position, direction);
        this.camera.position.fromArray(position);
        this.camera.lookAt(this.target.fromArray(direction));
      }

      if ( this.options.postprocessing ) {
        this.postprocessing.render( elapsed, ts, this.tick );
      } else {
        this.renderer.render( this.scene, this.camera );
      }
    },

    onWindowResize() {
      this.width = this.$el.offsetWidth;
      this.height = window.innerHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( this.width, this.height );
    },

    update() {

      // if ( this.isUserInteracting === false ) {
      //   this.lon += 0.05;
      // }

      this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
      this.phi = THREE.Math.degToRad( 90 - this.lat );
      this.theta = THREE.Math.degToRad( this.lon );

      this.camera.target.x = 500 * Math.sin( this.phi ) * Math.cos( this.theta );
      this.camera.target.y = 500 * Math.cos( this.phi );
      this.camera.target.z = 500 * Math.sin( this.phi ) * Math.sin( this.theta );

      this.camera.lookAt( this.camera.target );

      /*
      // distortion
      this.camera.position.copy( this.camera.target ).negate();
      */
      this.renderer.render( this.scene, this.camera );

      this.frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( this.camera.projectionMatrix, this.camera.matrixWorldInverse ) );

      // Update 2D markers
      for(var i = 0; i < this.markers.length; i++){
        var marker = this.markers[i];
        var pos = this.getTwoDPosition(marker.position);
        var el = this.$el.querySelector('#' + marker.key);
        if(pos){
          // Within camera view
          var top = pos.y;
          var left = pos.x;
          if(marker.type=='sample'){
            top -= 7;
            left -= 7;
          }
          else{
            top -= 5;
            left -= 5;
          }

          el.style.display = 'block';
          el.style.top = top+'px';
          el.style.left = left+'px';
        }
        else{
          // Outside camera view
          el.style.display = 'none';
        }
      }
    },

    // パノラマ画像を貼り付けた球体
    create_pano_sphere(){
      var geometry = new THREE.SphereGeometry( 500, 120, 120 );
      geometry.scale( - 1, 1, 1 );

      var video = document.getElementById( 'video' );
      var texture = new THREE.VideoTexture( video );
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;

      var material = new THREE.MeshBasicMaterial( {
        map: texture
      });
      return new THREE.Mesh( geometry, material );
    },

    // 緯度経度から位置を算出
    translateGeoCoords(latitude, longitude, radius) {

      // 仰角
      var phi = (latitude) * Math.PI / 180;
      // 方位角
      var theta = (longitude - 180) * Math.PI / 180;

      var x = -(radius) * Math.cos(phi) * Math.cos(theta);
      var y = (radius) * Math.sin(phi);
      var z = (radius) * Math.cos(phi) * Math.sin(theta);

      return new THREE.Vector3(x, y, z);
    },

    getTwoDPosition(vector) {

      var vector = vector.clone();
      var widthHalf = 0.5*this.renderer.context.canvas.width;
      var heightHalf = 0.5*this.renderer.context.canvas.height;

      // 何もしないと対角線上の位置も返してしまうので、ここで間引く
      if(this.frustum.containsPoint(vector)) {

        // Within camera
        vector.project(this.camera);

        vector.x = ( vector.x * widthHalf ) + widthHalf;
        vector.y = - ( vector.y * heightHalf ) + heightHalf;

        return {
          x: vector.x,
          y: vector.y
        };
      }
      return null;
    },

    // マーカー
    create_marker(type, key, x=0, y=0, z=0){

      var marker = {};

      marker.position = new THREE.Vector3( x, y, z );

      marker.key = key;
      marker.type = type;

      this.markers.push( marker );

      return marker;
    },

    onDocumentTouchStart( e ) {

      e.preventDefault();

      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
      onDocumentMouseDown( e );

    },

    onDocumentMouseDown( e ) {

      e.preventDefault();

      this.isUserInteracting = true;

      this.onPointerDownPointerX = e.clientX;
      this.onPointerDownPointerY = e.clientY;

      this.onPointerDownLon = this.lon;
      this.onPointerDownLat = this.lat;

      // -----

      this.mouse.x = ( e.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
      this.mouse.y = - ( e.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
    },

    onDocumentMouseMove( e ) {

      if ( this.isUserInteracting === true ) {
        this.lon = ( this.onPointerDownPointerX - e.clientX ) * 0.1 + this.onPointerDownLon;
        this.lat = ( e.clientY - this.onPointerDownPointerY ) * 0.1 + this.onPointerDownLat;
      }

    },

    onDocumentMouseUp( e ) {

      this.isUserInteracting = false;

      Cookies.set('lon', this.lon);
      Cookies.set('lat', this.lat);
    },

    onDocumentMouseWheel( e ) {

      // WebKit
      if ( e.wheelDeltaY ) {
        this.camera.fov -= e.wheelDeltaY * 0.05;
      // Opera / Explorer 9
      } else if ( e.wheelDelta ) {
        this.camera.fov -= e.wheelDelta * 0.05;
      // Firefox
      } else if ( e.detail ) {
        this.camera.fov += e.detail * 1.0;
      }
      this.camera.updateProjectionMatrix();
    }

  },
  // TODO: 直接ルートのComponentから受け渡せないか？
  data () {
    return require('../data.json');
  }
});
</script>