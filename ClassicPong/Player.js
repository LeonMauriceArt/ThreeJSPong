import * as THREE from 'three'

import { GAME_AREA_HEIGHT, PADDLE_HEIGHT, PLAYER_SPEED } from './Constants.js'
import { lineMaterial } from './Materials.js';
import { phongMaterial } from './Materials.js';


export class Player
{
	constructor(x, y, width, height) 
	{
	  this.geometry = new THREE.BoxGeometry(width, height, width, 50, 50, 50);
	  this.mesh = new THREE.Mesh(this.geometry, phongMaterial);
	  this.mesh.position.set(x, y, 0);
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