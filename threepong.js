import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const WIN_WIDTH = 800
const WIN_HEIGHT = 600

const GAME_AREA_WIDTH = 70
const GAME_AREA_HEIGHT = 50

const WINNING_SCORE = 5
const PADDLE_WIDTH = 5
const PADDLE_HEIGHT = 23
const BALL_RADIUS = 2

const PLAYER_SPEED = 0.6

var camera, orbitcontrols, scene, renderer, player_one, player_two, ball, player_one_controls, player_two_controls;


//Texture and materials
const loader = new THREE.TextureLoader();
const gridTexture = loader.load('assets/grid.png', function(){renderer.render(scene, camera)})
const gridMaterial = new THREE.MeshStandardMaterial();
gridMaterial.map = gridTexture;
const redMaterial = new THREE.MeshStandardMaterial({color: (0xff0000)});

const keys = {};

function handleKeyDown(event) {
	keys[event.code] = true;
}

function handleKeyUp(event) {
	keys[event.code] = false;
}


class Player
{
	constructor(x, y, width, height) 
	{
	  this.geometry = new THREE.BoxGeometry(width, height, width);
	  this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
	  this.mesh = new THREE.Mesh(this.geometry, this.material);
	  this.mesh.position.set(x, y, 0);
	  scene.add(this.mesh);
	}
	move(up)
	{
		if (up)
		{
			if (this.mesh.position.y + PADDLE_HEIGHT / 2 <= GAME_AREA_HEIGHT)
				this.mesh.position.y += PLAYER_SPEED;
		}
		else
		{
			if (this.mesh.position.y - PADDLE_HEIGHT / 2 >= GAME_AREA_HEIGHT * -1)
				this.mesh.position.y -= PLAYER_SPEED;
		}
	}
	reset()
	{
		this.mesh.position.y = 0
	}
}

class Ball
{
	constructor(radius) 
	{
	  this.geometry = new THREE.SphereGeometry(BALL_RADIUS, 10, 10);
	  this.material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
	  this.mesh = new THREE.Mesh(this.geometry, this.material);
	  this.mesh.position.set(0, 0, 0);
	  scene.add(this.mesh);
	}
}

init()
initArena()
initControls()
animate()


function init(){
	//Renderer
	renderer = new THREE.WebGLRenderer({ alpha: false });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(WIN_WIDTH, WIN_HEIGHT);
	document.body.appendChild(renderer.domElement);

	//Init Scene
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x00000, 5, 300 );

	//Camera
	camera = new THREE.PerspectiveCamera(
		45, 
		WIN_WIDTH / WIN_HEIGHT,
		1, 
		);
		camera.position.z = 100
		
		
		
		//Light
		const light = new THREE.AmbientLight(0xffffff, 10, 100);
		light.position.set(-10, 20, 10);
	scene.add(light);
	
	//meshes
	const sphere_mesh = new THREE.Mesh(
		new THREE.SphereGeometry(3, 10, 10),
		gridMaterial
		);
	sphere_mesh.position.set(0, 15,0)

	const center_sphere = new THREE.Mesh(
		new THREE.SphereGeometry(2, 5,5),
		redMaterial
	)
	center_sphere.position.set(0,0,0)
	
	scene.add(sphere_mesh);
	scene.add(center_sphere);
	
	// scene.background = gridTexture;
	
}

function initArena(){
	const upper_plane = new THREE.Mesh(
		new THREE.PlaneGeometry(300, 300, 8, 8),
		gridMaterial
		);
		upper_plane.rotation.x = (Math.PI / 2);
		upper_plane.position.set(0, GAME_AREA_HEIGHT,0)
		
		const lower_plane = new THREE.Mesh(
			new THREE.PlaneGeometry(300, 300, 8, 8),
			gridMaterial
			);
	lower_plane.rotation.x = (Math.PI / 2) * -1;
	lower_plane.position.set(0, (GAME_AREA_HEIGHT * -1),0)
	
	scene.add(lower_plane)
	scene.add(upper_plane)
	
	player_one = new Player((GAME_AREA_WIDTH * -1) + 10, 0, PADDLE_WIDTH, PADDLE_HEIGHT)
	player_two = new Player(GAME_AREA_WIDTH - 10, 0, PADDLE_WIDTH, PADDLE_HEIGHT)
	ball = new Ball(BALL_RADIUS)

	const player_one_goal = new THREE.Mesh(
		new THREE.BoxGeometry(2, GAME_AREA_HEIGHT, 2),
		gridMaterial
		);
	player_one_goal.position.x = (GAME_AREA_WIDTH * -1)
	scene.add(player_one_goal)
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
