function proceedTo(chapter) {
  localStorage.setItem('hasToLoad', '0');
  localStorage.setItem('isLegit', chapter);
  window.location.href = `../chapters/chapter${chapter}.html`;
}

function save(currentChapter, currentChapterStep, sectionState) {
  localStorage.setItem('saveState', JSON.stringify({
    currentChapter: currentChapter,
    currentChapterStep: currentChapterStep,
    state: sectionState,
    background: document.body.style.backgroundImage, 
    character: document.querySelector('.character').src, 
    music: sectionState.music,
  }));
  console.log(localStorage.getItem('saveState'))
}

function loadUI(saveState) {
  return new Promise(res => {
    console.log(saveState);
    if (saveState.background != undefined) document.body.style.backgroundImage =  saveState.background;
    if (saveState.character != undefined) document.querySelector('.character').src = saveState.character;

    window.addEventListener('click', async function eventHandler(ev) { 
      playMusic(saveState.music);
      res();
      this.removeEventListener('click', eventHandler);
    })
  });
}