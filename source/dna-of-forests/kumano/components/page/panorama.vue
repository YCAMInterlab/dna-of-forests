<template lang="pug">

#container(:data-lang="$root.$i18n.locale")
  <transition name="instruction_anim">
    <instruction-modal v-if="!$root.isAlreadyDragged"/>
  </transition>
  <transition name="fade">
    <entrance-modal v-if="$route.path=='/'"/>
  </transition>
  a.ycam(:href="$t('panorama.ycam')" target="_blank")
    imgr(src="panorama/ycam-logo.png")
  p.copyright
    | Field Guide “DNA of Forests”
    br
    | by
    a(:href="$t('panorama.ycam')" target="_blank" style="margin-left: 0.4em;") Yamaguchi Center for Arts and Media [YCAM]
    br
    | is licensed under a
    br
    a(:href="$t('panorama.cc')" target="_blank") Creative Commons License CC BY-SA 4.0
  .marker.sample(v-for="(item, index) in samples" v-bind:id="'s-'+(index+1)" v-bind:class="{ selected: $route.path=='/panorama/s-'+(index+1) }" v-on:click="$router.push('/panorama/s-'+(index+1))")
    //- 日本語なら画像、英語ならテキストでラベルを表示
    imgr.label(v-bind:alt="item.genus.ja" v-bind:src="'panorama/marker-text/sample-ja/'+filename(item.genus.en)+'.png'" v-if="$root.$i18n.locale === 'ja'")
    span.label(v-else) {{ item.genus.en }}
    <dna-barcode-bg v-if="item.dna_sequences" :dna="item.dna_sequences[0].text" />
  .marker.knowledge(v-for="(item, index) in knowledges" v-bind:id="'k-'+(index+1)" v-bind:class="{ selected: $route.path=='/panorama/k-'+(index+1) }" v-on:click="$router.push('/panorama/k-'+(index+1))")
    //- 日本語なら画像、英語ならテキストでラベルを表示
    imgr.label(v-bind:src="'panorama/marker-text/knowledge/'+(index+1)+'.png'" v-if="$root.$i18n.locale === 'ja'")
    span.label(v-else) {{ item.title.en }}

</template>

<style lang="sass?indentedSyntax" scoped>

@keyframes flash
    0%
      opacity: 0.4
    50%
      opacity: 1
    100%
      opacity: 0.4
@-webkit-keyframes flash
    0%
      opacity: 0.4
    50%
      opacity: 1
    100%
      opacity: 0.4
@-moz-keyframes flash
    0%
      opacity: 0.4
    50%
      opacity: 1
    100%
      opacity: 0.4

@keyframes hover_flash
    0%
      opacity: 1
    50%
      opacity: 0.4
    100%
      opacity: 1
@-webkit-keyframes hover_flash
    0%
      opacity: 1
    50%
      opacity: 0.4
    100%
      opacity: 1
@-moz-keyframes hover_flash
    0%
      opacity: 1
    50%
      opacity: 0.4
    100%
      opacity: 1

.fade-enter-active,
.fade-leave-active
  transition: opacity 1.5s
.fade-enter,
.fade-leave-active
  opacity: 0

.instruction_anim-enter-active,
.instruction_anim-leave-active
  transition: opacity 0.3s
.instruction_anim-enter,
.instruction_anim-leave-active
  opacity: 0

#container
  height: 100%
  overflow: hidden

  // 中心にマーカーを描画
  // &:after
  //   content: ''
  //   display: block
  //   width: 4px
  //   height: 4px
  //   background-color: red
  //   position: absolute
  //   top: calc(50% - 2px)
  //   left: calc(50% - 2px)

.ycam
  position: absolute
  top: 18px
  right: 22px
  z-index: 11
  user-select: none
  &:hover
    opacity: 0.7

.copyright
  position: absolute
  bottom: 19px
  right: 22px
  z-index: 11
  font-family: 'Roboto'
  font-size: 9px
  line-height: 15px
  text-align: right
  opacity: 0.55
  a
    color: #fff
    text-decoration: none
    &:hover
      border-bottom: 1px dotted #ccc

