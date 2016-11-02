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
  lon = (Cookies.get('lon') || 0)*1,
  lat = (Cookies.get('lat') || 0)*1,
  onMouseDownLon = 0,
  onMouseDownLat = 0,
  phi = 0,
  theta = 0,
  markers = [];

init();
animate();

// パノラマ画像を貼り付けた球体
function create_pano_sphere(){
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
}

// マーカー
function create_marker(type, x=0, y=0, z=0, key){
  // 15cmくらい
  var geometry = (type=='sample') ? new THREE.TetrahedronGeometry(0.15) : new THREE.SphereGeometry(0.15, 8, 8);
  // geometry.scale( - 1, 1, 1 );
  var material = new THREE.MeshLambertMaterial({
    color: 0xffffff
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

  Cookies.set('lon', lon);
  Cookies.set('lat', lat);
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
`