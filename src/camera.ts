import { Vector3 } from "three";
import * as THREE from "three";

export interface CameraAttributes {
    near: number;
    far: number;
    position: Vector3;
    lookAt: Vector3;
    fov: number;
    aspect: number;
    minNear: number;
    maxNear: number;
}

const DEFAULT_PERSPECTIVE_CAMERA_FOV = 60;

const DEFAULT_NEAR = 100;
const DEFAULT_ASPECT = 1;
const MIN_NEAR = 100;
const DEFAULT_FAR = 1000000;

export const DEFAULT_CAMERA_ATTRIBUTES: CameraAttributes = {
    near: DEFAULT_NEAR,
    far: DEFAULT_FAR,
    position: new Vector3(100, 5, 150),
    lookAt: new Vector3(0, 0, 0),
    aspect: DEFAULT_ASPECT,
    minNear: MIN_NEAR,
    maxNear: DEFAULT_NEAR,
    fov: DEFAULT_PERSPECTIVE_CAMERA_FOV
};

export function createPerspectiveCameraMesh(props: CameraAttributes) {
    const camera = new THREE.PerspectiveCamera();

    camera.fov = 60;
    camera.aspect = 1;
    camera.near = 100;
    camera.far = 1000000;

    camera.position.set(100, 5, 150);
    // camera.up.set(0, 0, 1);
    camera.lookAt(props.lookAt);
    // camera.updateProjectionMatrix();

    return camera;
}