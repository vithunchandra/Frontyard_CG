import * as THREE from "three";
import { PointerLockControls } from "../node_modules/three/examples/jsm/controls/PointerLockControls";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader";
import * as grassBaseTextureRaw from "./assets/Texture/lambert1_baseColor.png";
import * as grassNormalTextureRaw from "./assets/Texture/lambert1_normal.png";

// System Inizialization
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

//Camera Controls
const menuPanel = document.getElementById("menuPanel");
const startButton = document.getElementById("startButton");
startButton.addEventListener(
  "click",
  function () {
    controls.lock();
  },
  false
);
const controls = new PointerLockControls(camera, renderer.domElement);
controls.addEventListener("lock", () => (menuPanel.style.display = "none"));
controls.addEventListener("unlock", () => (menuPanel.style.display = "block"));

//Import Assets
const testingCharacterURL = new URL(
  "./assets/characterTesting.gltf",
  import.meta.url
);
const buildingUrl = [
  {
    url: new URL("./assets/House_1.gltf", import.meta.url),
    position: {
      x: 20,
      y: -1,
      z: 5,
    },
  },
  {
    url: new URL("./assets/House_2.gltf", import.meta.url),
    position: {
      x: -20,
      y: 2,
      z: -25,
    },
  },
  {
    url: new URL("./assets/House_3.gltf", import.meta.url),
    position: {
      x: 20,
      y: 2,
      z: -25,
    },
  },
  {
    url: new URL("./assets/Tower.gltf", import.meta.url),
    position: {
      x: -20,
      y: -1,
      z: 5,
    },
  },
];
const fieldUrl = new URL("./assets/SportsField.gltf", import.meta.url);
const ballUrl = new URL("./assets/Ball.gltf", import.meta.url);
const treesUrl = [
  //Rumah 1
  //x: -20,
  //y: -1,
  //z: 5,
  {
    url: new URL("./assets/Tree.gltf", import.meta.url),
    position: {
      x: -20,
      y: -1,
      z: 10,
    },
  },
  {
    url: new URL("./assets/Tree_1.gltf", import.meta.url),
    position: {
      x: -15,
      y: -1,
      z: 10,
    },
  },
  {
    url: new URL("./assets/Tree_2.gltf", import.meta.url),
    position: {
      x: -10,
      y: -1,
      z: -2,
    },
  },
  //Rumah 2
  // x: 20,
  // y: -1,
  // z: 5,
  {
    url: new URL("./assets/Tree.gltf", import.meta.url),
    position: {
      x: 16,
      y: -1,
      z: 10,
    },
  },
  {
    url: new URL("./assets/Tree_1.gltf", import.meta.url),
    position: {
      x: 8,
      y: -1,
      z: 2,
    },
  },
  {
    url: new URL("./assets/Tree_2.gltf", import.meta.url),
    position: {
      x: 25,
      y: -1,
      z: -5,
    },
  },
  //Rumah 3
  // x: -20,
  // y: 2,
  // z: -25,
  {
    url: new URL("./assets/Tree.gltf", import.meta.url),
    position: {
      x: -10,
      y: -1,
      z: -23,
    },
  },
  {
    url: new URL("./assets/Tree_1.gltf", import.meta.url),
    position: {
      x: -16,
      y: -1,
      z: -30,
    },
  },
  {
    url: new URL("./assets/Tree_2.gltf", import.meta.url),
    position: {
      x: -22,
      y: -1,
      z: -35,
    },
  },
  //Rumah 4
  // x: 20,
  // y: 2,
  // z: -25,
  {
    url: new URL("./assets/Tree.gltf", import.meta.url),
    position: {
      x: 26,
      y: -1,
      z: -20,
    },
  },
  {
    url: new URL("./assets/Tree_1.gltf", import.meta.url),
    position: {
      x: 20,
      y: -1,
      z: -30,
    },
  },
  {
    url: new URL("./assets/Tree_2.gltf", import.meta.url),
    position: {
      x: 10,
      y: -1,
      z: -35,
    },
  },
];
const roadUrl = {
  url: new URL("./assets/Road_2.gltf", import.meta.url),
  position: [
    {
      x: 4,
      y: -1.2,
      z: -30,
      rotationZ: 1.62,
    },
    {
      x: 5.5,
      y: -1.2,
      z: 2,
      rotationZ: 1.62,
    },
    {
      x: -15,
      y: -1.2,
      z: -8,
      rotationZ: 0.05,
    },
    {
      x: 15,
      y: -1.2,
      z: -9.5,
      rotationZ: 0.05,
    },
    {
      x: 38,
      y: -1.2,
      z: -30,
      rotationZ: 1.62,
    },
    {
      x: 39.5,
      y: -1.2,
      z: 2,
      rotationZ: 1.62,
    },
    {
      x: -30,
      y: -1.2,
      z: -30,
      rotationZ: 1.62,
    },
    {
      x: -28.5,
      y: -1.2,
      z: 2,
      rotationZ: 1.62,
    },
    {
      x: -24,
      y: -1.2,
      z: -42,
      rotationZ: 0.05,
    },
    {
      x: 7,
      y: -1.2,
      z: -43.5,
      rotationZ: 0.05,
    },
    {
      x: 20,
      y: -1.2,
      z: -44,
      rotationZ: 0.05,
    },
    {
      x: -21,
      y: -1.2,
      z: 26,
      rotationZ: 0.05,
    },
    {
      x: 10,
      y: -1.2,
      z: 24.5,
      rotationZ: 0.05,
    },
    {
      x: 23,
      y: -1.2,
      z: 24,
      rotationZ: 0.05,
    },
  ],
};
const waterUrl = {
  url: new URL("./assets/Water.gltf", import.meta.url),
  position: [
    {
      z: -60,
      y: 0,
      x: -50,
    },
    {
      z: -60,
      y: 0,
      x: -45,
    },
    {
      z: -60,
      y: 0,
      x: -40,
    },
    {
      z: -60,
      y: 0,
      x: -35,
    },
    {
      z: -60,
      y: 0,
      x: -30,
    },
    {
      z: -60,
      y: 0,
      x: -25,
    },
    {
      z: -60,
      y: 0,
      x: -20,
    },
    {
      z: -60,
      y: 0,
      x: -15,
    },
    {
      z: -60,
      y: 0,
      x: -10,
    },
    {
      z: -60,
      y: 0,
      x: -5,
    },
    {
      z: -60,
      y: 0,
      x: 0,
    },
    {
      z: -60,
      y: 0,
      x: 5,
    },
    {
      z: -60,
      y: 0,
      x: 10,
    },
    {
      z: -60,
      y: 0,
      x: 15,
    },
    {
      z: -60,
      y: 0,
      x: 20,
    },
    {
      z: -60,
      y: 0,
      x: 25,
    },
    {
      z: -60,
      y: 0,
      x: 30,
    },
    {
      z: -60,
      y: 0,
      x: 35,
    },
    {
      z: -60,
      y: 0,
      x: 40,
    },
    {
      z: -60,
      y: 0,
      x: 45,
    },
    {
      z: -60,
      y: 0,
      x: 50,
    },
  ],
};
const dogUrl = new URL("./assets/Dog.gltf", import.meta.url);
const carUrl = new URL("./assets/Car.gltf", import.meta.url);

