console.log("🚀 cube.js geladen");

document.addEventListener("DOMContentLoaded", () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById("three-canvas").appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xff00ff, 2, 20);
  pointLight.position.set(5, 5, 5);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const mirror = new THREE.Reflector(
    new THREE.PlaneGeometry(10, 10),
    {
      color: new THREE.Color(0x111111),
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      clipBias: 0.003,
      recursion: 1
    }
  );
  mirror.rotateX(-Math.PI / 2);
  mirror.position.y = -1.5;
  scene.add(mirror);

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const colors = [0xff00ff, 0x00ffff, 0x0000ff, 0xff0099, 0x6600ff, 0x00baff];

  const materials = colors.map(color =>
    new THREE.MeshPhysicalMaterial({
      color,
      transparent: true,
      opacity: 0.75,
      metalness: 0.85,
      roughness: 0.1,
      emissive: color,
      emissiveIntensity: 0.25,
      reflectivity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    })
  );

  const cube = new THREE.Mesh(geometry, materials);
  cube.castShadow = true;
  scene.add(cube);

  const composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));

  const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.2, 0.4, 0.85
  );
  composer.addPass(bloomPass);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.012;
    composer.render();
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
});
