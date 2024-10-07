// audio.js
let audioContext;
let textSound;
let isTextSoundPlaying = false;

let messageSoundBuffer;
let textSoundBuffer;
let newChoiceSoundBuffer;
let threeclickSoundBuffer;
let darklightSoundBuffer;
let soundIsOn = localStorage.getItem('soundIsOn') !== 'false';

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  loadSounds();
}

async function loadSounds() {
    try {
        const messageResponse = await fetch('./assets/message.mp3');
        const textResponse = await fetch('./assets/text.mp3');
        const newChoiceResponse = await fetch('./assets/choices.mp3');
        const threeclick = await fetch('./assets/3dclick.mp3');
        const lightdark = await fetch('./assets/darkmode.mp3');
        
        messageSoundBuffer = await audioContext.decodeAudioData(await messageResponse.arrayBuffer());
        textSoundBuffer = await audioContext.decodeAudioData(await textResponse.arrayBuffer());
        newChoiceSoundBuffer = await audioContext.decodeAudioData(await newChoiceResponse.arrayBuffer());
        darklightSoundBuffer= await audioContext.decodeAudioData(await lightdark.arrayBuffer());
        threeclickSoundBuffer= await audioContext.decodeAudioData(await threeclick.arrayBuffer());

      } catch (error) {
        console.error("Error loading sounds:", error);
      }
}

function playSound(buffer, loop = false) {
    if (!audioContext || !buffer) return;
        
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.connect(audioContext.destination);
    source.start(0);
    return source;
}

function playMessageSound() {
    if (textSound) stopTextSound();
    if (soundIsOn && messageSoundBuffer) {
      playSound(messageSoundBuffer);
    }
}

function playChoiceSound() {
    if (textSound) stopTextSound();
    if (soundIsOn && newChoiceSoundBuffer) {
      playSound(newChoiceSoundBuffer);
    }
}

function playToggleSound() {
    if (textSound) stopTextSound();
    if (soundIsOn && darklightSoundBuffer) {
      playSound(darklightSoundBuffer);
    }
  }

  function playThreeClickSound() {
    if (textSound) stopTextSound();
    if (soundIsOn && threeclickSoundBuffer) {
      playSound(threeclickSoundBuffer);
    }
  }

function playTextSound() {
    if (soundIsOn && textSoundBuffer && !isTextSoundPlaying) {
        isTextSoundPlaying = true;
        textSound = playSound(textSoundBuffer, true);
      }
}

function stopTextSound() {
    if (textSound) {
        textSound.stop();
        textSound.disconnect();
        textSound = null;
      }
      isTextSoundPlaying = false;
}

function toggleSound() {
  soundIsOn = !soundIsOn;
  localStorage.setItem('soundIsOn', soundIsOn);
  if (soundIsOn) {
    initAudio();
  } else {
    cleanupSounds();
  }
  updateSpeakerIcon();
}

function updateSpeakerIcon() {
  const speakerIcon = document.getElementById('speaker-icon');
  speakerIcon.src = soundIsOn ? '../assets/speaker-on.png' : '../assets/speaker-off.png';
  speakerIcon.alt = soundIsOn ? 'Speaker On' : 'Speaker Off';
}

function cleanupSounds() {
  stopTextSound();
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}

export { initAudio, playMessageSound, playChoiceSound,playToggleSound,playThreeClickSound, playTextSound, stopTextSound, toggleSound, updateSpeakerIcon, cleanupSounds };