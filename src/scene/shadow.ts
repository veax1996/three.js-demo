import * as THREE from "three";

//创建场景
let scene = new THREE.Scene();

var plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8, 16, 16),
        new THREE.MeshLambertMaterial({color: 0xcccccc}));
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshLambertMaterial({color: 0x00ff00}));
cube.position.x = 2;
cube.castShadow = true;
scene.add(cube);

var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
light.position.set(2, 5, 3);
light.target = cube;
light.castShadow = true;

light.shadow.camera.near = 2;
light.shadow.camera.far = 10;
light.shadow.camera.fov = 30;

light.shadowMapWidth = 1024;
light.shadowMapHeight = 1024;
light.intensity = 0.5;

scene.add(light);

export default scene;