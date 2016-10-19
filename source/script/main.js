'use strict';
import THREELib from 'three-js';
import Sound from './Sound';

var THREE = THREELib();

new Sound();

var camera,
  scene,
  renderer,
  raycaster,
  mouse,
  onPointerDownPointerX,
  onPointerDownPointerY,
  onPointerDownLon,
  onPointerDownLat,
  isUserInteracting = false,
  onMouseDownMouseX = 0,
  onMouseDownMouseY = 0,
  lon = 0, onMouseDownLon = 0,
  lat = 0, onMouseDownLat = 0,
  phi = 0, theta = 0,
  markers = [];

init();
animate();

// パノラマ画像を貼り付けた球体
function create_pano_sphere(){
  var geometry = new THREE.SphereGeometry( 500, 60, 40 );
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
}

// マーカー
function create_marker(color, x=0, y=0, z=0, key){
  var geometry = new THREE.SphereGeometry(0.15, 8, 8); // 15cmくらい
  // geometry.scale( - 1, 1, 1 );
  var material = new THREE.MeshLambertMaterial({
    color: color
  });
  var marker = new THREE.Mesh( geometry, material );

  marker.position.set( x, y, z );
  marker.key = key;
  markers.push( marker );

  return marker;
}

// 緯度経度から位置を算出
function translateGeoCoords(latitude, longitude, radius) {

  // 仰角
  var phi = (latitude) * Math.PI / 180;
  // 方位角
  var theta = (longitude - 180) * Math.PI / 180;

  var x = -(radius) * Math.cos(phi) * Math.cos(theta);
  var y = (radius) * Math.sin(phi);
  var z = (radius) * Math.cos(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}


function init() {

  var container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
  camera.target = new THREE.Vector3( 0, 0, 0 );

  scene = new THREE.Scene();

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // 光
  var ambient = new THREE.AmbientLight(0x550000);
  scene.add(ambient);

  // ジオメトリの追加

  var pano_sphere = create_pano_sphere();
  scene.add( pano_sphere );

  // 半径は全てメートルで大体目測で合わせる
  var marker_datas = {
    // カメラの中心座標からの方角（lat,long）と距離（radius）
    'cristina': { lat:  2.3, long:   -55, radius:  17 },
    'ersin':    { lat:  1.8, long:   -57, radius:  18 }, // 木の裏に隠れて見えないところ
    '9_1_C':    { lat:   -9, long:   -62, radius:  13 },
    '9_2_A':    { lat: -6.8, long:    95, radius:  20 },
    '9_2_B':    { lat:-12.5, long: 116.3, radius:  19 },
    '9_2_C':    { lat:  5.8, long:   -42, radius:  18 },
    '9_2_D':    { lat:  -25, long:  -106, radius:   6 },
    '9_3_A':    { lat: -4.5, long:   142, radius:  21 },
    '9_3_D':    { lat:-11.3, long: 113.2, radius:  20 },
    '9_1_B':    { lat:  -18, long:   -24, radius: 8.2 },
    '9_1_D':    { lat:  -20, long:   -22, radius:   8 },
    '9_3_C':    { lat:   -1, long:   -27, radius:   9 },
    '9_1_A':    { lat:-10.7, long:    39, radius:   8 },
    '9_3_B':    { lat:    1, long:    53, radius: 9.5 },
    '10_1_A':   { lat:   22, long:    53, radius:  16 },
    '10_1_B':   { lat:  5.4, long:   -46, radius:  22 },
    '10_1_C':   { lat:  4.5, long:  76.6, radius:  15 },
    '10_1_D':   { lat:   -7, long:   -67, radius:  13 },
    '10_2_A':   { lat:  -23, long:  -164, radius:   8 },
    '10_2_B':   { lat:    5, long:   -50, radius:  20 },
    '10_2_C':   { lat:  -32, long:  -120, radius: 5.5 },
    '10_2_D':   { lat: 23.4, long:     5, radius:  20 }, // 鎖のところ？
    '10_3_A':   { lat: 23.4, long:    -4, radius:  21 }, // ２本めのポールの奥
    '10_3_B':   { lat: -0.5, long: -62.5, radius:  18 }, // 隠れて見えないところ
    '10_3_C':   { lat:  -13, long:    93, radius:  12 },
    '10_3_D':   { lat: -0.4, long:   -35, radius:  12 }, // 葉っぱに隠れて見えないところ
  };
  for(var key in marker_datas){
    var data = marker_datas[key];
    var geo = translateGeoCoords(data.lat, data.long, data.radius);
    scene.add( create_marker(0xff0000, geo.x, geo.y, geo.z, key) );
  }

  // 座標軸の表示
  var axis = new THREE.AxisHelper(1000);
  axis.position.set(0,0,0);
  scene.add(axis);


  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
  document.addEventListener( 'MozMousePixelScroll', onDocumentMouseWheel, false);

  //

  window.addEventListener( 'resize', onWindowResize, false );

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

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentTouchStart( e ) {

  e.preventDefault();

  e.clientX = e.touches[0].clientX;
  e.clientY = e.touches[0].clientY;
  onDocumentMouseDown( e );

}

function onDocumentMouseDown( e ) {

  e.preventDefault();

  isUserInteracting = true;

  onPointerDownPointerX = e.clientX;
  onPointerDownPointerY = e.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  // -----

  mouse.x = ( e.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( e.clientY / renderer.domElement.clientHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( markers );

  if ( intersects.length > 0 ) {

    var clicked_marker = intersects[0];

    if(clicked_marker.object.material.color.r!=1){
      clicked_marker.object.material.color.r = 1;
    }
    else{
      clicked_marker.object.material.color.r = 0;
    }

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
}

function onDocumentMouseMove( e ) {

  if ( isUserInteracting === true ) {

    lon = ( onPointerDownPointerX - e.clientX ) * 0.1 + onPointerDownLon;
    lat = ( e.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

  }

}

function onDocumentMouseUp( e ) {

  isUserInteracting = false;

}

function onDocumentMouseWheel( e ) {

  // WebKit

  if ( e.wheelDeltaY ) {

    camera.fov -= e.wheelDeltaY * 0.05;

  // Opera / Explorer 9

  } else if ( e.wheelDelta ) {

    camera.fov -= e.wheelDelta * 0.05;

  // Firefox

  } else if ( e.detail ) {

    camera.fov += e.detail * 1.0;

  }

  camera.updateProjectionMatrix();

}

function animate() {

  requestAnimationFrame( animate );
  update();

}

function update() {

  if ( isUserInteracting === false ) {
    lon += 0.05;
  }

  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = THREE.Math.degToRad( 90 - lat );
  theta = THREE.Math.degToRad( lon );

  camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
  camera.target.y = 500 * Math.cos( phi );
  camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

  camera.lookAt( camera.target );

  /*
  // distortion
  camera.position.copy( camera.target ).negate();
  */

  renderer.render( scene, camera );

}
