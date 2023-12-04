import * as THREE from './node_modules/three/build/three.module.js'

const WIDTH = 800
const HEIGHT = 600

const renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);
//Camera
const camera = new THREE.PerspectiveCamera(
  45, 
  WIDTH / HEIGHT,
  1, 
);
camera.position.z = 20

//Light
const light = new THREE.PointLight(0xffffff, 1000, 100);
light.position.set(-10, 20, 10);
scene.add(light);

const sphere_mesh = new THREE.Mesh(
  new THREE.SphereGeometry(3, 10, 10),
  new THREE.MeshStandardMaterial({ color: 0xff00ff })
);

const gridTexture = new THREE.TextureLoader().load('./assets/grid.png');
scene.add(sphere_mesh);
scene.background = gridTexture;

renderer.render(scene, camera);
console.log(scene);

