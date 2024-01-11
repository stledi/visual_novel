const characterImage = document.querySelector('.character');
const seta = document.querySelector('.seta');

const choiceBox = document.querySelector('.choices');
const nameBox = document.querySelector('.character-name')

const dialogueBox = document.querySelector('.dialogue');


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
  let currentBackground;

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
    let shouldSkip = false;
    const dialogueText = step.dialogue.content;
    nameBox.textContent = step.name;
    dialogueBox.textContent = '';
    if (step.dialogue.delay) await delay(step.dialogue.delay);
    
    
    const voice = new Audio(step.dialogue.voice);
    
    let dialogueParts = dialogueText.split('|');
    for (let part = 0; part < dialogueParts.length; part++) {
      voice.play();
      bunch += dialogueParts[part];
      window.addEventListener('click', async function eventHandler(ev) { 
        ev.stopPropagation();
        shouldSkip = true;
        this.removeEventListener('click', eventHandler);
      })

      let hasBold = false; 
      let boldStart = 0;
      let boldEnd = 0;
      if (dialogueParts[part].includes('<b>')) {
        boldStart = dialogueParts[part].indexOf('<b>') - 2;
        boldEnd = dialogueParts[part].lastIndexOf('</b>') - 3;
        dialogueParts[part] = dialogueParts[part].replace('<b>', '')
        dialogueParts[part] = dialogueParts[part].replace('</b>', '')
        hasBold = true;
      }

  
      for (let char = 0; char < dialogueParts[part].length; char++) {
        if (UI.isPaused) {
          voice.pause();
          await unPause();
        }
        
        if (shouldSkip) {
          dialogueBox.innerHTML = bunch;
          shouldSkip = false;
          break;
        }
  
        if (hasBold && (part * dialogueParts[part].length) + char > boldStart && (part * dialogueParts[part].length) + char < boldEnd) {
          console.log('eita');
          dialogueBox.innerHTML += `<b>${dialogueParts[part][char]}</b>`;
        } else {
          dialogueBox.innerHTML += dialogueParts[part][char];
        }

        if (step.dialogue.typeDelay) await delay(step.dialogue.typeDelay);
        else await delay(50);
      }
      
      voice.pause();
      if (step.dialogue.content.includes("|") && part < dialogueParts.length-1) {
        await untilClick();        
        dialogueBox.innerHTML = bunch;
        shouldSkip = false;
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
    // document.querySelector('.background').style.backgroundImage = `url(${step.background})`; 
    // document.querySelector('.background').style.display = `block`; 

    handleBackground(step.background)

    if (step.background.includes('show')) {
      document.querySelector('.'+step.background.split(' ')[1]).style.display = 'block';
    }
    if (step.background === 'none') {
      document.querySelector('.background').display = 'none';
    }
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
        background: currentBackground,
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
      story[currentStep].background = state.background;
    },  
    getCurrentStep() {
      return currentStep
    },
    async loadMedia() {
      for (let i = currentStep; i < story.length; i++) {
        console.log(story[i]);
        if (story[i].music != undefined) {
          if (story[i].music.src != undefined) await addMusic(story[i].music.src);
        }
        if (story[i].character != undefined) {
          const image = new Image();
          image.src = story[i].character;
        }
        if (story[i].background != undefined && !story[i].background.includes("show") && !story[i].background.includes("hide")) {
          const image = new Image();
          image.src = story[i].background;
        }
      }
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
