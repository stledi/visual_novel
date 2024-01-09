const isLegit = localStorage.getItem('isLegit');

if (!isLegit || isLegit != '1') {
  document.body.innerHTML = "SAI DAQUI";
} else {
  window.onload = start;
}

const story = Story([
  {
    music: {
      src: "../audio/home_song.mp3",
      volume: .8
    },
    background: "../img/bgcasa.png",
    character: "../img/sprites/character001.png",

    name: "sexo da silva junior",
    dialogue: {
      voice: "../audio/voice.mp3",
      content: "oi eu sou sexo da silva junior"
    },
  }, 
  {
    name: "sexo da silva junior",
    dialogue: {
      voice: "../audio/voice.mp3",
      content: "lorem ipsum| dolor sit amet",
      shouldErase: false,
    },
    choices: [
      { message: "sim?", goto: "caso_sim" },
      { message: "não?", goto: "caso_nao" }
    ]
  },
  
  //BRANCH CASO SIM
  {
    label: "caso_sim",
    dialogue: {
      content: "você escolheu sim"
    },
  },
  {
    name: "sexo da silva junior",
    dialogue: {
      voice: "../audio/voice.mp3",
      content: "talvez sim né"
    },
  },
  {
    name: "sexo da silva junior",
    dialogue: {
      voice: "../audio/voice.mp3",
      content: "mas eu sim sei né"
    },
    goto: "continue1"
  },
  
  
  //BRANCH CASO NÃO
  {
    label: "caso_nao",
    dialogue: {
      content:"você escolheu nao",
    }
  },
  {
    name: "sexo da silva junior",
    dialogue: {
      content: "talvez não né",
      voice: "../audio/voice.mp3",
    },
  },
  {
    name: "sexo da silva junior",
    dialogue: {
      content: "mas eu não sei né",
      voice: "../audio/voice.mp3",
    },
    goto: "continue1"
  },
  {
    label: "continue1",
    name: "sexo da silva junior",
    dialogue: { 
      delay: "1000",
      voice: "../audio/voice.mp3", 
      content: "okay",
    }, 
  },
  {
    name: "sexo da silva junior",
    dialogue: { 
      voice: "../audio/voice.mp3", 
      content: "não sei o que fazer",
    }
  }
]);

const preMessage = Story([
  {
    dialogue: {
      content: "eitaporra"
    }
  }
])

const otherStory = Story([
  {
    dialogue: {
      content: "será que vai dar certo?",
      voice: "../audio/voice.mp3", 

    }
  }, 
  {
    dialogue: {
      content: "eu não sei!",
      voice: "../audio/voice.mp3", 

    }
  }, 
  {
    dialogue: {
      content: "talvez",
      voice: "../audio/voice.mp3", 

    }
  }
]);

const pnc1 = PointNClick();

const blocoPretoDialogo = Story([
  {
    dialogue: {
      content: "bloco preto",
      voice: "../audio/voice.mp3", 

    }, 
  },
  {
    dialogue: {
      content: "hehe",
      voice: "../audio/voice.mp3", 

    }
  }
])
const blocoPretoInteraction = pnc1.bind(document.querySelector('.bloco-preto'), blocoPretoDialogo);
blocoPretoInteraction.setOnEnd(() => {
  hideDialogueBox();
})

blocoPretoInteraction.setOnStart(() => {
  showDialogueBox();
});

let ended = false;
const blocoVermelhoDialogo = Story([
  {
    dialogue: {
      content: "bloco vermelho hehe",
      voice: "../audio/voice.mp3", 

    }, 
  },
  {
    dialogue: {
      content: "haha",
      voice: "../audio/voice.mp3", 
    }
  }, 
  {
    dialogue: {
      content: "você realmente quer continuar?"
    },
    choices: [
      {
        message: "sim", action: () => {
          ended = true;
        },
        goto: "continue1"
      }, 
      {
        message: "não", goto: "continue2",
      }
    ],
  },
  {
    label: "continue2",
    dialogue: {
      content: "ok, algumas coisas são melhores deixadas de lado"
    },
    action: "end",
  },
  {
    label: "continue1",
    dialogue: {
      content: "ok, então",
    }
  }
]);

const blocoVermelhoInteraction = pnc1.bind(document.querySelector('.bloco-vermelho'), blocoVermelhoDialogo);
blocoVermelhoInteraction.setOnEnd(() => {
  hideDialogueBox();
  if (ended) {
    console.log('eita');
    pnc1.end();
  }
})

blocoVermelhoInteraction.setOnStart(() => {
  showDialogueBox();
});

pnc1.setOnEnd(() => {
  showDialogueBox();
})

pnc1.setOnStart(async () => {
  document.querySelector('.dialogue-box').style.display = 'none';
  document.querySelector('.bloco-vermelho').style.display = 'block';
  document.querySelector('.bloco-preto').style.display = "block";
})

const chapter = [preMessage, story, pnc1, otherStory];

let currentStep = 0;
async function start(at) {
  for (let i = at; i < chapter.length; i++) {
    currentStep = i;
    currentSection = chapter[i];
    await chapter[i].execute();
  }
}

UI.onSaveButtonPressed = () => {
  console.log(story.getSaveState());
  save(1, currentStep, chapter[currentStep].getSaveState()); 
}

window.onload = async () => {
  if (localStorage.getItem('hasToLoad') === '1') {
    const saveState = JSON.parse(localStorage.getItem('saveState'));
    console.log(saveState.currentChapterStep)
    loadUI(saveState);
    chapter[saveState.currentChapterStep].load(saveState.state);

    start(saveState.currentChapterStep);
  } else {
    start(0)
  }
}