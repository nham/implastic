var camera, scene, renderer, material;
var things = [];
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var container = document.createElement( 'div' );
document.body.appendChild( container );

init(container, 0xefefef);


var r = 80;
var dt = 0.01;

var geo = new THREE.Geometry();

for(var i = 0; i < 200; i++) {
    geo.vertices.push( new THREE.Vector3((r - i*(4/10)) * Math.sin(dt * i), 
                                         (r - i*(4/10)) * Math.cos(dt * i), 
                                         0) );
}

var mat = new THREE.LineBasicMaterial( 
        { color: 0x4477aa, linewidth: 2 });

var object = new THREE.Line( geo, mat, THREE.LineStrip );
scene.add( object );


var particle_loc = new THREE.Vector2(0, 0);
var p = particle2(scene, particle_loc, 0x222222);




/*****/


function trace(scene, particle_loc) {
    var geo = new THREE.Geometry();
    geo.vertices.push( new THREE.Vector3(particle_loc.x, particle_loc.y, 0));
    var mat = new THREE.LineBasicMaterial( 
            { color: 0x4477aa, linewidth: 2 });

    var object = new THREE.Line( geo, mat, THREE.LineStrip );
    object.position = frmA.origin;
    scene.add( object );
    return object;
}



function particle2(scene, position, color) {
    var geo = new THREE.CircleGeometry(3, 20, 0);

    var mat = new THREE.MeshBasicMaterial( 
            { color: color });

    var object = new THREE.Mesh( geo, mat );
    object.position.set(position.x, position.y, 0);

    scene.add( object );

    return object;
}

function vector2(scene, from_pos, to_pos, color) {
    var geo = new THREE.Geometry();

    geo.vertices.push( new THREE.Vector3( from_pos.x, from_pos.y, 0 ) );
    geo.vertices.push( new THREE.Vector3( to_pos.x, to_pos.y, 0 ) );

    var mat = new THREE.LineDashedMaterial( 
            { color: color, linewidth: 2 });

    var object = new THREE.Line( geo, mat, THREE.LinePieces );

    scene.add( object );

    return object;
}

function coordsys2(scene, size, position, color, init_ang) {
    var geometry = dyad( size , 0, 0);
    geometry.computeLineDistances();

    var mat = new THREE.LineDashedMaterial( 
            { color: color, dashSize: 8, gapSize: 5, linewidth: 3 });

    var object = new THREE.Line( geometry, mat, THREE.LinePieces );

    object.position.set(position.x, position.y, 0);
    object.rotation.z = init_ang;
    scene.add( object );

    return object;
}


function coordsys3(scene, size, position, color) {
    var geometry = triad( size , 0, 0, 0);
    geometry.computeLineDistances();

    var mat = new THREE.LineDashedMaterial( 
            { color: color, dashSize: 3, gapSize: 1, linewidth: 3 });

    var object = new THREE.Line( geometry, mat, THREE.LinePieces );

    object.position = position;
    scene.add( object );

    return object;
}

function init(container, rendererBGColor) {

    camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, 
                                           HEIGHT / 2, HEIGHT / - 2, 
                                           -500, 1000 );
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 100;

    scene = new THREE.Scene(); 

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( rendererBGColor );
    renderer.setSize( WIDTH, HEIGHT );
    container.appendChild( renderer.domElement );
}

function dyad( size, x, y) {
    var geometry = new THREE.Geometry();

    geometry.vertices.push( new THREE.Vector3( x, y, 0 ) );
    geometry.vertices.push( new THREE.Vector3( x + size, y, 0 ) );

    geometry.vertices.push( new THREE.Vector3( x, y, 0 ) );
    geometry.vertices.push( new THREE.Vector3( x, y + size, 0 ) );

    return geometry;
}

function triad( size, x, y, z) {
    var geometry = new THREE.Geometry();

    geometry.vertices.push( new THREE.Vector3( x, y, z ) );
    geometry.vertices.push( new THREE.Vector3( x + size, y, z ) );

    geometry.vertices.push( new THREE.Vector3( x, y, z ) );
    geometry.vertices.push( new THREE.Vector3( x, y + size, z ) );

    geometry.vertices.push( new THREE.Vector3( x, y, z ) );
    geometry.vertices.push( new THREE.Vector3( x, y, z + size ) );

    return geometry;
}

function render() { 
    requestAnimationFrame(render); 

    var time = Date.now() * 0.001;

    renderer.render(scene, camera);
} 

render();
