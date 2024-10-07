
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19.2/dist/lil-gui.umd.min.js';


function createSceneController(scene, cubes, directionalLight, ambientLight) {
    const gui = GUI();
    console.log("Created lil-gui");

    const sceneSettings = {
        darkMode: {
            materialColor: 0xfefcff,
            directionalLightColor: 0xa200ff,
            directionalLightIntensity: 0.5,
            ambientLightColor: 0xffffff,
            ambientLightIntensity: 0.3
        },
        lightMode: {
            materialColor: 0xe6e6e6,
            directionalLightColor: 0x808080,
            directionalLightIntensity: 0.8,
            ambientLightColor: 0xffffff,
            ambientLightIntensity: 0.7
        }
    };

    const darkModeFolder = gui.addFolder('Dark Mode');
    const lightModeFolder = gui.addFolder('Light Mode');

    function updateScene() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const currentSettings = isDarkMode ? sceneSettings.darkMode : sceneSettings.lightMode;

        cubes.forEach(cube => {
            cube.material.forEach(material => {
                material.color.setHex(currentSettings.materialColor);
                material.needsUpdate = true;
            });
        });

        directionalLight.color.setHex(currentSettings.directionalLightColor);
        directionalLight.intensity = currentSettings.directionalLightIntensity;

        ambientLight.color.setHex(currentSettings.ambientLightColor);
        ambientLight.intensity = currentSettings.ambientLightIntensity;

        renderer.render(scene, camera);
    }

    // Add GUI controls
    function addControls(folder, settings) {
        folder.addColor(settings, 'materialColor').onChange(updateScene);
        folder.addColor(settings, 'directionalLightColor').onChange(updateScene);
        folder.add(settings, 'directionalLightIntensity', 0, 1).onChange(updateScene);
        folder.addColor(settings, 'ambientLightColor').onChange(updateScene);
        folder.add(settings, 'ambientLightIntensity', 0, 1).onChange(updateScene);
    }

    addControls(darkModeFolder, sceneSettings.darkMode);
    addControls(lightModeFolder, sceneSettings.lightMode);
}

export {createSceneController};