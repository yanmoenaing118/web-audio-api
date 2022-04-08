const playButton = document.querySelector("button");
const volumeControl = document.querySelector("#volume");
const audioElement = document.querySelector("audio");
const bar = document.querySelector("#bar");

const audioContext = new AudioContext();

const track = audioContext.createMediaElementSource(audioElement);
const gainNode = audioContext.createGain();
const analyser = audioContext.createAnalyser();

analyser.fftSize = 2048;
const bufferLength = analyser.fftSize;
var dataArray = new Float32Array(bufferLength);

track.connect(gainNode).connect(analyser).connect(audioContext.destination);

/** event listeners */

audioElement.addEventListener("timeupdate", function () {
  analyser.getFloatTimeDomainData(dataArray);

  for (var i = 0; i < bufferLength; i++) {
    const scale = dataArray[i] + 0.5;
    console.log(scale);
    bar.style.transform = `scale(${scale})`;
  }
});

playButton.addEventListener("click", () => {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  if (playButton.dataset.playing === "false") {
    audioElement.play();
    playButton.dataset.playing = "true";
  } else if (playButton.dataset.playing === "true") {
    audioElement.pause();
    playButton.dataset.playing = "false";
  }
});

volumeControl.addEventListener("input", function () {
  gainNode.gain.value = this.value;
});
