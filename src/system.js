import * as THREE from "three";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "../node_modules/three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader";
import * as cloth from "./assets/Cloth.png";
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
const cameraOffset = new THREE.Vector3(0, 2, -5);

const renderer = new THREE.WebGLRenderer({ antialias: true });

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
      z: 3,
    },
  },
  {
    url: new URL("./assets/House_2.gltf", import.meta.url),
    position: {
      x: -50,
      y: 2,
      z: 30,
    },
  },
  {
    url: new URL("./assets/House_3.gltf", import.meta.url),
    position: {
      x: 50,
      y: 2,
      z: 15,
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
const ballUrl = new URL("./assets/Ball.gltf", import.meta.url);
const treesUrl = [
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
      x: -20,
      y: -1,
      z: 10,
    },
  },
];
const roadUrl =
  {
    url: new URL('./assets/Road_2.gltf', import.meta.url),
    position: [
      {
        x: 4,
        y: -1.2,
        z: -30,
        rotationZ: 1.62
      }, {
        x: 5.5,
        y: -1.2,
        z: 2,
        rotationZ: 1.62
      }, {
        x: -15,
        y: -1.2,
        z: -8,
        rotationZ: 0.05
      }, {
        x: 15,
        y: -1.2,
        z: -9.5,
        rotationZ: 0.05
      },{
        x: 38,
        y: -1.2,
        z: -30,
        rotationZ: 1.62
      }, {
        x: 39.5,
        y: -1.2,
        z: 2,
        rotationZ: 1.62
      },{
        x: -30,
        y: -1.2,
        z: -30,
        rotationZ: 1.62
      }, {
        x: -28.5,
        y: -1.2,
        z: 2,
        rotationZ: 1.62
      }, {
        x: -24,
        y: -1.2,
        z: -42,
        rotationZ: 0.05
      }, {
        x: 7,
        y: -1.2,
        z: -43.5,
        rotationZ: 0.05
      }, {
        x: 20,
        y: -1.2,
        z: -44,
        rotationZ: 0.05
      }, {
        x: -21,
        y: -1.2,
        z: 26,
        rotationZ: 0.05
      }, {
        x: 10,
        y: -1.2,
        z: 24.5,
        rotationZ: 0.05
      }, {
        x: 23,
        y: -1.2,
        z: 24,
        rotationZ: 0.05
      }
    ]
  }
// 68
const grassUrl = new URL("./assets/Grass.gltf", import.meta.url);
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
for(const road of roadUrl.position){
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
  car.rotation.z = 1.5
  scene.add(car);
});

