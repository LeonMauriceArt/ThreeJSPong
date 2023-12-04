import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const WIDTH = 800
const HEIGHT = 600

let camera, controls, scene, renderer;

init()
animate()


function init(){
  //Renderer
  renderer = new THREE.WebGLRenderer({ alpha: false });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);

  //Init Scene
  scene = new THREE.Scene();

  //Camera
  camera = new THREE.PerspectiveCamera(
    45, 
    WIDTH / HEIGHT,
    1, 
  );
  camera.position.z = 20

  //Texture and materials
  const loader = new THREE.TextureLoader();
  const gridTexture = loader.load('assets/grid.png', function(){renderer.render(scene, camera)})
  const gridMaterial = new THREE.MeshStandardMaterial();
  gridMaterial.map = gridTexture;
  const redMaterial = new THREE.MeshStandardMaterial({color: (0xff0000)});


  //Controls
  controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;


  //Light
  const light = new THREE.DirectionalLight(0xffffff, 10, 100);
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

  scene.background = gridTexture;

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
