// tts.js
let tts;

function initTTS() {
  try {
    if (typeof SpeechSynthesizer === 'function') {
      tts = new SpeechSynthesizer();
      console.log("SpeechSynthesizer initialized successfully");
    } else {
      throw new Error("SpeechSynthesizer is not a constructor");
    }
  } catch (error) {
    console.log("Failed to initialize SpeechSynthesizer:", error.message);
  }
  return tts;
}

function readMessage(text, languageSet, soundIsOn) {
  if (tts) {
    tts.stopSpeech();
    if (languageSet && soundIsOn) {
      tts.setLanguage(languageSet);
      tts.speak(text);
    }
  }
}

export { initTTS, readMessage };