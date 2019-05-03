import * as THREE from "three";
import { createPerspectiveCameraMesh, DEFAULT_CAMERA_ATTRIBUTES } from "./camera";
import Line from "./common/Line";
import { LoaderUtils } from "three";
import utils from "./common/utils";

const config = {
    isMobile: false,
    background: 0x282828
}

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000);
camera.position.set(330, 330, 330);
camera.lookAt(scene.position);

if (!config.isMobile) {
    // PC端
    var directionalLight = new THREE.DirectionalLight( 0xffffff , 1.1); // 新建一个平行光, 平行光照射到的每个点的强度都一样
    directionalLight.position.set( 300, 1000, 500 );
    directionalLight.target.position.set( 0, 0, 0 );
    directionalLight.castShadow = true; // 开启平行光的投影

    // 下面是设置投影的效果
    var d = 300;
    directionalLight.shadow.camera = new THREE.OrthographicCamera( -d, d, d, -d,  500, 1600 ); // 投影的可视范围
    directionalLight.shadow.bias = 0.0001;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024; // 投影的精度
    scene.add(directionalLight)

    // 再添加一个环境光, 目的是为了调和平行光的投影区域, 防止投影过度黑
    var light = new THREE.AmbientLight( 0xffffff, 0.3 ) 
    scene.add( light )
} else {
    // 非PC端
    // 只添加一个天空光, 天空光从正上方往下照, 可以照出明暗对比, 但是不产生阴影
    var hemisphereLight = new THREE.HemisphereLight( 0xffffff, 1.6)
    scene.add( hemisphereLight)
}

// 种树函数
function addTrees () {
    // 树的坐标
    var treesPosition = [
      [-110, -110], [-90, -110],[-70, -110],[-50, -110],[-30, -110],[ -10, -110],[10, -110],[30, -110],[50, -110],[70, -110],[90, -110],
      [-110,  110], [-110, 90],[-110, 70],[-110, 50],[-110, 30],[ -110, 10],[-110, -10],[-110, -30],[-110, -50],[-110, -70],[-110, -90],
      [ 110,  110], [90, 110], [70, 110], [50, 110], [30, 110],[-30, 110], [-50, 110], [-70, 110], [-90, 110],
      [ 110, -110], [ 110, -90], [ 110, -70], [ 110, -50], [ 110, -30], [ 110, -10], [ 110, 10], [ 110, 30], [ 110, 50], [ 110, 70],  [ 110, 90],
    ]
    treesPosition.forEach(function (elem) {
        const x = elem[0];
        const y = 1;
        const z = elem[1];
        const tree = createTree(x, y, z);
        scene.add(tree);
    })
  }
  
  // 单体树
  function createTree (x: number = 0, y: number = 0, z: number = 0) {
    var tree = new THREE.Object3D()  // 新建一个空对象用来放 树干 和 树叶 部分
   
    var treeTrunkGeometry = new THREE.BoxGeometry(2,16,2) // 树干
    var treeTrunk = utils.makeMesh('lambert', treeTrunkGeometry, 0x8a613a)
    treeTrunk.position.y = 8 // 树干 y 轴位置
    tree.add(treeTrunk) // 树干添加到空对象中
  
    var treeLeafsGeometry = new THREE.BoxGeometry(8, 8, 8) // 树叶
    var treeLeafs = utils.makeMesh('lambert', treeLeafsGeometry, 0x9c9e5d)
    treeLeafs.position.y = 13 // 树叶 y 轴的位置
    tree.add( treeLeafs) // 树叶添加到空对象中
  
    tree.position.set(x, y, z)
  
    return tree // 返回 树 = 树干 + 树叶 对象
  }

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(config.background);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);  // renderer.domElement 是渲染器用来显示结果的 canvas 标签
function loop () {
  renderer.render(scene, camera); // 渲染器开始渲染, scene 和 camera 是必须参数, 因为场景里有动画, 所以放在 loop 里循环
  requestAnimationFrame(loop);
}

addTrees();
loop();