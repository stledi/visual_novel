const Music = {
  currentMusic: '',
  obj: undefined,
  alreadyPlaying: false,
}

function getDuration(src) {
  return new Promise(res => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      console.log(audio.duration)
      res(audio.duration);
    }
    audio.src = src;
  });
}

async function playMusic(src, volume) {
  Music.obj = new SeamlessLoop();
  Music.currentMusic = src;
  Music.obj.addUri(src, ((await getDuration(src)) * 1000) - 100, `music`);

  if (volume != undefined) {
    Music.obj.volume = volume;
  }
  Music.obj.callback(() => {
    Music.obj.start(`music`);
    Music.alreadyPlaying = true;
  });
}

function stopMusic() {
  Music.alreadyPlaying = false;
  Music.obj.stop();
}