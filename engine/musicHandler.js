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
  if (Music.obj != undefined) {
    console.log('parou');
    Music.obj.stop();
  }

  Music.obj = new SeamlessLoop();
  Music.currentMusic = src;
  Music.obj.addUri(src, ((await getDuration(src)) * 1000), `music`);

  
  Music.obj.callback(() => {
    Music.obj.start(`music`);
    if (volume != undefined) {
      Music.obj.volume(volume); 
    }
    
    Music.alreadyPlaying = true;
  });
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