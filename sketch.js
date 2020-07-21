const w = 20;
let cols, rows;
let toff = 0;
let particles = [];

function setup() {
	createCanvas(600, 400);
	background(40);
	cols = floor(width / w);
	rows = floor(height / w);
	for (let i = 0; i < 500; i++) {
		const p = new Particle();
		particles.push(p);
	}
}

function draw() {
	// // show the flowfield vectors
	// let yoff = 0;
	// for (let y = 0; y < rows; y++) {
	// 	let xoff = 0;
	// 	for (let x = 0; x < cols; x++) {
	// 		const angle = noise(xoff, yoff, toff) * TWO_PI * 2;
	// 		const v = p5.Vector.fromAngle(angle);

	// 		push();
	// 		translate(x * w, y * w);
	// 		rotate(v.heading());
	// 		strokeWeight(1);
	// 		line(0, 0, w, 0);
	// 		pop();

	// 		xoff += 0.05;
	// 	}
	// 	yoff += 0.05;
	// }
	toff += 0.008;

	particles.forEach(p => {
		p.show();
		p.update();

		// calculate what the x and y offsets are for each particle
		const pxoff = floor(p.pos.x / w) * 0.05;
		const pyoff = floor(p.pos.y / w) * 0.05;

		// pass the noise function and offsets so noise values are only calculated for each particle
		p.followField(noise, pxoff, pyoff, toff);
	});
}
