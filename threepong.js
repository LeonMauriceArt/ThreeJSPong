import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const WIDTH = 800
const HEIGHT = 600
const WALLS_HEIGHT = 50

const WINNING_SCORE = 5
const PADDLE_WIDTH = 20
const PADDLE_HEIGHT = 100
const BALL_RADIUS = 10

var camera, controls, scene, renderer;

//Texture and materials
const loader = new THREE.TextureLoader();
const gridTexture = loader.load('assets/grid.png', function(){renderer.render(scene, camera)})
const gridMaterial = new THREE.MeshStandardMaterial();
gridMaterial.map = gridTexture;
const redMaterial = new THREE.MeshStandardMaterial({color: (0xff0000)});

init()
initArena()
animate()


function init(){
	//Renderer
	renderer = new THREE.WebGLRenderer({ alpha: false });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);

	//Init Scene
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x00000, 5, 300 );

	//Camera
	camera = new THREE.PerspectiveCamera(
		45, 
		WIDTH / HEIGHT,
		1, 
	);
	camera.position.z = 100



	//Controls
	controls = new OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05;
	controls.screenSpacePanning = false;
	// controls.minDistance = 100;
	// controls.maxDistance = 500;
	// controls.maxPolarAngle = Math.PI / 2;


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
	upper_plane.position.set(0, WALLS_HEIGHT,0)

	const lower_plane = new THREE.Mesh(
		new THREE.PlaneGeometry(300, 300, 8, 8),
		gridMaterial
	  );
	lower_plane.rotation.x = (Math.PI / 2) * -1;
	lower_plane.position.set(0, (WALLS_HEIGHT * -1),0)

	scene.add(lower_plane)
	scene.add(upper_plane)
}

function animate() {
  
  requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

  render();
}

function render(){

	renderer.render( scene, camera );

}
