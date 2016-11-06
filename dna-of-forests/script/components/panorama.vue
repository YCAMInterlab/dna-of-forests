<template lang="pug">

#container
  <start-modal v-if="$route.path=='/'"></start-modal>

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

var THREE = THREELib();

// 登録
Vue.component('sound-button', require('./sound-button.vue'));
Vue.component('start-modal',  require('./start-modal.vue'));

export default Vue.extend({

  mounted: function() {

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

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
    this.camera.target = new THREE.Vector3( 0, 0, 0 );

    this.scene = new THREE.Scene();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

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
      this.scene.add( this.create_marker('sample', geo.x, geo.y, geo.z, 's-'+(i+1)) );
    }

    // // 森の知識マーカー
    for(var i = 0; i<this.knowledges.length; i++){
      var data = this.knowledges[i].marker_position;
      var geo = this.translateGeoCoords(data.latitude, data.longtitude, data.radius);
      this.scene.add( this.create_marker('knowledge', geo.x, geo.y, geo.z, 'k-'+(i+1)) );
    }

    // 座標軸の表示
    // var axis = new THREE.AxisHelper(300);
    // axis.position.set(0,-10,0); // 原点だとカメラと同じ視点になるので表示されない
    // this.scene.add(axis);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.$el.offsetWidth, window.innerHeight );
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
      var w = this.$el.offsetWidth;
      var h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( w, h );
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

    // マーカー
    create_marker(type, x=0, y=0, z=0, key){
      console.log('key',key);
      // 15cmくらい
      var geometry = (type=='sample') ? new THREE.TetrahedronGeometry(0.15) : new THREE.SphereGeometry(0.15, 8, 8);
      // geometry.scale( - 1, 1, 1 );
      var material = new THREE.MeshLambertMaterial({
        color: 0xffffff
      });
      var marker = new THREE.Mesh( geometry, material );

      marker.position.set( x, y, z );
      marker.key = key;
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

      this.raycaster.setFromCamera( this.mouse, this.camera );

      var intersects = this.raycaster.intersectObjects( this.markers );

      if ( intersects.length > 0 ) {

        var clicked_marker = intersects[0];

        if(clicked_marker.object.material.color.r!=1){
          clicked_marker.object.material.color.r = 1;
        }
        else{
          clicked_marker.object.material.color.r = 0;
        }

        this.$router.push('/panorama/'+clicked_marker.object.key);

        console.log('clicked:', clicked_marker.object.key);

        // intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
        // var particle = new THREE.Sprite( particleMaterial );
        // particle.position.copy( intersects[ 0 ].point );
        // particle.scale.x = particle.scale.y = 16;
        // scene.add( particle );

      }

      /*
      // Parse all the faces
      for ( var i in intersects ) {

        intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

      }
      */
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