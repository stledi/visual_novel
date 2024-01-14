const voice = '../../audio/voice.mp3';
const image = '../../img/sprites/character001.png';

const story = Story([
  {
    music: {
      src: "../../audio/house_song.ogg",
      volume: .5
    },
    background: "show scene",
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
    music: {
      //fadeOut: "1000",
      //state: "stop", 
    },
    name: "duda",
    dialogue: { 
      delay: 1000,
      voice: voice, 
      content: "não sei o que fazer",
    }
  },
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

const pnc1 = PointNClick(document.querySelector('.scene'));
pnc1.setOnStart(() => {
  document.querySelector('.dialogue-box').style.display = 'none';
})

const dialogoVentilador = pnc1.bind(document.querySelector('.scene .ventilador'), new Story([
  {
    dialogue: {
      voice: '../../audio/voice.mp3',
      content: 'ventilador kk'
    },
  },
  {
    dialogue: {
      voice: '../../audio/voice.mp3',
      content: 'será que eu deveria ligar?'
    }
  }
]));
dialogoVentilador.onstart = () => {
  document.querySelector('.dialogue-box').style.display = 'block';
}
dialogoVentilador.onend = () => {
  document.querySelector('.dialogue-box').style.display = 'none';
}


const dialogoBalao = pnc1.bind(document.querySelector('.balao'), new Story([
  {
    dialogue: {
      content: 'balao kk'
    }
  }
]));
dialogoBalao.onstart = () => {
  document.querySelector('.dialogue-box').style.display = 'block';
}
dialogoBalao.onend = () => {
  document.querySelector('.dialogue-box').style.display = 'none';
}


const configs = Story([{
  music: {
    src: '../../audio/exploration001.mp3',
    volume: .7,
  },
  character: '../../img/sprites/character001.png',
}]);


const chapter = Chapter('chapter1', [configs, pnc1]);

// const isLegit = localStorage.getItem('isLegit');
// if (!isLegit || isLegit != 'chapter1') {
//   document.body.innerHTML = "SAI DAQUI";
// } else {
  window.onload = chapter.start;
// }
