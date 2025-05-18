// Header Scroll
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

// THREE.JS BASIC SETUP
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.08);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-canvas").appendChild(renderer.domElement);

// LICHTSETUP
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff00ff, 1.5, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// WÜRFEL
const geometry = new THREE.BoxGeometry(3, 3, 3); // << größer gemacht!
const material = new THREE.MeshStandardMaterial({
  color: 0x00baff,
  metalness: 0.7,
  roughness: 0.2,
  emissive: 0x220066,
  emissiveIntensity: 0.4,
  transparent: true,
  opacity: 0.95
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// ANIMATION
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.013;

  pointLight.position.x = Math.sin(Date.now() * 0.001) * 4;
  pointLight.position.y = Math.cos(Date.now() * 0.001) * 4;

  renderer.render(scene, camera);
}
animate();

// RESPONSIVE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
