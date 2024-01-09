const continuar = document.querySelector('.continuar');
const novoJogo = document.querySelector('.novo-jogo')

let saveState = localStorage.getItem('saveState');
if (saveState === null) {
  continuar.style.color = 'gray';
}

continuar.onclick = ev => {
  if (saveState != null) {
    saveState = JSON.parse(saveState);
    localStorage.setItem('isLegit', saveState.currentChapter);
    localStorage.setItem('hasToLoad', '1');
    window.location.href = `./chapters/chapter${saveState.currentChapter}.html`
  }
}

novoJogo.onclick = ev => {
  localStorage.removeItem('saveState');
  localStorage.setItem('isLegit', '0');
  localStorage.setItem('hasToLoad', '0');
  window.location.href = './chapters/chapter0.html'
}