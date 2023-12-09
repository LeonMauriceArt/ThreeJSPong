import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {Player} from './Player.js'
import * as material from './Materials.js'
import {Wall} from './Arena.js'
import {Ball} from './Ball.js'
import * as constants from './Constants.js';

var camera, orbitcontrols, renderer, player_one, player_two, ball, scene, player_one_score, player_two_score
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
	renderer = new THREE.WebGLRenderer({alpha: false, antialias: false});
	renderer.setPixelRatio(devicePixelRatio / 2);
	renderer.setSize(constants.WIN_WIDTH, constants.WIN_HEIGHT);

	document.body.appendChild(renderer.domElement);
	
	//Init Scene
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x00000, 5, 300 );
	
	//Camera
	camera = new THREE.PerspectiveCamera(
		45, 
		constants.WIN_WIDTH / constants.WIN_HEIGHT,
		0.1,
		1000
		);
		camera.position.z = constants.CAMERA_STARTPOS_Z
		
		// Light
	// const light = new THREE.AmbientLight(0xffffff, 100, 100);
	// light.position.set(-10, 20, 10);
	// scene.add(light);
	
	player_one = new Player((constants.GAME_AREA_WIDTH * -1) + 10, 0, constants.PADDLE_WIDTH, constants.PADDLE_HEIGHT, 0xffffff)
	player_two = new Player(constants.GAME_AREA_WIDTH - 10, 0, constants.PADDLE_WIDTH, constants.PADDLE_HEIGHT, 0xffffff)
	scene.add(player_one.mesh)
	scene.add(player_two.mesh)
	ball = new Ball()
	scene.add(ball.mesh)
	scene.add(ball.light)
	
}

function initArena()
{
	var upper_wall = new Wall(constants.GAME_AREA_HEIGHT, 300, material.wallMaterial)
	var lower_wall = new Wall(constants.GAME_AREA_HEIGHT * -1, 300, material.wallMaterial)
	scene.add(upper_wall.mesh, lower_wall.mesh)
	

	var player_one_goal = new THREE.Mesh(
		new THREE.PlaneGeometry(20, constants.GAME_AREA_HEIGHT * 2, 1, 4),
		material.wallMaterial)
	player_one_goal.rotation.y = Math.PI / 2
	player_one_goal.position.x = constants.GAME_AREA_WIDTH * -1
	var player_two_goal = new THREE.Mesh(
		new THREE.PlaneGeometry(20, constants.GAME_AREA_HEIGHT * 2, 1, 4),
		material.wallMaterial)
	player_two_goal.rotation.y = (Math.PI / 2) * -1
	player_two_goal.position.x = constants.GAME_AREA_WIDTH
	scene.add(player_one_goal, player_two_goal)
	
}

function initControls(){
	//Controls
	orbitcontrols = new OrbitControls( camera, renderer.domElement );
	orbitcontrols.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	orbitcontrols.dampingFactor = 0.05;
	orbitcontrols.screenSpacePanning = true;

	window.addEventListener('keydown', handleKeyDown);
	window.addEventListener('keyup', handleKeyUp);
}

document.on

//GameLoop
function animate() {
	
	requestAnimationFrame( animate );
	
	// orbitcontrols.target = new THREE.Vector3(ball.mesh.position.x,ball.mesh.position.y,ball.mesh.position.z)
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
