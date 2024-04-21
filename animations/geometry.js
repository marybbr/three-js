import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  65,
  sizes.width / sizes.height,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//geometry

//first solution
// const positionsArray = new Float32Array(9);

// !first vertices
// positionsArray[0] = 0; x
// positionsArray[1] = 0; y
// positionsArray[2] = 0; z

// !second vertices
// positionsArray[3] = 0; x
// positionsArray[4] = 1; y
// positionsArray[5] = 0; z

// !third vertices
// positionsArray[6] = 1; x
// positionsArray[7] = 0; y
// positionsArray[8] = 0; z

//second solution
// const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
// const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", positionAttribute);

// for lots of points
const geometry = new THREE.BufferGeometry();
const count = 100;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}
const positionAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 5;
camera.lookAt(cube.position);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

const animate = () => {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
