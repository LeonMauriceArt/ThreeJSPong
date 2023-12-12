import * as THREE from 'three'

import { powerWallMaterial, powerCurseMaterial, powerReverseMaterial } from './Materials';


export class WallPowerup
{
	constructor()
	{
		this.geometry = new THREE.SphereGeometry(POWER_RADIUS, 10, 10);
		this.material = powerWallMaterial
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(0, 0, 0);
		this.light = new THREE.PointLight(0xffffff, 10000 ,100)
		this.light.castShadow = false
	}
	update(player_one, player_two)
	{
		this.handle_ball_collision(player_one, player_two)
		this.light.position.set(this.mesh.position.x, this.mesh.position.y)
	}
	handle_power_collision(ball, player_one, player_two)
	{
		var distance = Math.sqrt((ball.mesh.position.x - this.mesh.position.x)**2 + (ball.mesh.position.y - this.mesh.position.y)**2)
		if (distance <= (BALL_RADIUS + POWER_RADIUS))
		{
			if (ball.material.emissive == PLAYER_1_COLOR)
				player_one.add_powerup(powerup)
			else if (ball.material.emissive == PLAYER_2_COLOR)
				player_two.add_powerup(powerup)
		}
	}
}