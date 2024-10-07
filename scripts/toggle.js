//toggle.js
import { threeIsOn, threeStarted,updateLighting,sceneController } from './threed.js';
import { playToggleSound}  from './audio.js';

function setMode(isDarkMode) {
    if (isDarkMode) {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    document.getElementById('mode-icon').src = './assets/lightmode.png';
    document.getElementById('mode-icon').alt = 'Light Mode';
    } else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    document.getElementById('mode-icon').src = './assets/darkmode.png';
    document.getElementById('mode-icon').alt = 'Dark Mode';
    }

    playToggleSound();
    if(threeIsOn && threeStarted){updateLighting();}
    if(sceneController && threeStarted && threeIsOn){sceneController.updateScene();}

}

export {setMode}