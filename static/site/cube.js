window.addEventListener("scroll", () => {
  const header = document.getElementById("main-header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

function toggleMenu() {
  const overlay = document.getElementById("menuOverlay");
  const hero = document.getElementById("hero");
  overlay.classList.toggle("open");
  hero.classList.toggle("shrink");
}

// THREE.JS Cube Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-canvas").appendChild(renderer.domElement);

// Cube Geometry
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshStandardMaterial({
  color: 0x00baff,
  metalness: 0.6,
  roughness: 0.3
});
const cube = new THREE.Mesh(geometry, material);
cube.position.x = -0.5; // 🠔 leicht nach links verschoben
scene.add(cube);

// Lighting
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(2, 3, 4);
scene.add(light);

// Camera position
camera.position.z = 4;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
