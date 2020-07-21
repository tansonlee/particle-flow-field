class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.prevPos = this.pos.copy();
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxspeed = 3;
	}

	update() {
		this.prevPos = this.pos.copy();

		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);

		// wrap around
		if (this.pos.x > width) {
			this.pos.x = 0;
			this.prevPos = this.pos.copy();
		}
		if (this.pos.x < 0) {
			this.pos.x = width;
			this.prevPos = this.pos.copy();
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
			this.prevPos = this.pos.copy();
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
			this.prevPos = this.pos.copy();
		}
	}

	applyForce(force) {
		force.limit(0.6);
		this.acc.add(force);
	}

	show() {
		stroke(255, 1);
		strokeWeight(1);
		line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
	}

	followField(noise, xoff, yoff, toff) {
		const angle = noise(xoff, yoff, toff) * TWO_PI * 2;
		const v = p5.Vector.fromAngle(angle);
		this.applyForce(v);
	}
}
