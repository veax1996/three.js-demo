import * as THREE from "three";

// 创建球体
let geometry = new THREE.SphereGeometry(1, 18, 18);
let material = new THREE.MeshNormalMaterial({ wireframe: true });
let mesh = new THREE.Mesh(geometry, material);

//创建场景
let scene = new THREE.Scene();

scene.add(mesh);

export default scene;