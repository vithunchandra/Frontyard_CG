import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader';
import * as cloth from './assets/Cloth.png';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({antialias: true});

const controls = new OrbitControls(camera, renderer.domElement);
const testingCharacterURL = new URL('./assets/characterTesting.gltf', import.meta.url);
const texture = new THREE.TextureLoader().load(cloth);

camera.position.set(0, 0, 10);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.backgroundColor = new THREE.Color(255, 255, 255);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.castShadow = true;
pointLight.position.set(0, 20, 20);
scene.add(pointLight);

let testingCharacter = undefined;
new GLTFLoader().load(testingCharacterURL.href, (result) => {
    testingCharacter = result.scene.children[0];
    testingCharacter.castShadow = true;
    testingCharacter.position.set(0, 0.7, 0);
    scene.add(testingCharacter);
}); 

const plane = new THREE.PlaneGeometry(100, 100, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({map: texture});
const planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.rotation.x = -Math.PI/2;
planeMesh.position.set(0, -1, 0);
planeMesh.receiveShadow = true;
planeMesh.castShadow = true;
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

let clock = new THREE.Clock()

function draw(){
    requestAnimationFrame(draw);
    proccessKeyboard();
    renderer.render(scene, camera);
}

draw();