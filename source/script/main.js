'use strict';
import Sound from './Sound';

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
    // {key}: [latitude, longitude, radius]
    'cristina': [2.3,-55,17],
    'ersin': [1.8,-57,18], // 木の裏に隠れて見えないところ
    '9_1_C': [-9,-62,13],
    '9_2_A': [-6.8,95,20],
    '9_2_B': [-12.5,116.3,19],
    '9_2_C': [5.8,-42,18],
    '9_2_D': [-25,-106,6],
    '9_3_A': [-4.5,142,21],
    '9_3_D': [-11.3,113.2,20],
    '9_1_B': [-18,-24,8.2],
    '9_1_D': [-20,-22,8],
    '9_3_C': [-1,-27,9],
    '9_1_A': [-10.7,39,8],
    '9_3_B': [1,53,9.5],
    '10_1_A': [22,53,16],
    '10_1_B': [5.4,-46,22],
    '10_1_C': [4.5,76.6,15],
    '10_1_D': [-7,-67,13],
    '10_2_A': [-23,-164,8],
    '10_2_B': [5,-50,20],
    '10_2_C': [-32,-120,5.5],
    '10_2_D': [23.4,5,20], // 鎖のところ？
    '10_3_A': [23.4,-4,21], // ２本めのポールの奥
    '10_3_B': [-0.5,-62.5,18], // 隠れて見えないところ
    '10_3_C': [-13,93,12],
    '10_3_D': [-0.4,-35,12] // 葉っぱに隠れて見えないところ
  };
  for(var key in marker_datas){
    var data = marker_datas[key];
    var geo = translateGeoCoords(data[0],data[1],data[2]);
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

  // if ( isUserInteracting === false ) {
  //   lon += 0.05;
  // }

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
