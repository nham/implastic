var camera, scene, renderer, material;
var things = [];
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var container = document.createElement( 'div' );
document.body.appendChild( container );

init(container, 0xefefef);

function Frame(origin, init_ang, angvel) {
    this.origin = origin;
    this.init_ang = init_ang;
    this.angvel = angvel;

    this.origin_vel = new THREE.Vector2(0, 0);

    this.object = null;
    this.trace = null;
}

Frame.prototype.incTrace = function() {
    var len = this.trace.geometry.vertices.length;
    var v = this.trace.geometry.vertices[len - 1].clone();
    this.trace.geometry.vertices.push(
            v.applyAxisAngle(new THREE.Vector3(0, 0, 1),
                             this.angvel));
    this.trace.geometry.vetricesNeedUpdate = true;
}

var frmA = new Frame(new THREE.Vector2(-400, 100),
                     0, 
                     0.02);

var frmB = new Frame(new THREE.Vector2(50, -50),
                     Math.PI/6, 
                     -0.1);

frmB.origin_vel = new THREE.Vector2(0.2, 1);

/*
objects.push( coordsys3(scene, 30, new THREE.Vector3(-20, -5, 0), 0xffaa00) );
objects.push( coordsys3(scene, 15, new THREE.Vector3(-50, 20, 0), 0xff00aa) );
*/

var axis_size = 200;
frmA.object = coordsys2(scene, 
                        axis_size, 
                        frmA.origin,
                        0xffaa00,
                        frmA.init_ang);

frmB.object = coordsys2(scene, 
                        axis_size, 
                        frmB.origin,
                        0xff00aa,
                        frmB.init_ang);

things.push(frmA);
things.push(frmB);

var particle_loc = new THREE.Vector2(-200, 0);
var p = particle2(scene, particle_loc, 0x222222);

var A_to_p = vector2(scene, frmA.origin, particle_loc, 0xff0000);
var B_to_p = vector2(scene, frmB.origin, particle_loc, 0x0000ff);



frmA.trace = trace(scene, particle_loc);


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

        things[0].object.rotation.z += things[0].angvel;
        things[0].object.position.x += things[0].origin_vel.x;
        things[0].object.position.y += things[0].origin_vel.y;

        // the trace
        things[0].incTrace();
        console.log(things[0].trace.geometry.vertices);

        things[1].object.rotation.z += things[1].angvel;
        things[1].origin.x += things[1].origin_vel.x;
        things[1].origin.y += things[1].origin_vel.y;
        things[1].object.position.x = things[1].origin.x;
        things[1].object.position.y = things[1].origin.y;

        B_to_p.geometry.vertices[0].x = things[1].origin.x;
        B_to_p.geometry.vertices[0].y = things[1].origin.y;
        B_to_p.geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);
} 

render();
