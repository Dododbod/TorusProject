import * as THREE from 'three'
import "./style.css"
import gsap from "gsap"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//Scene
const scene = new THREE.Scene()

//Sphere
const geometry = new THREE.TorusKnotGeometry(10,3,100,16)
const material = new THREE.MeshStandardMaterial({
  color: '#e972f2',
  roughness: 0.5
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Lighting
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 30, 20)
light.intensity = 1.25
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 45
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGL1Renderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(1)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 3

//Resize
window.addEventListener('resize', () => {
  //Update Sizes
  sizes.width = window.innerWidth
  sizes.height =window.innerHeight
  //Update Camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width /sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  //We can insert animations into this loop
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline Magic
const t1 = gsap.timeline({defaults: {duration: 5}})
t1.fromTo(mesh.scale, {z:-10, x:-10, y:-10}, {z:1, x:1, y:1})
t1.fromTo('nav', {y: '-150%'}, {y:"0%"})
const t2 = gsap.timeline({defaults: {duration: 4}})
t2.fromTo('h1', {y: '-400'}, {y:"0%"})
t2.fromTo('h1', {opacity: 0}, {opacity: 1})

