function proceedTo(chapter, legitTag) {
  localStorage.setItem('hasToLoad', '0');
  localStorage.setItem('isLegit', legitTag);
  window.location.href = `${chapter}/index.html`;
}

function loadChapter(chapter, legitTag) {
  localStorage.setItem('hasToLoad', '1');
  localStorage.setItem('isLegit', legitTag);
  window.location.href = `${chapter}/index.html`;
} 

function save(currentChapter, currentPart, partState) {
  console.log(UI.currentBackground)
  localStorage.setItem('saveState', JSON.stringify({
    currentChapter: currentChapter,
    currentPart: currentPart,
    partState: partState,
    background: UI.currentBackground, 
    character: document.querySelector('.character').src, 
    music: Music.currentMusic,
  }));
  console.log(localStorage.getItem('saveState'))
}

function loadUI(saveState) {
  return new Promise(async res => {
    console.log(saveState);
    if (saveState.background != undefined) document.body.style.backgroundImage =  saveState.background;
    if (saveState.character != undefined) document.querySelector('.character').src = saveState.character;
    if (saveState.background != undefined) {
      handleBackground(saveState.background);
    }
    if (saveState.music != "") {
      await addMusic(saveState.music.src);
      playMusic(saveState.music.src, saveState.music.volume, saveState.music.options);
    }
    res();
  })
}