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
const grassUrl = new URL("./assets/Grass.gltf", import.meta.url);
const dogUrl = new URL("./assets/Dog.gltf", import.meta.url);

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
  testingCharacter.onClick = () => {
    node.userData.isSelectable = true; // Add a custom property to make it selectable
    console.log("Character clicked!");
  };
  controls.target.copy(testingCharacter.position);
  controls.update();
  scene.add(testingCharacter);
});

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
      node.userData.isSelectable = true; // Add a custom property to make it selectable
    }
  });
  ball.position.set(0, -0.7, 5);
  ball.onClick = () => {
    console.log("Ball clicked!");
  };
  scene.add(ball);
});

let dog = undefined;
new GLTFLoader().load(dogUrl.href, (result) => {
  dog = result.scene.children[0];
  dog.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.userData.isSelectable = true; // Add a custom property to make it selectable
    }
  });
  dog.position.set(5, -0.7, 5);
  dog.onClick = () => {
    console.log("Dog clicked!");
  };
  scene.add(dog);
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

// Event listener for mouse clicks

renderer.domElement.addEventListener("click", onClick);

function onClick(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  for (const intersect of intersects) {
    const object = intersect.object;
    if (object.userData.isSelectable && object.onClick) {
      object.onClick();
      break; // Only handle the first selectable object that was clicked
    }
  }
}

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
  characterPreviousPosition.copy(testingCharacter.position);
  proccessKeyboard();
  checkCollision();
}

let lastUsedKey = null;

function proccessKeyboard() {
  if (keyboard["d"]) {
    testingCharacter.position.x -= 0.25;
    camera.position.x -= 0.25;

    if (testingCharacter.rotation.z > -1.4) {
      testingCharacter.rotation.z -= 0.1;
      console.log(1);
    }
    if (testingCharacter.rotation.z < -1.5) {
      testingCharacter.rotation.z += 0.1;
      console.log(2);
    }
    lastUsedKey = "d";
    console.log(testingCharacter.rotation.z);
  }
  if (keyboard["a"]) {
    testingCharacter.position.x += 0.25;
    camera.position.x += 0.25;
    if (
      testingCharacter.rotation.z < 1.5 &&
      testingCharacter.rotation.z > -1.5
    ) {
      testingCharacter.rotation.z += 0.1;
      console.log(3);
    } else if (
      testingCharacter.rotation.z < -1.5 &&
      testingCharacter.rotation.z >= -3
    ) {
      if (testingCharacter.rotation.z - 0.1 <= -3) {
        testingCharacter.rotation.z = 3;
        console.log(4);
      } else {
        testingCharacter.rotation.z -= 0.1;
        console.log(5);
      }
    } else if (
      testingCharacter.rotation.z > 1.6 &&
      testingCharacter.rotation.z <= 3
    ) {
      testingCharacter.rotation.z -= 0.1;
    }
    lastUsedKey = "a";
    console.log(testingCharacter.rotation.z);
  }
  if (keyboard["w"]) {
    testingCharacter.position.z += 0.25;
    camera.position.z += 0.25;
    if (Math.floor(testingCharacter.rotation) !== 0) {
      if (
        testingCharacter.rotation.z >= -3 &&
        testingCharacter.rotation.z <= 0
      ) {
        if (testingCharacter.rotation.z + 0.1 >= 0) {
          testingCharacter.rotation.z = 0;
        } else {
          testingCharacter.rotation.z += 0.1;
        }
        console.log(6);
      } else if (
        testingCharacter.rotation.z <= 3 &&
        testingCharacter.rotation.z >= 0
      ) {
        if (testingCharacter.rotation.z - 0.1 <= 0) {
          testingCharacter.rotation.z = 0;
        } else {
          testingCharacter.rotation.z -= 0.1;
        }
        console.log(7);
      }
    }
    lastUsedKey = "w";
    console.log(testingCharacter.rotation.z);
  }
  if (keyboard["s"]) {
    testingCharacter.position.z -= 0.25;
    camera.position.z -= 0.25;
    if (testingCharacter.rotation.z > -3 && testingCharacter.rotation.z < 3) {
      console.log("test");
      if (testingCharacter.rotation.z <= 0) {
        if (testingCharacter.rotation.z - 0.1 <= -3) {
          testingCharacter.rotation.z = 3;
        } else {
          testingCharacter.rotation.z -= 0.1;
        }
        console.log(8);
      } else if (testingCharacter.rotation.z >= 0) {
        if (testingCharacter.rotation.z + 0.1 >= 3) {
          testingCharacter.rotation.z = -3;
        } else {
          testingCharacter.rotation.z += 0.1;
        }
        console.log(9);
      }
    }
    lastUsedKey = "s";
    console.log(testingCharacter.rotation.z);
  }

  const objectPosition = new THREE.Vector3();
  testingCharacter.getWorldPosition(objectPosition);
  camera.lookAt(testingCharacter.position);
  controls.target.copy(objectPosition);
  controls.update();
  //   controls.target.copy(testingCharacter.position);
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

function checkCollision() {
  const characterBox = new THREE.Box3().setFromObject(testingCharacter);
  const ballBox = new THREE.Box3().setFromObject(ball);

  if (characterBox.intersectsBox(ballBox)) {
    // There is a collision between the character and the ball
    const ballSpeed = 1;
    const ballMovement = new THREE.Vector3();

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

  for (const building of buildings) {
    const buildingBox = new THREE.Box3().setFromObject(building);
    if (characterBox.intersectsBox(buildingBox)) {
      // There is a collision, revert the character's position to the previous position
      testingCharacter.position.copy(characterPreviousPosition);
    }
    if (ballBox.intersectsBox(buildingBox)) {
      // There is a collision between the ball and a building
      ball.position.copy(ballPreviousPosition);
    }
  }
  for (const tree of trees) {
    const treeBox = new THREE.Box3().setFromObject(tree);
    if (characterBox.intersectsBox(treeBox)) {
      // There is a collision, revert the character's position to the previous position
      testingCharacter.position.copy(characterPreviousPosition);
    }
    if (ballBox.intersectsBox(treeBox)) {
      // There is a collision between the ball and a building
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
