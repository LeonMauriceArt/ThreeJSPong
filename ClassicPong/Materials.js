import * as THREE from 'three'

export const redMaterial = new THREE.MeshStandardMaterial({
	color: (0xff0000)
});

export const pointsMaterial = new THREE.PointsMaterial({
    size: 2,
    sizeAttenuation: true
});

export const lineMaterial = new THREE.LineBasicMaterial({
	 color: 0xffffff 
});

export const phongMaterial = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	wireframe: true,
	transparent: false
})
