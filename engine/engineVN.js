const characterImage = document.querySelector('.character');
const seta = document.querySelector('.seta');

const choiceBox = document.querySelector('.choices');
const nameBox = document.querySelector('.character-name')

const dialogueBox = document.querySelector('.dialogue');

let music; 

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function createChoice(choice) {
  const choiceEl = document.createElement('div');
  choiceEl.className = 'choice';
  choiceEl.textContent = choice.message;
  choiceBox.appendChild(choiceEl);
  return choiceEl;
}

function untilClick() {
  return new Promise(res => {
    window.addEventListener('click', async function eventHandler(ev) { 
      ev.stopPropagation();
      this.removeEventListener('click', eventHandler);
      res()
    })
  });
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
function Story(story) {
  let currentStep = 0;

  let shouldEnd = false;
  let onend;
  
  
  function choosing(step) {
    return new Promise(res => {
      step.choices.forEach(choice => {
        const choiceEl = createChoice(choice);
        
        choiceEl.onclick = async ev => {
          ev.preventDefault();
          ev.stopPropagation();
          choiceBox.innerHTML = '';
          
          if (choice.goto) {
            goTo(choice.goto);
          } if (choice.action) {
            if (typeof choice.action === 'function') {
              await choice.action({
                music: music,
              });
            }

            if (choice.action === 'end') {
              shouldEnd = true;
            }
          }
          res();
        }
      });
    });
  }
  
  async function handleChoice(choices) {
    choiceBox.innerHTML = '';
    await choosing(choices);
  }
  
  async function executeDialogue(step) {  
    let bunch = '';
    if (step.dialogue.delay) await delay(step.dialogue.delay);
    let shouldSkip = false;
    const dialogueText = step.dialogue.content;
    nameBox.textContent = step.name;
    dialogueBox.textContent = '';
    
    
    const voice = new Audio(step.dialogue.voice);

    for (let section = 0; section < dialogueText.split("|").length; section++) {
      voice.play();
      window.addEventListener('click', async function eventHandler(ev) { 
        ev.stopPropagation();
        shouldSkip = true;
        this.removeEventListener('click', eventHandler);
      })
  
      for (let char = 0; char < dialogueText.split("|")[section].length; char++) {
        if (UI.isPaused) {
          voice.pause();
          await unPause();
        }
        
        if (shouldSkip) {
          bunch += dialogueText.split("|")[section];
          dialogueBox.textContent = bunch;
          shouldSkip = false;
          break;
        }
  
        dialogueBox.textContent += dialogueText.split("|")[section][char];
        await delay(50);
        
      }
      
      voice.pause();
      if (step.dialogue.content.includes("|") && section < dialogueText.split("|").length-1) {
        await untilClick();
      }
    }
    seta.style.display = 'block';
    if (step.choices == undefined) await untilClick();
    seta.style.display = 'none';
  }
  
  function goTo(label) {
    story.forEach((step, i) => {
      if (step.label != undefined && step.label === label) {
        currentStep = i;
      }
    });
  }

  async function handleAction(step) {
    if (step.action === 'end') {
      shouldEnd = true;
    } 
  }

  function showBackground(step) {
    document.body.style.backgroundImage = `url(${step.background})`; 
  };
  function showCharacter(step) {
    currentCharacter = step.character;
    characterImage.src = step.character;
  }
  

  let n = 0;
  async function handleMusic(step) {
    if (step.music.src) {
      playMusic(step.music.src, step.music.volume);
    }
    if (step.music.state === "stop") {
      stopMusic();
    }
  }

  return {
    getSaveState() {
      return {
        currentStep: currentStep,
        music: Music.currentMusic,
      }
    },
    setOnEnd(fun) {
      onend = fun;
    },
    reset() {
      currentStep = 0;
      shouldEnd = false;
    },
    end() {
      shouldEnd = true;
    },
    load(state) {
      currentStep = state.currentStep;
    },  
    
    execute() {
      return new Promise(async res => {
        console.log(currentStep);
        id = setInterval(() => {
          if (shouldEnd) {
            res();
            clearInterval(id);
          }
        });
        
        while (currentStep < story.length) {
          if (shouldEnd) break;
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
            await handleAction(step);
          }
          
          if (!step.goto && step.choices == undefined) currentStep++;
          if (step.choices == undefined) goTo(step.goto);
        }
        if (onend) onend();
        res();
      })
    }
  }
}
