import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader';
import * as cloth from './assets/Cloth.png';

// System Inizialization
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({antialias: true});


//Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);

//Import Assets
const testingCharacterURL = new URL('./assets/characterTesting.gltf', import.meta.url);
const houseUrl = {
    url: new URL('./assets/House_1.gltf', import.meta.url),
    position: {
        x: 20,
        y: -0.7,
        z: 3
    }
};
const towerUrl = {
    url: new URL('./assets/Tower.gltf', import.meta.url),
    position: {
        x: -20,
        y: -0.7,
        z: 5
    }
};
const buildingUrl = [houseUrl, towerUrl];
const texture = new THREE.TextureLoader().load(cloth);

//Loading Assets
let testingCharacter = undefined;
new GLTFLoader().load(testingCharacterURL.href, (result) => {
    testingCharacter = result.scene.children[0];
    testingCharacter.traverse((node) => {
        if(node.isMesh){
            node.castShadow = true;
        }
    });
    testingCharacter.position.set(0, 0.7, 0);
    scene.add(testingCharacter);
});

let buildings = [];

for(const building of buildingUrl){
    new GLTFLoader().load(building.url.href, (result) => {
        const object = result.scene.children[0];
        object.traverse((node) => {
            if(node.isMesh){
                node.castShadow = true;
            }
        });
        const position = building.position;
        object.position.set(position.x, position.y, position.z);
        scene.add(object);
        buildings.push(object);
    });
}


camera.position.set(0, 0, 10);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; //THREE.BasicShadowMap | THREE.PCFShadowMap |  THREE.VSMShadowMap | THREE.PCFSoftShadowMap

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.backgroundColor = new THREE.Color(255, 255, 255);

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

scene.add( new THREE.CameraHelper( light.shadow.camera ) );

const lightHelper = new THREE.DirectionalLightHelper(light, 10, 0xff00ff);
scene.add(lightHelper);

const plane = new THREE.PlaneGeometry(1000, 1000, 100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({color: 0x00ffff});
const planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.rotation.x = -Math.PI/2;
planeMesh.position.set(0, -1, 0);
planeMesh.receiveShadow = true;
scene.add(planeMesh);

let keyboard = [];

document.body.addEventListener('keydown', (evt) => {
    keyboard[evt.key] = true;
});

document.body.addEventListener('keyup', (evt) => {
    keyboard[evt.key] = false;
});

function proccessKeyboard(){
    if(keyboard['a']){
        testingCharacter.position.x -= 0.05;
    }if(keyboard['d']){
        testingCharacter.position.x += 0.05;
    }if(keyboard['w']){
        testingCharacter.position.z += 0.05;
    }if(keyboard['s']){
        testingCharacter.position.z -= 0.05;
    }
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateMatrix();
});

//utils
function randomNumber(){
    return Math.floor(Math.random() * 50) + 1;
}

let clock = new THREE.Clock()

function draw(){
    requestAnimationFrame(draw);
    proccessKeyboard();
    renderer.render(scene, camera);
}

draw();