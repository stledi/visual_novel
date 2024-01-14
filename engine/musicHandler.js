const Music = {
  currentMusic: '',
  obj: undefined,
  alreadyPlaying: false,
  srcs: [],
  fadeIn() {

  }
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
  if (!Music.srcs.includes(src)) Music.srcs.push(src);
}

function fadeIn(volume, options) {
  let volumeNow = 0;
  const inc = volume / options.fade;
  Music.obj.volume(0);

  let counter = 0;
  let id = setInterval(() => {
    volumeNow+=inc;
    Music.obj.volume(volumeNow);
    counter++;
    if (counter > options.fade) {
      clearInterval(id);
    }
  }, 1);
}

// function fadeOut(options) {
//   let volumeNow = Music.currentMusic.volume;
//   const dec = volumeNow / options.fadeOut;
  
//   let id = setInterval(() => {
//     volumeNow-=dec;
//     Music.obj.volume(volumeNow);
//     if (volumeNow <= 0.0001) {
//       Music.obj.stop();
//       clearInterval(id);
//     }
//   }, 1);
// }

async function playMusic(src, volume, options) {
  if (Music.alreadyPlaying) Music.obj.stop();
  Music.currentMusic = {
    src: src, 
    options: options,
    volume: volume,
  }
  Music.obj.start(src);
  if (options.fadeIn) {
    fadeIn(volume, options);
  }
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