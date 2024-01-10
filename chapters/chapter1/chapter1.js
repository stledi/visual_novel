const voice = '../../audio/voice.mp3';
const image = '../../img/sprites/character001.png';

const story = Story([
  {
    music: {
      src: "../../audio/house_song.ogg",
      volume: .8
    },
    background: "../../img/bgcasa.png",
    character: image,

    name: "duda",
    dialogue: {
      voice: voice,
      content: "oi eu sou duda"
    },
  }, 
  {
    name: "duda",
    dialogue: {
      voice: voice,
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
    name: "duda",
    dialogue: {
      voice: voice,
      content: "talvez sim né"
    },
  },
  {
    name: "duda",
    dialogue: {
      voice: voice,
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
    name: "duda",
    dialogue: {
      content: "talvez não né",
      voice: voice,
    },
  },
  {
    name: "duda",
    dialogue: {
      content: "mas eu não sei né",
      voice: voice,
    },
    goto: "continue1"
  },
  {
    label: "continue1",
    name: "duda",
    dialogue: { 
      delay: "1000",
      voice: voice, 
      content: "okay",
    }, 
  },
  {
    name: "duda",
    dialogue: { 
      voice: voice, 
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
      voice: voice, 
      
    }
  }, 
  {
    dialogue: {
      content: "eu não sei!",
      voice: voice, 
      
    }
  }, 
  {
    dialogue: {
      content: "talvez",
      voice: voice, 
      
    }
  }
]);

const pnc1 = PointNClick();

const blocoPretoDialogo = Story([
  {
    dialogue: {
      content: "bloco preto",
      voice: voice, 
      
    }, 
  },
  {
    dialogue: {
      content: "hehe",
      voice: voice, 
      
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
      content: "ok"
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

const chapter = Chapter('chapter1', [preMessage, story, pnc1, otherStory]);

const isLegit = localStorage.getItem('isLegit');
if (!isLegit || isLegit != 'chapter1') {
  document.body.innerHTML = "SAI DAQUI";
} else {
  window.onload = chapter.start;
}
