import * as THREE from "three";
import sphereScene from './scene/sphereGeometry';
import shodowScene from './scene/shodow';

//相机
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//渲染器
let renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled = true;
// renderer.shadowMapSoft = true;

//设置画布大小
renderer.setSize(window.innerWidth, window.innerHeight);

//加入到body
document.body.appendChild(renderer.domElement);

//渲染循环
function animate()
{
    requestAnimationFrame(animate);

    renderer.render(shodowScene, camera);
}
animate();