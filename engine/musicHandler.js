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

Music.obj = new SeamlessLoop();
async function addMusic(src) {
  Music.obj.addUri(src, ((await getDuration(src)) * 1000), src);
}

async function playMusic(src, volume) {
  if (Music.alreadyPlaying) Music.obj.stop();
  Music.currentMusic = src;
  Music.obj.start(src);
  Music.obj.volume(volume);
  Music.alreadyPlaying = true;
}

function stopMusic() {
  Music.alreadyPlaying = false;
  Music.obj.stop();
}


// let music = undefined;
// function playMusic(src, volume) {
//   if (music != undefined) music.pause();
//   music = new Audio(src);
//   music.play();
//   music.loop = true;
// }

// function stopMusic() {
//   music.pause();
// }