// const texture = new THREE.TextureLoader().load(cloth);

//Loading Assets
const grassBaseTexture = new THREE.TextureLoader().load(grassBaseTextureRaw);
grassBaseTexture.magFilter = THREE.LinearFilter;
grassBaseTexture.wrapS = THREE.RepeatWrapping;
grassBaseTexture.wrapT = THREE.RepeatWrapping;
grassBaseTexture.repeat.set(50, 50);

const grassNormalTexture = new THREE.TextureLoader().load(
  grassNormalTextureRaw
);
grassNormalTexture.magFilter = THREE.LinearFilter;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.repeat.set(50, 50);

// Character
let testingCharacter = undefined;
new GLTFLoader().load(testingCharacterURL.href, (result) => {
  testingCharacter = result.scene.children[0];
  testingCharacter.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  testingCharacter.position.set(0, 0.7, 0);
  controls.target.copy(testingCharacter.position);
  controls.update();
  scene.add(testingCharacter);
});

// Road
let roads = [];
for (const road of roadUrl.position) {
  new GLTFLoader().load(roadUrl.url.href, (result) => {
    const object = result.scene.children[0];
    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    object.position.set(road.x, road.y, road.z);
    object.rotation.z = road.rotationZ;
    scene.add(object);
    roads.push(object);
  });
}
// Buildings

