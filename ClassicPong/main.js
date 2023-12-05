import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {Player} from './Player.js'
import * as material from './Materials.js'
import {Wall} from './Arena.js'
import {Ball} from './Ball.js'
import * as constants from './Constants.js';

var camera, orbitcontrols, renderer, player_one, player_two, ball, scene

const keys = {};

function handleKeyDown(event) {
	keys[event.code] = true;
}

function handleKeyUp(event) {
	keys[event.code] = false;
}


init()
initArena()
initControls()
animate()


function init(){
	//Renderer
	renderer = new THREE.WebGLRenderer({ alpha: false });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(constants.WIN_WIDTH, constants.WIN_HEIGHT);
	document.body.appendChild(renderer.domElement);

	//Init Scene
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x00000, 5, 300 );

	//Camera
	camera = new THREE.PerspectiveCamera(
		45, 
		constants.WIN_WIDTH / constants.WIN_HEIGHT,
		1, 
		);
	camera.position.z = constants.CAMERA_STARTPOS_Z

	// Light
	// const light = new THREE.AmbientLight(0xffffff, 100, 100);
	// light.position.set(-10, 20, 10);
	// scene.add(light);
	
	player_one = new Player((constants.GAME_AREA_WIDTH * -1) + 10, 0, constants.PADDLE_WIDTH, constants.PADDLE_HEIGHT)
	player_two = new Player(constants.GAME_AREA_WIDTH - 10, 0, constants.PADDLE_WIDTH, constants.PADDLE_HEIGHT)
	scene.add(player_one.mesh)
	scene.add(player_two.mesh)
	ball = new Ball()
	scene.add(ball.mesh)
	scene.add(ball.light)
	
}

function initArena()
{
	var upper_wall = new Wall(constants.GAME_AREA_HEIGHT, 300, material.phongMaterial)
	var lower_wall = new Wall(constants.GAME_AREA_HEIGHT * -1, 300, material.phongMaterial)
	scene.add(upper_wall.mesh, lower_wall.mesh)

	const player_one_goal = new THREE.Points(
		new THREE.WireframeGeometry(new THREE.BoxGeometry(0, constants.GAME_AREA_HEIGHT * 2, 20, 0, 10, 2)),
		material.pointsMaterial
		);
	player_one_goal.position.x = (constants.GAME_AREA_WIDTH * -1)
	const player_two_goal = new THREE.Points(
		new THREE.WireframeGeometry(new THREE.BoxGeometry(0, constants.GAME_AREA_HEIGHT * 2, 20, 0, 10, 2)),
		material.pointsMaterial
		);
	player_two_goal.position.x = constants.GAME_AREA_WIDTH
	scene.add(player_one_goal)
	scene.add(player_two_goal)

}

function initControls(){
	//Controls
	orbitcontrols = new OrbitControls( camera, renderer.domElement );
	orbitcontrols.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	orbitcontrols.dampingFactor = 0.05;
	orbitcontrols.screenSpacePanning = false;

	window.addEventListener('keydown', handleKeyDown);
	window.addEventListener('keyup', handleKeyUp);
}

document.on

//GameLoop
function animate() {
	
	requestAnimationFrame( animate );
	
	orbitcontrols.update();
	ball.update(player_one, player_two);
	if (keys['ArrowUp']) {
		player_two.move(true);
	}
	if (keys['ArrowDown']) {
		player_two.move(false);
	}
	if (keys['KeyW']) {
		player_one.move(true);
	}
	if (keys['KeyS']) {
		player_one.move(false);
	}
	
	render();
}

function render(){

	renderer.render( scene, camera );

}
