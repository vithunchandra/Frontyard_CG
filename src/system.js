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
const houseUrl = new URL('./assets/House_1.gltf', import.meta.url);
const texture = new THREE.TextureLoader().load(cloth);

//Loading Assets
let testingCharacter = undefined;
new GLTFLoader().load(testingCharacterURL.href, (result) => {
    testingCharacter = result.scene.children[0];
    testingCharacter.castShadow = true;
    testingCharacter.position.set(0, 0.7, 0);
    scene.add(testingCharacter);
});

let house = undefined;
new GLTFLoader().load(houseUrl.href, (result) => {
    house = result.scene.children[0];
    console.log(house);
    house.castShadow = true;
    house.position.set(10, 0, 10);
    scene.add(house);
});

camera.position.set(0, 0, 10);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.backgroundColor = new THREE.Color(255, 255, 255);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 0);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.mapSize.set(512, 512);
scene.add(light);
scene.add(light.target);

const plane = new THREE.PlaneGeometry(10000, 10000, 100, 100);
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