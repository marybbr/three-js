import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

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

const cursor = {
  x: 0,
  y: 0,
};

const renderer = new THREE.WebGLRenderer();
// we also need to set the size at which we want it to render our app.
renderer.setSize(sizes.width, sizes.height);
// it can prevent devices with more pixel ratio to not have problem and stop too many render
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const geometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
//In addition to the geometry, we need a material to color it.
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
//A mesh is an object that takes a geometry, and applies a material to it
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
// By default, when we call scene.add(), the thing we add will be added to the coordinates (0,0,0).
//  This would cause both the camera and the cube to be inside each other.
// To avoid this, we simply move the camera out a bit.
camera.position.z = 5;
// camera.position.y = 2;
camera.lookAt(cube.position);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera aspect property
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
//use GSAP for animating
// gsap.to(cube.position, { duration: 1, delay: 1, x: 1 });

//if you want animate regardless the frame rate you should use Date time

// js solution
// let time = Date.now(); js solution

//Three js solution
// const clock = new THREE.Clock();

const animate = () => {
  //below is js solution
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;
  // cube.rotation.x += 0.001 * deltaTime;
  // cube.rotation.y += 0.001 * deltaTime;

  //Three js solution
  // const elapsedTime = clock.getElapsedTime();
  // cube.rotation.x = elapsedTime * Math.PI * 0.2;
  // cube.rotation.y = elapsedTime;

  // cube.position.x = Math.cos(elapsedTime) * 1.5;
  // cube.position.y = Math.sin(elapsedTime) * 1.5;

  // camera.lookAt(cube);
  // This will update cube position regardless of frame rate

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // This will be run every frame (normally 60 times per second),
  // and give the cube a nice rotation animation. Basically, anything you want
  // to move or change while the app is running has to go through the animate loop.
  // You can of course call other functions from there,
  // so that you don't end up with an animate function that's hundreds of lines.

  //update camera base on cursor position
  // Except this we can use orbit camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(cube.position);
  controls.update();

  requestAnimationFrame(animate);
  // This will create a loop that causes the renderer to draw the scene every
  // time the screen is refreshed (on a typical screen this means 60 times per second).
  //  If you're new to writing games in the browser, you might say "why don't we just
  //  create a setInterval ?" The thing is - we could, but requestAnimationFrame has
  //  a number of advantages. Perhaps the most important one is that it pauses when
  // the user navigates to another browser tab, hence not wasting their precious
  // processing power and battery life.
  renderer.render(scene, camera);
};

animate();
