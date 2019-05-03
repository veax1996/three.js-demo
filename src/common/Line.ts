import * as THREE from "three";
import { Vector3 } from "three";

export default class Line extends THREE.Line {
    constructor(pointStart: Vector3, pointEnd: Vector3) {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(pointStart);
        geometry.vertices.push(pointEnd);
        const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
        super(geometry, material);
    }
}