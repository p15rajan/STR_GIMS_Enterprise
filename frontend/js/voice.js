/*********************************************************************
 STR GIMS Enterprise
 Version : 1.0.0
 Module  : Voice Recognition
*********************************************************************/

let recognition = null;

export function initializeVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        console.warn("Speech Recognition not supported.");

        return;
    }

    recognition = new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.onstart = () => {

        console.log("Voice Recognition Started");

    };

    recognition.onend = () => {

        console.log("Voice Recognition Stopped");

    };

    recognition.onerror = (event) => {

        console.error(event.error);

    };

    recognition.onresult = (event) => {

        const text = event.results[0][0].transcript;

        document.getElementById("username").value = text;

    };

}

export function startVoiceLogin() {

    if (recognition) {

        recognition.start();

    }

}