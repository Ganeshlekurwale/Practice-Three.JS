// 🧱 Scene
const scene = new THREE.Scene();

// 🎥 Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
scene.add(camera);

// 🌀 Sphere with realistic material
const sphere = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: "blue",
  roughness: 0.5,
  metalness: 0.5,
});
const mesh = new THREE.Mesh(sphere, material);
scene.add(mesh);

// 💡 Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

// 🔍 Light helper
const lightHelper = new THREE.PointLightHelper(pointLight, 0.5);
scene.add(lightHelper);

// 🖼 Renderer
const canvas = document.querySelector("#practice");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// 📐 Handle window resizing
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// 🔁 Animation loop
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.01;
  lightHelper.update();
  renderer.render(scene, camera);
}

animate();