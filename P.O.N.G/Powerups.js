import * as THREE from 'three'

import { powerWallMaterial, powerCurseMaterial, powerReverseMaterial } from './Materials';
import * as constants from './Constants';

export class Power_Manager
{
	constructor()
	{
		this.array = [];
		this.timer = new THREE.Clock();
	}
	spawn_power(scene)
	{
		var powertospawn = 0;
		// var powertospawn = Math.floor(Math.random() * 3);
		console.log(powertospawn)
		switch(powertospawn){
			case 0:
				this.array[0] = new WallPowerup(getRandomPos());
				scene.add(this.array[0].mesh)
				break;
			case 1:
				this.array[0] = new ReversePowerup(getRandomPos());
				scene.add(this.array[0].mesh)
				break;
			case 2:
				this.array[0] = new CursePowerup(getRandomPos());
				scene.add(this.array[0].mesh)
				break;
		}
	}
	update(player_one, player_two, ball, scene)
	{
		if (this.array.length == 0 && !this.timer.running)
			this.timer.start()
		else
		{
			this.timer.getElapsedTime()
			if (this.timer.elapsedTime >= constants.POWER_RESPAWN_TIME && this.array.length == 0)
			{
				this.timer.stop();
				this.spawn_power(scene);
			}
			else if (this.array.length == 1)
				this.array[0].update(player_one, player_two, ball);
		}
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomPos()
{
	var x = getRandomInt(constants.POWER_SPAWNAREA_WIDTH * -1, constants.POWER_SPAWNAREA_WIDTH);
	var y = getRandomInt(constants.POWER_SPAWNAREA_HEIGHT * -1, constants.POWER_SPAWNAREA_HEIGHT);
	return new THREE.Vector3(x, y, 0);
}

export class WallPowerup
{
	constructor(vector)
	{
		this.geometry = new THREE.SphereGeometry(constants.POWER_RADIUS, 10, 10);
		this.material = powerWallMaterial
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.copy(vector);
		this.light = new THREE.PointLight(0xffffff, 10000 ,100)
		this.light.castShadow = false
	}
	update(player_one, player_two, ball)
	{
		this.handle_power_collision(player_one, player_two, ball)
		this.light.position.set(this.mesh.position.x, this.mesh.position.y)
	}
	handle_power_collision(player_one, player_two, ball)
	{
		var distance = Math.sqrt((ball.mesh.position.x - this.mesh.position.x)**2 + (ball.mesh.position.y - this.mesh.position.y)**2)
		if (distance <= (constants.BALL_RADIUS + constants.POWER_RADIUS))
		{
			if (ball.material.emissive == constants.PLAYER_1_COLOR)
				player_one.add_powerup(powerup)
			else if (ball.material.emissive == constants.PLAYER_2_COLOR)
				player_two.add_powerup(powerup)
		}
	}
}

export class ReversePowerup
{
	constructor()
	{
		this.geometry = new THREE.SphereGeometry(constants.POWER_RADIUS, 10, 10);
		this.material = powerWallMaterial
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(0, 0, 0);
		this.light = new THREE.PointLight(0xffffff, 10000 ,100)
		this.light.castShadow = false
	}
	update(player_one, player_two)
	{
		this.handle_power_collision(player_one, player_two)
		this.light.position.set(this.mesh.position.x, this.mesh.position.y)
	}
	handle_power_collision(ball, player_one, player_two)
	{
		var distance = Math.sqrt((ball.mesh.position.x - this.mesh.position.x)**2 + (ball.mesh.position.y - this.mesh.position.y)**2)
		if (distance <= (constants.BALL_RADIUS + constants.POWER_RADIUS))
		{
			if (ball.material.emissive == constants.PLAYER_1_COLOR)
				player_one.add_powerup(powerup)
			else if (ball.material.emissive == constants.PLAYER_2_COLOR)
				player_two.add_powerup(powerup)
		}
	}
}

export class CursePowerup
{
	constructor()
	{
		this.geometry = new THREE.SphereGeometry(constants.POWER_RADIUS, 10, 10);
		this.material = powerWallMaterial
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(0, 0, 0);
		this.light = new THREE.PointLight(0xffffff, 10000 ,100)
		this.light.castShadow = false
	}
	update(player_one, player_two)
	{
		this.handle_power_collision(player_one, player_two)
		this.light.position.set(this.mesh.position.x, this.mesh.position.y)
	}
	handle_power_collision(ball, player_one, player_two)
	{
		var distance = Math.sqrt((ball.mesh.position.x - this.mesh.position.x)**2 + (ball.mesh.position.y - this.mesh.position.y)**2)
		if (distance <= (constants.BALL_RADIUS + constants.POWER_RADIUS))
		{
			if (ball.material.emissive == constants.PLAYER_1_COLOR)
				player_one.add_powerup(powerup)
			else if (ball.material.emissive == constants.PLAYER_2_COLOR)
				player_two.add_powerup(powerup)
		}
	}
}