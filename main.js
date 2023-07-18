import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


renderer.render(scene, camera);


// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0.0, 10.0, -30.0);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('sunset_city_sky_by_zpidee_deny5ba-pre.jpg');
scene.background = spaceTexture;

// Runner

const fbxLoader = new FBXLoader();
const textureLoader = new THREE.TextureLoader();

const avatarTexture = textureLoader.load('./99-low-poly-cars-free_fbx/Low Poly Cars (Free)_fbx/Textures/Car Texture 1.png');
fbxLoader.load('./99-low-poly-cars-free_fbx/Low Poly Cars (Free)_fbx/Models/car_1.fbx', (avatar) => {
  avatar.traverse((child) => {
    if (child.isMesh) {
      child.material.map = avatarTexture;
    }
  });
  avatar.scale.set(0.30, 0.30, 0.30);
  avatar.rotation.x = 1.5707963268
  avatar.rotation.z = 1.2
  avatar.position.set(-0.6, -0.62, -4.3)
  scene.add(avatar);
}, undefined, (error) => {
  console.error(error);
});
// COP1
const COP1 = textureLoader.load('./99-low-poly-cars-free_fbx/Low Poly Cars (Free)_fbx/Textures/Car Texture 2.png');
fbxLoader.load('./99-low-poly-cars-free_fbx/Low Poly Cars (Free)_fbx/Models/car_2.fbx', (newModel) => {
  newModel.traverse((child) => {
    if (child.isMesh) {
      child.material.map = COP1;
    }
  });
  // Adjust the scale, rotation, and position of the new model as desired
  newModel.scale.set(0.32, 0.32, 0.32);
  newModel.rotation.x = 1.5707963268
  newModel.rotation.z = 1.3
  newModel.position.set(0.5, -0.62, -2.3)
  scene.add(newModel);
}, undefined, (error) => {
  console.error(error);
});
// COP2
const COP2 = textureLoader.load('./99-low-poly-cars-free_fbx/Low Poly Cars (Free)_fbx/Textures/Car Texture 2.png');
fbxLoader.load('./99-low-poly-cars-free_fbx/Low Poly Cars (Free)_fbx/Models/car_2.fbx', (newModel) => {
  newModel.traverse((child) => {
    if (child.isMesh) {
      child.material.map = COP2;
    }
  });
  // Adjust the scale, rotation, and position of the new model as desired
  newModel.scale.set(0.32, 0.32, 0.32);
  newModel.rotation.x = 1.5707963268
  newModel.rotation.z = 2;
  newModel.position.set(-0.5, -0.56, 1.0)
  scene.add(newModel);
}, undefined, (error) => {
  console.error(error);
});
// //Highway
// fbxLoader.load('./Highway/uploads_files_3638915_HighWay.fbx', (newModel) => {
//   // Adjust the scale, rotation, and position of the new model as desired
//   newModel.scale.set(0.1, 0.1, 0.1);
//   //newModel.rotation.x = 1.5707963268;
//   //newModel.rotation.z = 1.5707963268;
//   newModel.rotation.y = -1.6;
//   newModel.position.set(-1.0, -1.5, -6);
//   scene.add(newModel);
// }, undefined, (error) => {
//   console.error(error);
// });
// Import the FBXLoader and MTLLoader from Three.js

// Create a new instance of MTLLoader
const mtlLoader = new MTLLoader();
//mtlLoader.setPath('./Highway/'); // Set the path to the folder containing the MTL file
function removeLights(object) {
  if (object.isLight) {
      // Remove the light from the scene
      scene.remove(object);
  } else {
      // Recursively search for lights in children
      object.children.forEach(function (child) {
          removeLights(child);
      });
  }
}
const tdsLoader = new TDSLoader();
// Load the Highway
mtlLoader.load('./Highway/uploads_files_3638915_HighWay.mtl', (materials) => {
  materials.preload();

  // Create a new instance of FBXLoader
  const fbxLoader = new FBXLoader();

  // Assign the materials directly to the FBXLoader's materials property
  fbxLoader.materials = materials.materials;

  // Load the FBX file
  tdsLoader.load('./Highway/uploads_files_3638915_HighWay.3ds', (newModel) => {
    // Adjust the scale, rotation, and position of the new model as desired
    newModel.scale.set(0.1, 0.1, 0.1);
    //newModel.rotation.y = -1.6;
    newModel.rotation.x = -1.6;
    newModel.rotation.z = -1.62;
    newModel.position.set(1.0, -1.5, -6);

    // Add the new model to the scene
    removeLights(newModel);
    scene.add(newModel);
  }, undefined, (error) => {
    console.error(error);
  });
});







const BillboardLoader = new FBXLoader();

BillboardLoader.load('./billboard-psd-layered-texture-maps-included/source/Billboard_Model.fbx', (BillboardModel) => {


  // Adjust the scale, rotation, and position of the new model as desired
  BillboardModel.scale.set(0.003, 0.003, 0.003);
  BillboardModel.position.set(3, -0.56, -1.0);
  BillboardModel.rotation.y = Math.PI;

  scene.add(BillboardModel);
}, undefined, (error) => {
  console.error(error);
});





// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);
moon.position.set(0.0, 10.0, -30.0)


// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.y += 0.05;


  camera.position.z = t * -0.001;
  camera.position.y = t * -0.0001;
}
document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  moon.rotation.y += 0.005;
  camera.position.y = 0.1;
  renderer.render(scene, camera);
}
animate();
