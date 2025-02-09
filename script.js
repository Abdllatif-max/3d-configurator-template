
let scene, camera, renderer, model, material, textMesh, controls;
const loader = new THREE.GLTFLoader();
const fontLoader = new THREE.FontLoader();

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.6 / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 3);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional Lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight2.position.set(-1, 1, 1);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight3.position.set(1, 1, -1);
    scene.add(dirLight3);

    const dirLight4 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight4.position.set(-1, 1, -1);
    scene.add(dirLight4);

    // Add Grid Helper
    const gridHelper = new THREE.GridHelper(10, 10); // Size: 10, Divisions: 10
    gridHelper.position.y = 0; // Position it at ground level
    scene.add(gridHelper);

    // Load 3D Model
    loader.load('https://modelviewer.dev/shared-assets/models/Astronaut.glb', function (gltf) {
        model = gltf.scene;
        material = new THREE.MeshStandardMaterial({ color: 0x15b8a6 }); // Initial color #15b8a6
        model.traverse((child) => {
            if (child.isMesh) child.material = material;
        });
        scene.add(model);
    });

    // Camera Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

function changeColor(color) {
    if (material) material.color.setHex(color);
}

function updateText() {
    const textValue = document.getElementById('textInput').value;
    if (!textValue) return;

    if (textMesh) scene.remove(textMesh);

    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const geometry = new THREE.TextGeometry(textValue, {
            font: font,
            size: 0.2,
            height: 0.05
        });
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        textMesh = new THREE.Mesh(geometry, material);
        textMesh.position.set(-0.5, 1.5, 0);
        scene.add(textMesh);
    });
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
    camera.aspect = window.innerWidth * 0.6 / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();