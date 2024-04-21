import * as THREE from "three";

const addLine = () => {
  const scene = new THREE.Scene();

  //   PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
  // fov — Camera frustum vertical field of view.
  // aspect — Camera frustum aspect ratio.
  // near — Camera frustum near plane.
  // far — Camera frustum far plane.
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, -10, 0));
  points.push(new THREE.Vector3(10, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  scene.add(line);
  renderer.render(scene, camera);
};

export default addLine;
