let currentCharacter, currentMusic, currentBackground, currentChapter;

function setChapter(chapter) {
  currentChapter = chapter;
}

const characterImage = document.querySelector('.character');
const seta = document.querySelector('.seta');

const choiceBox = document.querySelector('.choices');
const nameBox = document.querySelector('.character-name')

const dialogueBox = document.querySelector('.dialogue');

let isPaused = false;
let currentStep = 0;

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function goTo(label) {
  story.forEach((step, i) => {
    if (step.label != undefined && step.label === label) {
      currentStep = i;
    }
  });
}

function createChoice(choice) {
  const choiceEl = document.createElement('div');
  choiceEl.className = 'choice';
  choiceEl.textContent = choice.message;
  choiceBox.appendChild(choiceEl);
  return choiceEl;
}


function choosing(step) {
  return new Promise(res => {
    step.choices.forEach(choice => {
      const choiceEl = createChoice(choice);
      
      choiceEl.onclick = ev => {
        ev.preventDefault();
        ev.stopPropagation();
        choiceBox.innerHTML = '';
        res(choice.goto);
      }
    });
  });
}

function untilClick() {
  return new Promise(res => {
    window.onclick = res;
  });
}

async function handleChoice(choices) {
  choiceBox.innerHTML = '';
  const chosenLabel = await choosing(choices);
  goTo(chosenLabel);
}

async function executeDialogue(step) {  
  dialogueBox.textContent = '';
  nameBox.textContent = step.name;
  
  if (step.dialogue.delay) {
    await delay(step.dialogue.delay);
  }
  
  
  const dialogueText = typeof step.dialogue === 'object' ? step.dialogue.content : step.dialogue
  
  const voice = new Audio();
  
  let shouldStop; //variável controlando se o loop deve continuar ou parar para esperar o input!
  
  //função que ou joga o texto no elemento e diz se deve ou não parar
  window.onclick = ev => {
    ev.stopPropagation();

    if (!shouldStop) {
      dialogueBox.textContent = dialogueText;
      
      if (step.choices != undefined) {
        shouldStop = true;
      }
    }
  }

  if (step.dialogue.voice != undefined) {
    voice.src = step.dialogue.voice;
    voice.play();
    voice.loop = true;
  }
  
  for (const char of dialogueText) {
    dialogueBox.textContent += char;
    await delay(50);
    voice.play();

    //pause é diferente do stop, pois não é algo do funcionamento interno da função, e sim da ui!
    if (isPaused) {
      voice.pause();
      await unPause();
    }
    
    if (shouldStop || dialogueText === dialogueBox.textContent) {
      if (step.dialogue.voice != undefined) {
        voice.pause();
      }
      

      seta.style.display = "block";
      
      return new Promise(res => {
        if (step.choices != undefined) {
          seta.style.display = "none";
          res()
        }
        
        window.onclick = ev => {
          ev.stopPropagation();
          seta.style.display = "none";
          res();
        }
      });
    }
  }
}

function showBackground(step) {
  currentBackground = step.background;
  document.body.style.backgroundImage = `url(${step.background})`; 
};
function showCharacter(step) {
  currentCharacter = step.character;
  characterImage.src = step.character;
}

const music = new Audio();
function handleMusic(step) {
  music.src = step.music;
  currentMusic = step.music;
  music.play();
  
  if (step.music === "stop") {
    music.pause();
  }
}

function engineSave() {
  localStorage.setItem('loadState', JSON.stringify({
    currentChapter: currentChapter, 
    currentStep, currentStep,
    chapterState: {
      character: currentCharacter,
      music: currentMusic, 
      background: currentBackground,
    }
  }));
}

function load() {
  return new Promise(res => {
    const loadState = JSON.parse(localStorage.getItem('loadState'));
    currentStep = loadState.currentStep;
    story[currentStep].character = loadState.chapterState.character;
    story[currentStep].background = loadState.chapterState.background;
    story[currentStep].music = loadState.chapterState.music;
    res();
  })
}

let onEnd;
function setOnEnd(fun) {
  onEnd = fun;
}

function proceed() {
  localStorage.setItem('isLegit', currentChapter+1);
  localStorage.setItem('hasToLoad', '0');
  window.location.href = `../chapters/chapter${currentChapter+1}.html`;
}

let whenloaded;
async function onloaded(action) {
  whenloaded = action;
}

async function init() {
  if (localStorage.getItem("loadState") != null && localStorage.getItem('hasToLoad') == '1') {
    window.onclick = undefined;
    await load();
  }

  while (currentStep < story.length) {
    const step = story[currentStep];

    if (step.character != undefined) {
      showCharacter(step);
    }
    if (step.background != undefined) {
      showBackground(step);
    }
    
    if (step.music != undefined) {
      handleMusic(step);
    }
    
    if (step.dialogue != undefined) {
      await executeDialogue(step);
    }
    
    if (step.choices != undefined) {
      await handleChoice(step);
    }

    if (step.action != undefined) {
      await step.action();
    }

    if (!step.goto && step.choices == undefined) currentStep++;
    if (step.choices == undefined) goTo(step.goto);
  }
  onEnd();
  
}
