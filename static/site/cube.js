// THREE SETUP
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.08);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-canvas").appendChild(renderer.domElement);

// LICHT
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(4, 4, 4);
scene.add(pointLight);

// FARBEN
const colors = [
  0xff00ff, // pink
  0x00ffff, // cyan
  0x6600ff, // lila
  0x000000, // schwarz innen für glitch-effekt
  0x00baff, // mind2app-blau
  0xff0099  // magenta
];

// GEOMETRIE & MATERIALIEN
const geometry = new THREE.BoxGeometry(3, 3, 3);

const materials = colors.map(color => new THREE.MeshStandardMaterial({
  color,
  transparent: true,
  opacity: 0.45,
  metalness: 0.8,
  roughness: 0.2,
  emissive: color,
  emissiveIntensity: 0.7
}));

// 6 Seiten mit eigenen Farben
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// GHOST-CUBE für extra Glitch
const ghostCube = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
  color: 0xffffff,
  opacity: 0.1,
  transparent: true,
  metalness: 1,
  roughness: 0,
  emissive: 0xffffff,
  emissiveIntensity: 0.2
}));
ghostCube.scale.set(1.05, 1.05, 1.05);
scene.add(ghostCube);

// ANIMATION
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.007;
  cube.rotation.y += 0.01;
  ghostCube.rotation.x += 0.007;
  ghostCube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// RESPONSIVE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