// Tree
let trees = [];
for (const tree of treesUrl) {
  new GLTFLoader().load(tree.url.href, (result) => {
    const object = result.scene.children[0];
    console.log(object);
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

// Grass

// let x = 50;
// let z = 9;
// const grassSpacing = 3; // Adjust this value to control the spacing between grass squares

// for (let i = 0; i < 10; i++) {
//   x = x - 3;
//   z = 9; // Reset the z position for each iteration of the outer loop

//   for (let j = 0; j < 15; j++) {
//     new GLTFLoader().load(grassUrl.href, (result) => {
//       const grass = result.scene.children[0].clone(); // Clone the grass object to create individual instances
//       grass.traverse((node) => {
//         if (node.isMesh) {
//           node.castShadow = true;
//         }
//       });

//       const grassX = x - j * grassSpacing; // Calculate the x position based on the loop index
//       const grassZ = z - i * grassSpacing; // Calculate the z position based on the loop index

//       grass.position.set(grassX, -1, grassZ);
//       scene.add(grass);
//     });
//   }
// }

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
  const intersects = raycaster.intersectObjects([
    testingCharacter,
    ball,
    dog,
    car,
  ]);
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    if (clickedObject.name == "Character") {
      currentObject = testingCharacter;
    } else if (clickedObject.name.includes("FootballBall")) {
      currentObject = ball;
    } else if (clickedObject.name.includes("Dog")) {
      currentObject = dog;
    }
    //console.log("Clicked Object:", clickedObject);
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

//Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);

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
  characterPreviousPosition.copy(currentObject.position);
  proccessKeyboard();
  checkCollision();
}

let lastUsedKey = null;
let currentObject = null;

function proccessKeyboard() {
  if (keyboard["d"]) {
    currentObject.position.x -= 0.25;
    camera.position.x -= 0.25;
    if (currentObject.rotation.z > -1.4) {
      currentObject.rotation.z -= 0.1;
      console.log(1);
    }
    if (currentObject.rotation.z < -1.5) {
      currentObject.rotation.z += 0.1;
      console.log(2);
    }
    lastUsedKey = "d";
    console.log(currentObject.rotation.z);
  }
  if (keyboard["a"]) {
    currentObject.position.x += 0.25;
    camera.position.x += 0.25;
    if (currentObject.rotation.z < 1.5 && currentObject.rotation.z > -1.5) {
      currentObject.rotation.z += 0.1;
      console.log(3);
    } else if (
      currentObject.rotation.z < -1.5 &&
      currentObject.rotation.z >= -3
    ) {
      if (currentObject.rotation.z - 0.1 <= -3) {
        currentObject.rotation.z = 3;
        console.log(4);
      } else {
        currentObject.rotation.z -= 0.1;
        console.log(5);
      }
    } else if (
      currentObject.rotation.z > 1.6 &&
      currentObject.rotation.z <= 3
    ) {
      currentObject.rotation.z -= 0.1;
    }
    lastUsedKey = "a";
    console.log(currentObject.rotation.z);
  }
  if (keyboard["w"]) {
    currentObject.position.z += 0.25;
    camera.position.z += 0.25;
    if (Math.floor(currentObject.rotation) !== 0) {
      if (currentObject.rotation.z >= -3 && currentObject.rotation.z <= 0) {
        if (currentObject.rotation.z + 0.1 >= 0) {
          currentObject.rotation.z = 0;
        } else {
          currentObject.rotation.z += 0.1;
        }
        console.log(6);
      } else if (
        currentObject.rotation.z <= 3 &&
        currentObject.rotation.z >= 0
      ) {
        if (currentObject.rotation.z - 0.1 <= 0) {
          currentObject.rotation.z = 0;
        } else {
          currentObject.rotation.z -= 0.1;
        }
        console.log(7);
      }
    }
    lastUsedKey = "w";
    console.log(currentObject.rotation.z);
  }
  if (keyboard["s"]) {
    currentObject.position.z -= 0.25;
    camera.position.z -= 0.25;
    if (currentObject.rotation.z > -3 && currentObject.rotation.z < 3) {
      console.log("test");
      if (currentObject.rotation.z <= 0) {
        if (currentObject.rotation.z - 0.1 <= -3) {
          currentObject.rotation.z = 3;
        } else {
          currentObject.rotation.z -= 0.1;
        }
        console.log(8);
      } else if (currentObject.rotation.z >= 0) {
        if (currentObject.rotation.z + 0.1 >= 3) {
          currentObject.rotation.z = -3;
        } else {
          currentObject.rotation.z += 0.1;
        }
        console.log(9);
      }
    }
    lastUsedKey = "s";
    console.log(currentObject.rotation.z);
  }
  if (keyboard["f"] && canRide) {
    testingCharacter.position.set(100, 0.7, 0);    
    testingCharacter.visible = false
    currentObject = car;
    canRide = false;
    inCar = true
  }

  if(keyboard["r"] && inCar){
    testingCharacter.position.set(currentObject.position.x + 5, 0.7, currentObject.position.z)
    testingCharacter.visible = true
    currentObject = testingCharacter
    inCar = false
  }

  const objectPosition = new THREE.Vector3();
  currentObject.getWorldPosition(objectPosition);
  camera.lookAt(currentObject.position);
  controls.target.copy(objectPosition);
  controls.update();
  //   controls.target.copy(currentObject.position);
  //   controls.update();
}

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateMatrix();
});

//utils
function randomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}

let canRide = false;
let inCar = false

function checkCollision() {
  const currentObjectBox = new THREE.Box3().setFromObject(currentObject);
  const characterBox = new THREE.Box3()
    .setFromObject(testingCharacter)
    .expandByScalar(1.5);
  const ballBox = new THREE.Box3().setFromObject(ball);
  const carBox = new THREE.Box3().setFromObject(car);

  if (currentObjectBox.intersectsBox(carBox) && canRide) {
    currentObject.position.copy(characterPreviousPosition);
  }

  if (characterBox.intersectsBox(carBox)) {
    canRide = true;
  } else {
    canRide = false;
  }

  if (currentObjectBox.intersectsBox(ballBox)) {
    // There is a collision between the character and the ball
    const ballSpeed = 1;
    const ballMovement = new THREE.Vector3();

    if (currentObject !== ball) {
      switch (lastUsedKey) {
        case "w":
          ballMovement.z = ballSpeed;
          break;
        case "a":
          ballMovement.x = ballSpeed;
          break;
        case "s":
          ballMovement.z = -ballSpeed;
          break;
        case "d":
          ballMovement.x = -ballSpeed;
          break;
      }
      ballPreviousPosition.copy(ball.position);
      ball.position.add(ballMovement);
    }
  }

  for (const building of buildings) {
    const buildingBox = new THREE.Box3().setFromObject(building);
    if (currentObjectBox.intersectsBox(buildingBox)) {
      // There is a collision, revert the character's position to the previous position
      currentObject.position.copy(characterPreviousPosition);
    }
    if (ballBox.intersectsBox(buildingBox)) {
      // There is a collision, revert the character's position to the previous position
      currentObject.position.copy(characterPreviousPosition);
      ball.position.copy(ballPreviousPosition);
    }
  }
  for (const tree of trees) {
    const treeBox = new THREE.Box3().setFromObject(tree);
    if (currentObjectBox.intersectsBox(treeBox)) {
      // There is a collision, revert the character's position to the previous position
      currentObject.position.copy(characterPreviousPosition);
    }
    if (ballBox.intersectsBox(treeBox)) {
      // There is a collision, revert the character's position to the previous position
      currentObject.position.copy(characterPreviousPosition);
      ball.position.copy(ballPreviousPosition);
    }
  }
}

let clock = new THREE.Clock();

function draw() {
  requestAnimationFrame(draw);
  updateCharacterPosition();
  controls.update();
  renderer.render(scene, camera);
}

draw();
