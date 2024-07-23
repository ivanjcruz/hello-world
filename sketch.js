let cam;
let objects = [];
const numObjects = 20;
const objectSize = 50;

function setup() {
  createCanvas(800, 800, WEBGL);
  cam = createCamera();

  // Generate random objects in the scene
  for (let i = 0; i < numObjects; i++) {
    let x = random(-1000, 1000);
    let y = random(-1000, 1000);
    let z = random(-1000, 1000);
    objects.push(createVector(x, y, z));
  }
}

function draw() {
  background(200);

  // Allow orbit control
  orbitControl();

  // Draw a 3D box in the center
  push();
  fill(150, 0, 150);
  box(100);
  pop();

  // Get the camera position
  let camX = cam.eyeX;
  let camY = cam.eyeY;
  let camZ = cam.eyeZ;

  // Calculate the distance from the camera's focus/target (which is usually at the origin (0,0,0))
  let camDistance = dist(camX, camY, camZ, 0, 0, 0);

  // Print the camera position
  // let camPosition = `Camera Position: x=${camX.toFixed(2)}, y=${camY.toFixed(2)}, z=${camZ.toFixed(2)}`;
  // print(camPosition);

  // Draw objects
  for (let obj of objects) {
    push();
    translate(obj.x, obj.y, obj.z);
    let camDistance = dist(camX, camY, camZ, obj.x, obj.y, obj.z);

     if (camDistance <= 2000) {
      sphere(objectSize / 2);
    } else if (camDistance <= 2500) {
      box(objectSize);
    } else   {
      stroke(255, 0, 0);
      strokeWeight(10);
      point(0, 0, 0);
    }
    pop();
  }
}
