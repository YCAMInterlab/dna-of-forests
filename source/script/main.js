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

  document.addEventListener( 'dragover', function ( event ) {

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

  }, false );

  document.addEventListener( 'dragenter', function ( event ) {

    document.body.style.opacity = 0.5;

  }, false );

  document.addEventListener( 'dragleave', function ( event ) {

    document.body.style.opacity = 1;

  }, false );

  document.addEventListener( 'drop', function ( event ) {

    event.preventDefault();

    var reader = new FileReader();
    reader.addEventListener( 'load', function ( event ) {

      material.map.image.src = event.target.result;
      material.map.needsUpdate = true;

    }, false );
    reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

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

function onDocumentTouchStart( event ) {

  event.preventDefault();

  event.clientX = event.touches[0].clientX;
  event.clientY = event.touches[0].clientY;
  onDocumentMouseDown( event );

}

function onDocumentMouseDown( event ) {

  event.preventDefault();

  isUserInteracting = true;

  onPointerDownPointerX = event.clientX;
  onPointerDownPointerY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  // -----

  mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

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

function onDocumentMouseMove( event ) {

  if ( isUserInteracting === true ) {

    lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
    lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

  }

}

function onDocumentMouseUp( event ) {

  isUserInteracting = false;

}

function onDocumentMouseWheel( event ) {

  // WebKit

  if ( event.wheelDeltaY ) {

    camera.fov -= event.wheelDeltaY * 0.05;

  // Opera / Explorer 9

  } else if ( event.wheelDelta ) {

    camera.fov -= event.wheelDelta * 0.05;

  // Firefox

  } else if ( event.detail ) {

    camera.fov += event.detail * 1.0;

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