let buildings = [];

for (const building of buildingUrl) {
  new GLTFLoader().load(building.url.href, (result) => {
    const object = result.scene.children[0];
    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    const position = building.position;
    object.position.set(position.x, position.y, position.z);
    scene.add(object);
    buildings.push(object);
  });
}

let field = undefined;
new GLTFLoader().load(fieldUrl.href, (result) => {
  const object = result.scene.children[0];
  object.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  object.position.set(0, -1.2, 70);
  object.rotation.z = -0.05;
  scene.add(object);
  field = object;
});

// Water
let water = [];
for (const position of waterUrl.position) {
  new GLTFLoader().load(waterUrl.url.href, (result) => {
    const object = result.scene.children[0];
    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    object.position.set(position.x, -0.8, -70);
    scene.add(object);
    water.push(object);
  });
}

// Ball

let ball = undefined;
new GLTFLoader().load(ballUrl.href, (result) => {
  ball = result.scene.children[0];
  ball.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  ball.position.set(0, -0.7, 5);
  scene.add(ball);
});

// Dog
let dog = undefined;
new GLTFLoader().load(dogUrl.href, (result) => {
  dog = result.scene.children[0];
  dog.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  dog.position.set(5, -1, 5);
  scene.add(dog);
});

// Car
let car = undefined;
new GLTFLoader().load(carUrl.href, (result) => {
  car = result.scene.children[0];
  car.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  car.position.set(15, -0.7, 15);
  car.rotation.z = -3;
  scene.add(car);
});

// Tree
let trees = [];
for (const tree of treesUrl) {
  new GLTFLoader().load(tree.url.href, (result) => {
    const object = result.scene.children[0];
    object.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });
    const position = tree.position;
    object.position.set(position.x, position.y, position.z);
    scene.add(object);
    trees.push(object);
  });
}

// Raycaster for object selection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Event listeners for mouse interaction
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mousedown", onMouseDown);

function onMouseMove(event) {
  // Calculate normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseDown(event) {
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections with character, ball, and dog
  const intersects = raycaster.intersectObjects([testingCharacter, ball, dog]);
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    if (clickedObject.name == "Character") {
      currentObject = testingCharacter;
    } else if (clickedObject.name.includes("FootballBall")) {
      currentObject = ball;
    } else if (clickedObject.name.includes("Dog")) {
      currentObject = dog;
    }
  }
}

// Add renderer to the document
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Render loop
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

//Settings
camera.position.set(0, 0, 10);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; //THREE.BasicShadowMap | THREE.PCFShadowMap |  THREE.VSMShadowMap | THREE.PCFSoftShadowMap

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.backgroundColor = new THREE.Color(255, 255, 255);

//Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(300, 300, 0);
light.target.position.set(-20, 0, 5);
light.castShadow = true;
light.shadow.mapSize.set(2048, 2048);
light.shadow.bias = 0.9;
light.shadow.camera.near = 0.0; // default
light.shadow.camera.far = 5000; // default
light.shadow.camera.left = -100;
light.shadow.camera.right = 100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
scene.add(light);
scene.add(light.target);

scene.add(new THREE.CameraHelper(light.shadow.camera));

const lightHelper = new THREE.DirectionalLightHelper(light, 10, 0xff00ff);
scene.add(lightHelper);

//Plane
const plane = new THREE.PlaneGeometry(1000, 1000, 100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x00ffff,
  map: grassBaseTexture,
  normalMap: grassNormalTexture,
});
const planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2;
planeMesh.position.set(0, -1, 0);
planeMesh.receiveShadow = true;
scene.add(planeMesh);

//Control

let keyboard = [];

document.body.addEventListener("keydown", (evt) => {
  keyboard[evt.key] = true;
});

