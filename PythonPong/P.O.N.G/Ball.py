import pygame 


#Ball class
class Ball:
	RESET_COOLDOWN = 1500

	def __init__(self, x, y, radius, color):
		self.x = self.original_x = x
		self.y = self.original_y = y
		self.radius = radius
		self.x_vel = BALL_SPEED
		self.y_vel = 0
		self.color = color

	def draw(self, win):
		pygame.draw.circle(win, self.color, (self.x, self.y),self.radius)

	def move(self):
		self.x += self.x_vel
		self.y += self.y_vel

	def	reset(self):
		self.wait_start = pygame.time.get_ticks()
		self.direction = (self.x_vel * -1)
		self.color = WHITE
		self.x_vel = 0
		self.y_vel = 0
		self.x = self.original_x
		self.y = self.original_y

	def reverse_effect(self):
		self.x_vel *= -1
		self.y_vel *= -1

	def update(self):
		if self.x_vel == 0:
			current_time = pygame.time.get_ticks()
			if current_time - self.wait_start >= self.RESET_COOLDOWN:
				self.x_vel = self.direction
				self.direction = 0


def handle_ball_collision(ball, players, wall):
    
	if ball.y + ball.radius >= WIN_HEIGHT or ball.y - ball.radius <= 0: # Handling ceiling and floor collision
		ball.y_vel *= -1

	# # Wall collision
	# if ball.x_vel < 0 and ball.x >= WIN_WIDTH // 2 or ball.x_vel > 0 and ball.x <= WIN_WIDTH // 2:
	# 	if (
	# 		ball.x - wall.width <= WIN_WIDTH // 2 + wall.width
	# 		and wall.isActive
	# 	):
	# 		ball.x_vel *= -1
	# 		middle_y = WIN_HEIGHT // 2
	# 		difference_in_y = middle_y - ball.y
	# 		reduction_factor = (middle_y / 2) / BALL_SPEED
	# 		y_vel = difference_in_y / reduction_factor
	# 		ball.y_vel = -1 * y_vel
    # Iterate over each player for collision detection
	for player in players:
		if player.orientation == 'v' :
			if ball.y >= player.y - player.height // 2 and ball.y <= player.y + player.height // 2 :
				if ball.x + ball.radius >= player.x - player.width // 2 and ball.x - ball.radius <= player.x + player.width // 2 :
					ball.x_vel *= -1
					ball.color = player.color
					middle_y = player.y + player.height / 2
					difference_in_y = middle_y - ball.y
					reduction_factor = (player.height / 2) / BALL_SPEED
					y_vel = difference_in_y / reduction_factor
					ball.y_vel = -1 * y_vel