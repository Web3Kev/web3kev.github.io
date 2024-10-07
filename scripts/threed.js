// threed.js
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { playThreeClickSound}  from './audio.js';
// import {createSceneController} from './debug.js';

let scene, camera, renderer, cubes = [];
const numCubes = 30;
let ambientLight, directionalLight;
let raycaster, mouse;
let floatingSpeed = 0.02;
let animationFrameId;
let sceneController;
let highlightedCube = null;

let threeIsOn = false;
let threeStarted = false;
let radius = 0.5;

const pictureData = {
    './assets/unity.png': 'https://unity.com/',
    './assets/react.png': 'https://react.dev',
    './assets/flutter.png': 'https://flutter.dev',
};

function isDebugMode() {

    // const urlParams = new URLSearchParams(window.location.search);
    // return urlParams.get('debug') === 'true';
    return false;
}


function initThreeJS() {
    threeIsOn=true;
    threeStarted=true;
    scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 10;
    camera = new THREE.OrthographicCamera(frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / -2, 0.1, 1000);
    camera.position.z = 10;
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-js-container').appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Create cubes
    const textureLoader = new THREE.TextureLoader();
    const pictureUrls = Object.keys(pictureData);
    for (let i = 0; i < numCubes; i++) {
        const pictureUrl = pictureUrls[i % pictureUrls.length];
        const texture = textureLoader.load(pictureUrl);
        const size = Math.random() * 0.5 + 0.25; // Smaller size for cubes
        const geometry = new THREE.BoxGeometry(size, size, size);
        
        const materials = [];
        for (let j = 0; j < 6; j++) {
            materials.push(new THREE.MeshStandardMaterial({
                color: 0xc2bfbc, 
                map: texture,
                emissive: 0xffffff,
                emissiveIntensity: 1,
            }));
        }
        
        const cube = new THREE.Mesh(geometry, materials);
        cube.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        cube.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * floatingSpeed,
            (Math.random() - 0.5) * floatingSpeed,
            (Math.random() - 0.5) * floatingSpeed
        );
        cube.userData.url = pictureData[pictureUrl];
        scene.add(cube);
        cubes.push(cube);
    }

    // Add lights
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    updateLighting();
    
    renderer.domElement.addEventListener('click', onCanvasClick);
    renderer.domElement.addEventListener('touchend', onCanvasTouchEnd);

    //// debug only
    // if(isDebugMode)
    // {
    //     sceneController= createSceneController(scene, cubes, directionalLight, ambientLight);
    // }
   
    onWindowResize();
    animate();
}

function animate() {
    if(threeIsOn)
    {
        animationFrameId= requestAnimationFrame(animate);
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 10;
        const halfWidth = (frustumSize * aspect) / 2;
        const halfHeight = frustumSize / 2;

        cubes.forEach(cube => {
            cube.position.add(cube.velocity);
            if (Math.abs(cube.position.x) > halfWidth) {
                cube.velocity.x *= -1;
                cube.position.x = Math.sign(cube.position.x) * halfWidth;
            }
            if (Math.abs(cube.position.y) > halfHeight) {
                cube.velocity.y *= -1;
                cube.position.y = Math.sign(cube.position.y) * halfHeight;
            }
            if (Math.abs(cube.position.z) > 5) cube.velocity.z *= -1;
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        });

        // Ensure the highlight is always visible
        if (highlightedCube) {
            const highlight = highlightedCube.getObjectByName('highlight');
            if (highlight) {
                highlight.rotation.copy(highlightedCube.rotation);
            }
        }

        renderer.render(scene, camera);
    }
}

function updateLighting() {
    if (!ambientLight || !directionalLight) return;
    const isDarkMode = document.body.classList.contains('dark-mode');


    if (isDarkMode) {

        directionalLight.color.setHex(0xe32400);//orange light
        directionalLight.intensity = 0.546;

        ambientLight.color.setHex(0x61177c);//purple light
        ambientLight.intensity = 0.701;

        cubes.forEach(cube => {
            cube.material.forEach(material => {
                material.emissive.setHex(0x000000); // Slight emissive glow in dark mode0 x222222
                material.color.setHex(0xffffff); //white color 
                // material.emissiveIntensity=1;
            });
        });
    } else {
        directionalLight.color.setHex(0xffffff);//white light
        directionalLight.intensity = 0.179;

        ambientLight.color.setHex(0xffffff);//white light
        ambientLight.intensity = 0.715;

        cubes.forEach(cube => {
            cube.material.forEach(material => {
                material.emissive.setHex(0x000000); // No emissive glow in light mode
                material.color.setHex(0xffffff);
            });
        });
    }
}

