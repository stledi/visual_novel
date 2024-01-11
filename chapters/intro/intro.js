const sadVoice = '../../audio/sad_voice.mp3';

const story = Story([
  {
    character: '../../img/sprites/olho_fechado.gif',
    dialogue: {
      delay: '400',
      content: "oi...| eu sei que você tá aí",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      delay: '100',
      content: "ei| para com isso|, por favor",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      content: "...| é sério!",
      voice: sadVoice,
    }
  },
  {
    music: {
      src: "../../audio/pre_intro.ogg",
      loop: true,
      volume: .8
    },
    dialogue: {
      content: "se fingir de morto não vai adiantar dessa vez",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      delay: '200',
      content: "como nas outras",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      delay: "1000",
      content: "...",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      delay: "1000",
      content: "...",
      voice: sadVoice,
    }
  },  
  {
    dialogue: {
      delay: "1000",
      content: "é sério",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      content: "por quê você não me escuta?",
      voice: sadVoice,
    }
  },    
  {
    dialogue: {
      delay: "1000",
      content: "ok",
      voice: sadVoice,
    }
  },  
  {
    music: {
      src: "../../audio/pre_intro_angry.ogg",
      volume: .8,
    },
    dialogue: {
      content: "foi mal| é só que eu não consigo acreditar em tudo isso. me desculpa",
      voice: sadVoice,
    }
  },  
  {
    dialogue: {
      content: "me desculpa",
      voice: sadVoice,
    }
  },  
  {
    dialogue: {
      content: "eu sei que as coisas não vêm sendo muito boas recentemente",
      voice: sadVoice,
    }
  }, 
  {
    dialogue: {
      content: "é...| eu realmente não sei nem por onde começar",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      delay: "100",
      content: "hehe",
      voice: sadVoice,
    }
  },
  {
    music: {
      src: "../../audio/pre_intro_angry1.ogg",
    },
    dialogue: {
      content: "depois <b>daquilo</b>| eu me senti diferente",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      content: "como se realmente eu <b>não existisse</b>",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      content: "mas|, olha aqui",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      content: "você...",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      delay: "500",
      content: "esquece",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      content: "eu só não sei o que fazer",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      delay: "100",
      content: "...",
    }
  },
  {
    delay: "100",
    dialogue: {
      content: "...",
    }
  },
  {
    delay: "100",
    dialogue: {
      content: "o quê tá acontecendo?",
    }
  },
  {
    delay: "100",
    dialogue: {
      content: "...",
    }
  },
  {
    music: {
      src: "../../audio/pre_intro_angry2.ogg",
      volume: .8
    },
    dialogue: {
      content: "...",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      delay: "100",
      content: "...",
      voice: sadVoice,
    }
  },
  {
    background: 'show tentaculo',
    dialogue: {
      delay: "100",
      content: "tá acontecendo de novo, né?",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      delay: "100",
      content: "tá acontecendo de novo",
      voice: "../../audio/angry_voice1.mp3"
    }
  },
  {
    dialogue: {
      delay: "100",
      typeDelay: "65",
      content: "eu não aguento mais",
      voice: "../../audio/angry_voice1.mp3",
    }
  },
  {
    dialogue: {
      delay: "100",
      content: "...",
    }
  },
  {
    music: {
      src: '../../audio/pre_intro_angry3.ogg',
      volume: .8
    },
    dialogue: {
      delay: "100",
      content: "eu sei, eu sei... que toda a minha vida eu não vivi por mim mesma",
      voice: "../../audio/angry_voice1.mp3"
    }
  },
  {
    dialogue: {
      delay: "100",
      content: "mas é que agora todo mundo foi embora",
      voice: sadVoice,
    }
  },
  {
    dialogue: {
      content: "socorro",
      voice: "../../audio/angry_voice1.mp3"
    }
  },
  {
    dialogue: {
      delay: '2000',
      content: "socorro",
      voice: "../../audio/angry_voice.mp3"
    }
  },
  {
    delay: "1000",  
    dialogue: {
      content: "alguém me ajuda",
      voice: "../../audio/angry_voice1.mp3"
    }
  },
  {   
    dialogue: {
      delay: '5000',
      content: "POR QUE NINGUÉM ME AJUDA?                                    ",
      voice: "../../audio/screaming_voice.mp3"
    }
  },
  {
    music: {
      state: "stop",
    },
    character: "../../img/sprites/olho.gif",
    dialogue: {
      content: "VOCÊ NÃO VAI ACORDAR?",
      voice: "../../audio/angry_voice.mp3"
    }
  }, 
  {
    background: "hide tentaculo",
    music: {
      src: "../../audio/intro_song.ogg",
    },
    dialogue: {
      content: "hehe| eu sabia que você ainda tava vivo",
      voice: sadVoice,
    }
  },
  {   
    dialogue: {
      content: "nunca mais me assuta assim!",
      voice: sadVoice,
    }
  },
  {   
    dialogue: {
      content: "você quase me mata de preocupação",
      voice: sadVoice,
    }
  },
]);

const chapter = Chapter('intro', [story]);

const isLegit = localStorage.getItem('isLegit');

if (!isLegit || isLegit != 'intro') {
  console.log(isLegit)
  document.body.innerHTML = "SAI DAQUI";
} else {
  window.onload = chapter.start;
}

chapter.setOnEnd(ev => {
  proceedTo('../chapter1', 'chapter1')
});
