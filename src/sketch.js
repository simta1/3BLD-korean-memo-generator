let cube;

function setup() {
    createCanvas(600, 600, WEBGL);
	cube = new Cube();
}

function draw() {
	background(255);
	orbitControl();
	cube.display();
}

function keyPressed() {
	if (key == 'F') cube.applyMove(Move.F);

}