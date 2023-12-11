import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from '../node_modules/three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from '../node_modules/three/examples/jsm/loaders/FontLoader.js';
import {Player} from './Player.js'
import * as material from './Materials.js'
import {Wall} from './Arena.js'
import {Ball} from './Ball.js'
import * as constants from './Constants.js';

var camera, orbitcontrols, renderer, player_one, player_two, ball, scene, player_one_score_text, player_two_score_text, droidFont
const keys = {};

const fontlLoader = new FontLoader();
fontlLoader.load('node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json',
function (loadedFont){
	droidFont = loadedFont;
	init()
	initArena()
	initControls()
	animate()
});


function handleKeyDown(event) {
	keys[event.code] = true;
}

function handleKeyUp(event) {
	keys[event.code] = false;
}


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
		
	player_one = new Player((constants.GAME_AREA_WIDTH * -1) + 10, 0, constants.PADDLE_WIDTH, constants.PADDLE_HEIGHT, 0xffffff)
	player_two = new Player(constants.GAME_AREA_WIDTH - 10, 0, constants.PADDLE_WIDTH, constants.PADDLE_HEIGHT, 0xffffff)
	scene.add(player_one.mesh)
	scene.add(player_two.mesh)
	ball = new Ball()
	scene.add(ball.mesh)
	scene.add(ball.light)
	
}

function createTextMesh(text, textMesh, x, y, z, fontcolor, fontsize) {
	// Remove old text mesh if it exists
	if (textMesh) {
		textMesh.geometry.dispose()
		textMesh.material.dispose()
		scene.remove(textMesh);
	}
	// Create TextGeometry
	var textGeometry = new TextGeometry(text, {
		font: droidFont,
		size: fontsize,
		height: 1,
		curveSegments: 1,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 1
	});
	
	// Material
	var textMaterial = new THREE.MeshBasicMaterial({ color: fontcolor });
	textGeometry.center();

	// Create mesh
	var textMesh = new THREE.Mesh(textGeometry, textMaterial);

	// Position and add to scene
	textMesh.position.set(x, y, z);
	scene.add(textMesh);

	return textMesh
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
	player_one_score_text = createTextMesh(player_one.score.toString(), player_one_score_text, (constants.GAME_AREA_WIDTH / 2) * -1, 0,-80, 0xf0f0f0, 50);
	player_two_score_text = createTextMesh(player_two.score.toString(), player_two_score_text, constants.GAME_AREA_WIDTH / 2, 0,-80, 0xf0f0f0, 50);

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

function handle_scores()
{
	if (ball.mesh.position.x > constants.GAME_AREA_WIDTH)
	{
		player_one.score_point()
		scene.remove(player_one_score_text)
		player_one_score_text = createTextMesh(player_one.score.toString(), player_one_score_text, (constants.GAME_AREA_WIDTH / 2) * -1, 0,-80, 0xf0f0f0, 50);
	}
	else
	{
		player_two.score_point()
		scene.remove(player_two_score_text)
		player_two_score_text = createTextMesh(player_two.score.toString(), player_two_score_text, constants.GAME_AREA_WIDTH / 2, 0,-80, 0xf0f0f0, 50);
	}
	ball.reset()
	player_one.reset()
	player_two.reset()
	if (player_one.score == constants.WINNING_SCORE || player_two.score == constants.WINNING_SCORE)
		winning()
}

function winning()
{
	orbitcontrols.autoRotate = true;
	ball.stop();
	scene.remove(player_one_score_text)
	scene.remove(player_two_score_text)
	if (player_one.score == constants.WINNING_SCORE)
		player_one_score_text = createTextMesh("PLAYER 1 WIN", player_one_score_text, 0, 0, 0, 0xffffff, 13)
	else
		player_two_score_text = createTextMesh("PLAYER 2 WIN", player_two_score_text, 0, 0, 0, 0xffffff, 13)

}

//GameLoop
function animate() {
	
	requestAnimationFrame( animate );
	
	orbitcontrols.update();

	ball.update(player_one, player_two);
	if (ball.mesh.position.x < constants.GAME_AREA_WIDTH * -1 || ball.mesh.position.x > constants.GAME_AREA_WIDTH)
		handle_scores()
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
