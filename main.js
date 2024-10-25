import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer({ antialias: true }); // 렌더러 인스턴스를 생성한다.
renderer.shadowMap.enabled = true;
// antialias는 박스 가장자리가 스무스하게 표현될 수 있도록 해준다.
renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러의 사이즈를 설정한다.
document.body.appendChild(renderer.domElement); // 웹사이트 DOM에 추가한다.

const scene = new THREE.Scene(); // 새로운 장면 인스턴스를 생성한다.
const camera = new THREE.PerspectiveCamera( // 새로운 카메라 인스턴스를 생성한다.
  60, // fov 시야각
  window.innerWidth / window.innerHeight, // full screen
  0.1, // near 값
  100 // far 값
);

camera.position.y = 1; // XYZ 축에서 Y는 사용자가 바라보는 위치가 위쪽에서 아래를 바라본다는 의미다.
camera.position.z = 5; // XYZ 축에서 Z는 사용자가 바라보는 쪽으로 나온다는 의미다.

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // 빛의 색상과 세기
directionalLight.castShadow = true; // 빛이 그림자를 드리울수 있게 해주는 속성
directionalLight.position.set(3, 4, 5); // 빛의 포지션
directionalLight.lookAt(0, 0, 0); // 빛이 바라보는 곳 - 기본값 (0, 0, 0)
scene.add(directionalLight); // 장면에 빛 속성 추가

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const flooorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new THREE.Mesh(floorGeometry, flooorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const geometry = new THREE.BoxGeometry(1, 1, 1); // 사물의 크기 지정
const material = new THREE.MeshStandardMaterial({ color: 0x897800 }); // 사물의 색상 지정
const mesh = new THREE.Mesh(geometry, material); // 사물을 정의
mesh.castShadow = true;
mesh.receiveShadow = true;
mesh.position.y = 0.5;
scene.add(mesh); // 장면에 사물을 추가

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsuleMesh.position.set(3, 1.75, 0);
capsuleMesh.castShadow = true;
capsuleMesh.receiveShadow = true;
scene.add(capsuleMesh);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
torusMesh.position.set(0, 0.5, 1);
torusMesh.castShadow = true;
torusMesh.receiveShadow = true;
scene.add(torusMesh);

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(-3, 1, 0);
cylinderMesh.castShadow = true;
cylinderMesh.receiveShadow = true;
scene.add(cylinderMesh);

const starShape = new THREE.Shape();
starShape.moveTo(0, 1);
starShape.lineTo(0.2, 0.2);
starShape.lineTo(1, 0.2);
starShape.lineTo(0.3, -0.2);
starShape.lineTo(0.6, -1);
starShape.lineTo(0, -0.5);
starShape.lineTo(-0.6, -1);
starShape.lineTo(-0.3, -0.2);
starShape.lineTo(-1, 0.2);
starShape.lineTo(-0.2, 0.2);
const shapeGeometry = new THREE.ShapeGeometry(starShape);
const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
shapeMesh.position.set(0, 1, 2);
scene.add(shapeMesh);

const extrudeSettings = {
  steps: 1,
  depth: 0.1,
  bevelEnabled: true,
  bevelThickness: 0.3,
  bevelSize: 0.5,
  bevelSegments: 100,
};

const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x0ddaaf });
const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrudeMesh.position.set(2, 1.5, 3);
extrudeMesh.castShadow = true;
extrudeMesh.receiveShadow = true;
scene.add(extrudeMesh);
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x98daaf });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 1, -3);
scene.add(sphere);

const numPoints = 1000;
const positions = new Float32Array(numPoints * 3);

// Window resize 할때 Render되는 scene의 영역을 유동적으로 하기위해 resize 이벤트를 받아 업데이트 해준다.
window.addEventListener('resize', () => {
  // 브라우저의 resize 이벤트가 일어나면, 함수 안의 내용이 실행된다.
  renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러의 사이즈를 설정
  camera.aspect = window.innerWidth / window.innerHeight; // 카메라의 비율 설정
  camera.updateProjectionMatrix();
  renderer.render(scene, camera); // 렌더러로 장면과 카메라 설정에 따라 렌더링한다.
});

const render = () => {
  renderer.render(scene, camera); // 렌더러로 장면과 카메라 설정에 따라 렌더링한다.
  requestAnimationFrame(render);
};

render();
