//= require_tree .

var camera,
  scene,
  renderer,
  raycaster,
  mouse,
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
  texture = new THREE.VideoTexture( video );
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;

  var material = new THREE.MeshBasicMaterial( {
    map: texture
  });
  return new THREE.Mesh( geometry, material );
}

// マーカー
function create_marker(color, x=0, y=0, z=0){
  var geometry = new THREE.SphereGeometry(2, 10, 10);
  // geometry.scale( - 1, 1, 1 );
  var material = new THREE.MeshLambertMaterial({
    color: color
  });
  var marker = new THREE.Mesh( geometry, material );

  marker.position.set( x, y, z );

  markers.push( marker );

  return marker;
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

  var maker1 = create_marker(0xff0000,0,-50,100);
  var maker2 = create_marker(0x550000,350,-50,50);
  var maker3 = create_marker(0x0000ff,130,-50,0);
  var maker4 = create_marker(0xff0055,-200,70,140);
  scene.add( maker1 );
  scene.add( maker2 );
  scene.add( maker3 );
  scene.add( maker4 );

  var marker_data = {
    '9_1_A':  [0,0,0],
    '9_1_B':  [0,0,0],
    '9_1_C':  [0,0,0],
    '9_1_D':  [0,0,0],
    '9_2_A':  [0,0,0],
    '9_2_B':  [0,0,0],
    '9_2_C':  [0,0,0],
    '9_2_D':  [0,0,0],
    '9_3_A':  [0,0,0],
    '9_3_B':  [0,0,0],
    '9_3_C':  [0,0,0],
    '9_3_D':  [0,0,0],
    '10_1_A': [0,0,0],
    '10_1_B': [0,0,0],
    '10_1_C': [0,0,0],
    '10_1_D': [0,0,0],
    '10_2_A': [0,0,0],
    '10_2_B': [0,0,0],
    '10_2_C': [0,0,0],
    '10_2_D': [0,0,0],
    '10_3_A': [0,0,0],
    '10_3_B': [0,0,0],
    '10_3_C': [0,0,0],
    '10_3_D': [0,0,0]
  };
  for(var i=0; i<marker_data.length; i++){
    var dada = marker_data[i];
    scene.add( create_marker(0xff0055, dada[0], dada[1], dada[2]) );
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

    clicked_marker = intersects[0];

    if(clicked_marker.object.material.color.r!=1){
      clicked_marker.object.material.color.r = 1;
    }
    else{
      clicked_marker.object.material.color.r = 0;
    }

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