.marker
  position: absolute
  cursor: pointer
  z-index: 10
  user-select: none

  height: 14px
  line-height: 14px
  white-space: nowrap

  // 左中央を中心に回転
  transform-origin: 0% 50%
  -webkit-transform-origin: 0% 50%
  transform: rotate(-90deg)
  -webkit-transform: rotate(-90deg)

  img
    display: inline-block
    vertical-align: middle
    cursor: pointer
    user-select: none
    pointer-events: none
  img.label
    margin-left: 5px

  &:hover
    animation: hover_flash 0.2s 1 linear
    -webkit-animation: hover_flash 0.2s 1 linear
    -moz-animation: hover_flash 0.2s 1 linear

  &.selected
    animation: flash 1s infinite linear
    -webkit-animation: flash 1s infinite linear
    -moz-animation: flash 1s infinite linear

  &.sample
    // 矢印の先端が基準点になるようにずらす
    margin-left: 7px
    &:before
      display: inline-block
      content: url(/dna-of-forests/kumano/img/panorama/marker-arrow.png)
      width: 13px
      height: 14px
      vertical-align: middle
    .dna_barcode
      margin-left: 5px
      cursor: pointer
    // ボバーした時にDNAの動きを遅くする
    &:hover
      .dna_barcode
        animation-duration: 500s !important
        -webkit-animation-duration: 500s !important
        -moz-animation-duration: 500s !important

  &.knowledge
    // markerの中央が基準点になるようにずらす
    margin-top: 3.5px
    margin-left: 3.5px
    &:before
      display: inline-block
      content: ''
      width: 14px
      height: 14px
      vertical-align: middle
      border-radius: 7px
      background-color: #fcff00


@media (max-width: 660px)
  .ycam
    right: inherit
    left: 22px
    opacity: 0.5

  .copyright
    bottom: inherit
    top: 19px
    right: 22px
    opacity: 0.5

[data-lang='en']
  .marker
    span.label
      font-family: 'Roboto'
      font-weight:
      color: #fcff00
      font-size: 11px
      letter-spacing: 0.1em
      margin-left: 5px
</style>

<script>

import Vue from 'vue';
import THREELib from 'three-js';
import Cookies from 'js-cookie';
import _ from 'lodash';

var THREE = THREELib(['Projector']);

// 表示の切り替え
const visibleAxisHelper = true;
const visible3dMaker = true;
const visibleGrid = true;

