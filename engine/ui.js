const pauseDiv = document.querySelector('.pause-div');
const salvar = document.querySelector('.salvar');

const dialogueDiv = document.querySelector('.dialogue-box')


const UI = {
  isPaused: false, onSaveButtonPressed: undefined,
  setOnSaveButtonPressed(fun) {
    this.onSaveButtonPressed = fun;
  },
  currentBackground: '',
}

function handleBackground(background) {
  UI.currentBackground = background;
  if (!background) return;

  if (background.includes('show')) {
    document.querySelector('.'+background.split(' ')[1]).style.display = 'block';

  } else if (background === 'none') {
    document.querySelector('.background').display = 'none';
    UI.currentBackground = '';

  } else if (background.includes('hide')) {
    document.querySelector('.'+background.split(' ')[1]).style.display = 'none';
    UI.currentBackground = '';

  } else {
    document.querySelector('.background').style.backgroundImage = `url(${background})`;
  }
}

window.onkeyup = ev => {
  ev.stopPropagation();

  if (ev.key === 'Escape') {

    if (UI.isPaused) {
      pauseDiv.style.display = 'none';
      UI.isPaused = false;
      onPause();
      return;
    }
    
    pauseDiv.style.display = 'flex';
    UI.isPaused = true;
  }
}

function showDialogueBox() {
  dialogueDiv.style.display = 'block';
}
function hideDialogueBox() {
  dialogueDiv.style.display = 'none';
}

salvar.onclick = () => {
  UI.onSaveButtonPressed();
}
pauseDiv.onclick = ev => {
  ev.stopPropagation();
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

//for awaiting in another function
function unPause() {
  return new Promise(res => {
    setInterval(() => {
      if (!UI.isPaused) res(); 
    });
  });
}