function checkIntersection() {
            
    // createWireFrame();
    createParticles();
}

function createWireFrame()
{
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    // Remove highlight from the previously highlighted cube
    if (highlightedCube) {
        highlightedCube.remove(highlightedCube.getObjectByName('highlight'));
        highlightedCube = null;
    }

    if (intersects.length > 0) {
        const intersectedCube = intersects[0].object;
        const url = intersectedCube.userData.url;
        
        // Add highlight to the intersected cube
        const wireframeGeometry = new THREE.WireframeGeometry(intersectedCube.geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xe32400 });
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        wireframe.name = 'highlight';
        intersectedCube.add(wireframe);
        
        highlightedCube = intersectedCube;

        if (url) {
            openModal(url, 500);
        }
    }
}


function createParticles()
{
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    // Remove highlight from the previously highlighted cube
    if (highlightedCube) {
        // Remove the particles from the previously highlighted cube
        highlightedCube.remove(highlightedCube.getObjectByName('highlightParticles'));
        highlightedCube = null;
    }

    if (intersects.length > 0) {

        const intersectedCube = intersects[0].object;
        const url = intersectedCube.userData.url;

        // Create particle material
        const particleMaterial = new THREE.PointsMaterial({
            color: 0xf58a42 , // yellow color
            size: 5,      // Size of particles
            transparent: true,
            opacity: 0.5,
        });

        // Create particle geometry
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 10;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() * 2 - 1)*radius; // Random positions around the cube
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Create particles and add to the cube
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particles.name = 'highlightParticles';  // Assign a name to reference later
        intersectedCube.add(particles);

        // Set the intersected cube as the highlighted cube
        highlightedCube = intersectedCube;

        playThreeClickSound();

        if (url) {
            openModal(url, 500);
        }
    }
}

// Function to adjust floating speed
function setFloatingSpeed(speed) {
    floatingSpeed = speed;
    cubes.forEach(cube => {
        cube.velocity.set(
            (Math.random() - 0.5) * floatingSpeed,
            (Math.random() - 0.5) * floatingSpeed,
            (Math.random() - 0.5) * floatingSpeed
        );
    });
}

function openModal(urlToOpen, timer) {
    // Implement your modal opening logic here
    console.log("Opening modal with URL:", urlToOpen);

    setTimeout(() => {
        document.getElementById("project-iframe").src = urlToOpen;
        document.getElementById("modal").style.display = 'block';
    }, timer?timer:0); 

}

function onCanvasClick(event) {
    event.preventDefault();
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    checkIntersection();
}

function onCanvasTouchEnd(event) {
    event.preventDefault();
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.changedTouches[0].clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.changedTouches[0].clientY - rect.top) / rect.height) * 2 + 1;
    checkIntersection();
}

function checkThreeEligibility() {
  if (window.innerWidth >= 768) {
    if (!threeStarted) {
      initThreeJS();
    } else if (!threeIsOn) {
      threeIsOn = true;
      animate();
    } else {
      onWindowResize();
    }
  } else {
    stopAnimation();
  }
}

function stopAnimation() {
  threeIsOn = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function cleanupThreeJS() {
    if (scene) {
        // Remove all objects from the scene
        while (scene.children.length > 0) {
        const object = scene.children[0];
        scene.remove(object);
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
            if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
            } else {
            object.material.dispose();
            }
        }
        }
        
        // Dispose of the renderer
        if (renderer) {
        renderer.dispose();
        renderer = null;
        }

        // Clear the scene and camera
        scene = null;
        camera = null;
    }
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 10;
    camera.left = frustumSize * aspect / -2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", checkThreeEligibility);

export { initThreeJS, checkThreeEligibility, cleanupThreeJS, threeIsOn, threeStarted,updateLighting,sceneController};