document.body.addEventListener("keyup", (evt) => {
  keyboard[evt.key] = false;
});

let characterPreviousPosition = new THREE.Vector3();
let ballPreviousPosition = new THREE.Vector3();
function updateCharacterPosition() {
  characterPreviousPosition.copy(camera.position);
  proccessKeyboard();
  checkCollision();
}

let lastUsedKey = null;
let currentObject = null;
let lastCameraPosition = undefined;
const timer = new THREE.Clock();

function proccessKeyboard() {
  let speed = 5 * timer.getDelta();
  if (keyboard["d"]) {
    controls.moveRight(speed);
    lastUsedKey = "d";
  }
  if (keyboard["a"]) {
    controls.moveRight(-speed);
    lastUsedKey = "a";
  }
  if (keyboard["w"]) {
    controls.moveForward(speed);
    lastUsedKey = "w";
  }
  if (keyboard["s"]) {
    controls.moveForward(-speed);
    lastUsedKey = "s";
  }
  if (keyboard["f"] && canRide) {
    testingCharacter.position.set(100, 0.7, 0);
    testingCharacter.visible = false;
    currentObject = car;
    canRide = false;
    inCar = true;
  }

  if (keyboard["r"] && inCar) {
    testingCharacter.position.set(
      camera.position.x + 5,
      0.7,
      camera.position.z
    );
    testingCharacter.visible = true;
    currentObject = testingCharacter;
    inCar = false;
  }

  lastCameraPosition = camera.position;

  testingCharacter.position.copy(camera.position);
}

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateMatrix();
});

//utils

let canRide = false;
let inCar = false;

function checkCollision() {
  const currentObjectBox = new THREE.Box3().setFromObject(currentObject);
  const characterBox = new THREE.Box3()
    .setFromObject(testingCharacter)
    .expandByScalar(1.5);
  const ballBox = new THREE.Box3().setFromObject(ball);
  const carBox = new THREE.Box3().setFromObject(car);

  if (currentObjectBox.intersectsBox(carBox) && canRide) {
    camera.position.copy(characterPreviousPosition);
  }

  if (characterBox.intersectsBox(carBox)) {
    canRide = true;
  } else {
    canRide = false;
  }


  if (currentObjectBox.intersectsBox(ballBox)) {
    // There is a collision between the character and the ball
    const ballSpeed = camera.position.sub(lastCameraPosition);
    const ballMovement = new THREE.Vector3();

    if (currentObject !== ball) {
      ball.position.add(ballSpeed);
    }
  }

  for (const building of buildings) {
    const buildingBox = new THREE.Box3().setFromObject(building);
    if (currentObjectBox.intersectsBox(buildingBox)) {
      // There is a collision, revert the character's position to the previous position
      camera.position.copy(characterPreviousPosition);
    }
    if (ballBox.intersectsBox(buildingBox)) {
      // There is a collision, revert the character's position to the previous position
      camera.position.copy(characterPreviousPosition);
      ball.position.copy(ballPreviousPosition);
    }
  }
  for (const tree of trees) {
    const treeBox = new THREE.Box3().setFromObject(tree).expandByScalar(0.3);
    if (currentObjectBox.intersectsBox(treeBox)) {
      // There is a collision, revert the character's position to the previous position
      camera.position.copy(characterPreviousPosition);
    }
    if (ballBox.intersectsBox(treeBox)) {
      // There is a collision, revert the character's position to the previous position
      camera.position.copy(characterPreviousPosition);
      ball.position.copy(ballPreviousPosition);
    }
  }
}

// Declare a clock to track time
const clock = new THREE.Clock();

// Set the initial position of the light
const radius = 300;
let angle = 0;

function draw() {
  requestAnimationFrame(draw);
  // Calculate the new position of the light
  const delta = clock.getDelta();
  const speed = 0.1; // Adjust this value to change the rotation speed
  angle += speed * delta;

  const x = Math.cos(angle) * radius;
  const y = 300; // Keep the same y position
  const z = Math.sin(angle) * radius;

  light.position.set(x, y, z);

  // Update any helpers if needed
  lightHelper.update();
  updateCharacterPosition();
  renderer.render(scene, camera);
}

draw();
