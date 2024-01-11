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
  localStorage.setItem('saveState', JSON.stringify({
    currentChapter: currentChapter,
    currentPart: currentPart,
    partState: partState,
    background: UI.currentBackground, 
    character: document.querySelector('.character').src, 
    music: partState.music,
  }));
  console.log(localStorage.getItem('saveState'))
}

function loadUI(saveState) {
  return new Promise(res => {
    console.log(saveState);
    if (saveState.background != undefined) document.body.style.backgroundImage =  saveState.background;
    if (saveState.character != undefined) document.querySelector('.character').src = saveState.character;
    if (saveState.background != undefined) handleBackground(saveState.background);
    if (saveState.music != "") {
      window.addEventListener('click', async function eventHandler(ev) { 
        playMusic(saveState.music);
        this.removeEventListener('click', eventHandler);
        res();
      })
    } else {
      res();
    }
  })
}