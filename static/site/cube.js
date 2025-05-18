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

// THREE.JS SCENE SETUP
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.1); // leichtes Nebelgefühl

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-canvas").appendChild(renderer.domElement);

// GEOMETRIE
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshStandardMaterial({
  color: 0x00baff,
  metalness: 0.7,
  roughness: 0.3,
  emissive: 0x001f3f,
  emissiveIntensity: 0.5
});

const cube = new THREE.Mesh(geometry, material);
cube.position.x = -0.5;
scene.add(cube);

// LICHT
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff00ff, 1, 100);
pointLight.position.set(3, 3, 2);
scene.add(pointLight);

// CAMERA
camera.position.z = 5;

// ORBIT CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.rotateSpeed = 0.5;
controls.enableZoom = false;

// ANIMATION
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  pointLight.position.x = Math.sin(Date.now() * 0.001) * 3;
  pointLight.position.z = Math.cos(Date.now() * 0.001) * 3;

  controls.update();
  renderer.render(scene, camera);
}

animate();

// RESPONSIVE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
