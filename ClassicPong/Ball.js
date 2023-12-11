import * as THREE from 'three'

import { BALL_RADIUS, BALL_SPEED, GAME_AREA_HEIGHT, PADDLE_HEIGHT, PADDLE_WIDTH, BALL_RESPAWN_TIME} from './Constants';
import { ballMaterial } from './Materials';

export class Ball
{
	constructor()
	{
		this.speed = BALL_SPEED
		this.x_vel = BALL_SPEED * -1;
		this.y_vel = 0;
		this.geometry = new THREE.SphereGeometry(BALL_RADIUS, 10, 10);
		this.material = ballMaterial
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(0, 0, 0);
		this.light = new THREE.PointLight(0xffffff, 10000 ,100)
		this.light.castShadow = false
		this.timer = new THREE.Clock()
	}
	setcolor(color)
	{
		this.material.emissive.setHex(color);
		this.material.color.setHex(color);
		this.light.color.setHex(color);
	}
	reset()
	{
		this.timer.start()
		this.x_vel = 0
		this.y_vel = 0
		this.mesh.position.set(0,0,0)
		this.light.position.set(0,0,0)
	}
	stop()
	{
		this.timer.stop();
		this.x_vel = 0
		this.y_vel = 0
		this.mesh.visible = false;
	}
	launch()
	{
		this.x_vel = BALL_SPEED
		this.timer.stop()
	}
	update(player_one, player_two)
	{
		if(this.timer.running)
		{
			this.timer.getElapsedTime()
			if (this.timer.elapsedTime >= BALL_RESPAWN_TIME)
				this.launch()
		}
		else
		{
			this.handle_ball_collision(player_one, player_two)
			this.mesh.position.x += this.x_vel
			this.mesh.position.y += this.y_vel
			this.light.position.set(this.mesh.position.x, this.mesh.position.y)
		}
	}
	handle_ball_collision(player_one, player_two)
	{
		if (this.mesh.position.y + BALL_RADIUS > GAME_AREA_HEIGHT)
			this.y_vel *= -1
		if(this.mesh.position.y - BALL_RADIUS < GAME_AREA_HEIGHT * -1)
			this.y_vel *= -1

		if (this.x_vel < 0)
		{
			if (this.mesh.position.y <= player_one.mesh.position.y + PADDLE_HEIGHT / 2 && this.mesh.position.y >= player_one.mesh.position.y - PADDLE_HEIGHT / 2 && this.mesh.position.x > player_one.mesh.position.x)
			{
				if(this.mesh.position.x - BALL_RADIUS <= player_one.mesh.position.x + PADDLE_WIDTH / 2)
				{
					this.x_vel *= -1
					var middle_y = player_one.mesh.position.y
					var difference_in_y = middle_y - this.mesh.position.y
					var reduction_factor = (PADDLE_HEIGHT / 2) / this.speed
					var new_y_vel = difference_in_y / reduction_factor
					this.y_vel = -1 * new_y_vel
				}
			}
		}
		else
		{
			if (this.mesh.position.y <= player_two.mesh.position.y + PADDLE_HEIGHT / 2 && this.mesh.position.y >= player_two.mesh.position.y - PADDLE_HEIGHT / 2 && this.mesh.position.x < player_two.mesh.position.x)
			{
				if(this.mesh.position.x + BALL_RADIUS >= player_two.mesh.position.x - PADDLE_WIDTH / 2)
				{
					this.x_vel *= -1
					var middle_y = player_two.mesh.position.y
					var difference_in_y = middle_y - this.mesh.position.y
					var reduction_factor = (PADDLE_HEIGHT / 2) / this.speed
					var new_y_vel = difference_in_y / reduction_factor
					this.y_vel = -1 * new_y_vel
				}
			}
		}
	}
}