export default Vue.extend({
  components: {
    'dna-barcode-bg':    require('../dna-barcode-bg.vue'),
    'entrance-modal':    require('../modal/entrance-modal.vue'),
    'instruction-modal': require('../modal/instruction-modal.vue'),
  },
  watch: {
    '$route': 'resetAutoScroll'
  },
  mounted: function() {

    this.resetAutoScroll();

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
    this.onPointerDownPointerX = null;
    this.onPointerDownPointerY = null;
    this.isUserInteracting = false;
    this.isDragged = false;
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
    if(visibleGrid){
      var sphere = new THREE.Mesh(
        new THREE.SphereGeometry( 500, 36, 18 ),
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          wireframe: true
        })
      );
      this.scene.add(sphere);
    }

    // マーカー

    // 並び順に沿って、URLに現出する"alias"を設定

    for(var i = 0; i<this.samples.length; i++){
      this.samples[i]['alias'] = 's-'+(i+1);
    }
    for(i = 0; i<this.knowledges.length; i++){
      this.knowledges[i]['alias'] = 'k-'+(i+1);
    }
    var marker_all = this.samples.concat(this.knowledges);
    // 距離でソートして、重なり順序がおかしくならないように
    marker_all = _.sortBy(marker_all, [(m)=>{ return m.marker_position.radius; }]).reverse();
    for(i = 0; i<marker_all.length; i++){
      var data = marker_all[i];
      this.create_marker(data);
    }


    // 脚立を隠す円形を配置
    var geometry = new THREE.CircleGeometry( 0.6, 128 );
    var material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/dna-of-forests/kumano/img/panorama/logo-cover-'+this.$i18n.locale+'@2x.png') });
    var circle = new THREE.Mesh( geometry, material );


    circle.position.set(0, -1.5, 0); // 原点だとカメラと同じ視点になるので表示されない
    circle.rotateZ(Math.PI/2);
    circle.rotateY(Math.PI/2);
    this.scene.add( circle );

    // 座標軸の表示
    if(visibleAxisHelper){
      var axis = new THREE.AxisHelper(300);
      axis.position.set(0,-10,0); // 原点だとカメラと同じ視点になるので表示されない
      this.scene.add(axis);
    }

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.width, this.height );
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.$el.appendChild( this.renderer.domElement );

    window.addEventListener( 'resize', this.onWindowResize, false );
    this.$el.addEventListener( 'mousedown', this.onMouseDown, false );
    this.$el.addEventListener( 'touchstart', this.onTouchStart, false );
    this.$el.addEventListener( 'touchmove', this.onTouchMove, false );
    this.$el.addEventListener( 'touchend', this.onTouchEnd, false );
    this.$el.addEventListener( 'mousemove', this.onMouseMove, false );
    this.$el.addEventListener( 'mouseup', this.onMouseUp, false );
    this.$el.addEventListener( 'mousewheel', this.onMouseWheel, false );
    this.$el.addEventListener( 'MozMousePixelScroll', this.onMouseWheel, false);

    // カメラ位置の設定 -------

    var default_lon = 1882;
    var default_lat = 46.2;
    if(this.$route.params.index) {

      // // 選択された行がある場合は、そこまでスクロール
      var key = this.$route.params.index;
      var selectedMarker = _.filter(this.markers, function(m){ return m.key==key; })[0];
      default_lat = selectedMarker.latitude;
      default_lon = -selectedMarker.longtitude;

      // Drawer分差し引いた領域の中心になるように
      // (TODO: 本来はカメラの視野に応じて計算するべき。(window.innerHeight==this.$el.offsetHeight)でSPビューも考慮すること。)
      // default_lon += 27;
    }
    else if(this.$route.path != '/') {

      default_lon = (Cookies.get('lon')*1 || default_lon);
      default_lat = (Cookies.get('lat')*1 || default_lat);
    }

    this.lon = default_lon;
    this.lat = default_lat;

    // ----------------------

    this.animate();
  },

  methods: {

    // 英語名を全部小文字にしたり置換してファイル名を取得
    filename(str){
      return str.toLowerCase().replace(/[\(|\)|.]/g , '').replace(/ /g , '-');
    },

    animate( ts ) {

      requestAnimationFrame( this.animate );
      this.update();
    },

    render( elapsed, ts ) {

      if( this.options.postprocessing ) {
        this.postprocessing.render( elapsed, ts, this.tick );
      } else {
        this.renderer.render( this.scene, this.camera );
      }
    },

    onWindowResize() {
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( this.width, this.height );
    },

    update() {

      if( this.autoScroll ) {
        this.lon += 0.04;
      }

      // this.lat = Math.max( -85, Math.min( 85, this.lat ) ); 少し上向きにしたい場合
      this.lat = Math.max( -90, Math.min( 90, this.lat ) );
      this.phi = THREE.Math.degToRad( 90 - this.lat );
      this.theta = THREE.Math.degToRad( this.lon );

      this.camera.target.x = 500 * Math.sin( this.phi ) * Math.cos( this.theta );
      this.camera.target.y = 500 * Math.cos( this.phi );
      this.camera.target.z = 500 * Math.sin( this.phi ) * Math.sin( this.theta );

      this.camera.lookAt( this.camera.target );

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
          el.style.top = parseInt(top,10)+'px';
          el.style.left = parseInt(left,10)+'px';
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

      var texture = null;
      var video = document.getElementById( 'video' );
      if(video) {
        texture = new THREE.VideoTexture( video );
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
      }
      else {
        texture = new THREE.TextureLoader().load('/dna-of-forests/kumano/img/panorama/forest.jpg');
      }

      var material = new THREE.MeshBasicMaterial({ map: texture });

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

    getTwoDPosition(_vector) {

      var vector = _vector.clone();
      var widthHalf = 0.5*this.renderer.context.canvas.width;
      var heightHalf = 0.5*this.renderer.context.canvas.height;

      // 何もしないと対角線上の位置も返してしまうので、ここで間引く
      if(this.frustum.containsPoint(vector)) {

        // Within camera
        vector.project(this.camera);

        vector.x = ( vector.x * widthHalf ) + widthHalf;
        vector.y = - ( vector.y * heightHalf ) + heightHalf;

        return {
          x: vector.x/window.devicePixelRatio,
          y: vector.y/window.devicePixelRatio
        };
      }
      return null;
    },

    // マーカー
    create_marker(_data, _key){
      var key = _data.alias;
      var type = (key.indexOf('s-')==0) ? 'sample' : 'knowledge';
      var latitude = _data.marker_position.latitude;
      var longtitude = _data.marker_position.longtitude;
      var radius = _data.marker_position.radius;
      var geo = this.translateGeoCoords(latitude, longtitude, radius);
      var x = geo.x,
        y = geo.y,
        z = geo.z;

      // 3D marker -----------
      if(visible3dMaker){
        // 15cmくらい
        // var geometry = (type=='sample') ? new THREE.TetrahedronGeometry(0.15) : new THREE.SphereGeometry(0.15, 8, 8);
        var geometry = new THREE.SphereGeometry(0.15, 8, 8);
        // geometry.scale( - 1, 1, 1 );
        var color = (_data.id && _data.id.indexOf('B-')==0) ? 0xff0000 : 0xffffff;
        var material = new THREE.MeshLambertMaterial({
          color: color
        });
        var marker_3d = new THREE.Mesh( geometry, material );
        marker_3d.position.set( x, y, z );
        this.scene.add(marker_3d);
      }
      // ---------------------

      var marker = {};

      marker.position = new THREE.Vector3( x, y, z );

      // カメラ位置をあわせる時に使う
      marker.latitude = latitude;
      marker.longtitude = longtitude;

      marker.key = key;
      marker.type = type;

      this.markers.push( marker );

      return marker;
    },

    onTouchStart( e ) {
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
      this.onMouseDown( e );
    },
    onTouchMove( e ) {
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
      this.onMouseMove( e );
    },
    onTouchEnd( e ) {
      e.clientX = e.changedTouches[0].clientX;
      e.clientY = e.changedTouches[0].clientY;
      this.onMouseUp( e );
    },

    onMouseDown( e ) {
      // Canvas部分でドラッグ開始したら
      if( e.target === this.renderer.domElement && this.$route.path!='/' ){
        e.preventDefault();

        this.isUserInteracting = true;

        this.onPointerDownPointerX = e.clientX;
        this.onPointerDownPointerY = e.clientY;

        this.onPointerDownLon = this.lon;
        this.onPointerDownLat = this.lat;


        this.mouse.x = ( e.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
      }
    },

    onMouseMove( e ) {
      if ( this.isUserInteracting === true ) {
        this.isDragged = true;
        this.lon = ( this.onPointerDownPointerX - e.clientX ) * 0.1 + this.onPointerDownLon;
        this.lat = ( e.clientY - this.onPointerDownPointerY ) * 0.1 + this.onPointerDownLat;
        // -----
        this.$root.isAlreadyDragged = true;
        this.autoScroll = false;
      }
    },

    onMouseUp( e ) {
      if(this.isUserInteracting === true) {

        // クリック
        if(!this.isDragged && e.target === this.renderer.domElement && this.$route.path!='/panorama/' ) {
          // 詳細を閉じる
          this.$router.push('/panorama/');
        }

        Cookies.set('lon', this.lon);
        Cookies.set('lat', this.lat);

        this.isUserInteracting = false;
        this.isDragged = false;
      }
    },

    onMouseWheel( e ) {
      if(this.$route.path!='/'){
        // WebKit
        if ( e.wheelDeltaY ) {
          this.lon += e.wheelDeltaY * 0.05;
        // Opera / Explorer 9
        } else if ( e.wheelDelta ) {
          this.lon += e.wheelDelta * 0.05;
        // Firefox
        } else if ( e.detail ) {
          this.lon -= e.detail * 1.0;
        }
        this.$root.isAlreadyDragged = true;
        this.autoScroll = false;
      }
    },

    resetAutoScroll() {
      if(this.$route.path==='/'){
        this.autoScroll = true;
      }
    }

  },
  data () {
    // autoScrollを追加する
    var _data = _.cloneDeep(require('../../script/markers.json'));
    _data['autoScroll'] = false;
    return _data;
  }
});
</script>