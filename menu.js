const continuar = document.querySelector('.continuar');
const novoJogo = document.querySelector('.novo-jogo')

let saveState = localStorage.getItem('saveState');
if (saveState === null) {
  continuar.style.color = 'gray';
}

localStorage.removeItem('isLegit');

continuar.onclick = ev => {
  if (saveState != null) {
    saveState = JSON.parse(saveState);
    localStorage.setItem('hasToLoad', '1');
    loadChapter(`chapters/${saveState.currentChapter}`, saveState.currentChapter);
  }
}

novoJogo.onclick = ev => {
  localStorage.removeItem('saveState');
  proceedTo('chapters/intro', 'intro');
}