// Scene and Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // light blue sky

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 6);

// Renderer with shadow
const canvas = document.querySelector("#draw");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
light.castShadow = true;
scene.add(light);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x228b22 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
ground.receiveShadow = true;
scene.add(ground);

// Ball
const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.castShadow = true;
scene.add(ball);

// Physics values
let velocity = 0;
const gravity = -0.01;
const bounceDamping = 1;
const groundLevel = 0.5;

ball.position.y = 5;

// Animate
function animate() {
  requestAnimationFrame(animate);

  velocity += gravity;
  ball.position.y += velocity;

  // Collision detection with ground
  if (ball.position.y <= groundLevel) {
    ball.position.y = groundLevel;
    velocity *= -bounceDamping; // bounce back with reduced speed

    // // Stop if velocity is too low
    // if (Math.abs(velocity) < 0.01) {
    //   velocity = 0;
    // }
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

animate();
