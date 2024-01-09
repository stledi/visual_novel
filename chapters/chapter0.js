const isLegit = localStorage.getItem('isLegit');
console.log(isLegit);

const story = Story([
  {
    dialogue: {
      content: "oi... eu sei que você tá aí",
    }
  },
  {
    music: {
      src: "../audio/pre_intro.mp3",
      loop: true,
      volume: .8
    },
    dialogue: {
      content: "é a sua primeira vez ouvindo tudo isso?"
    }
  },
  {
    dialogue: {
      content: "como que você não reparou em nada?",
    }
  },
  {
    dialogue: {
      delay: "1000",
      content: "...",
    }
  },
  {
    dialogue: {
      delay: "1000",
      content: "...",
    }
  },  
  {
    dialogue: {
      content: "foi mal| é só que eu não consigo acreditar em tudo isso me desculpa",
    }
  },  
  {
    music: {
      state: "stop",
    },
    dialogue: {
      content: "enfim| vamos repassar as informações então",
    }
  }, 
  {
    music: {
      src: "../audio/intro_song.mp3",
    },
    dialogue: {
      content: "já se passaram algums meses"
    }
  }
]);

const chapter = [story];

// async function start(at) {
//   for (let i = at; i < chapter.length; i++) {
//     currentSection = chapter[i];
//     await chapter[i].execute();
//   }
// }

story.setOnEnd(() => {
  proceedTo(1);
}); 

UI.onSaveButtonPressed = () => {
  save(0, 0, story.getSaveState()); 
}

if (!isLegit || isLegit != '0') {
  document.body.innerHTML = "SAI DAQUI";
} else {
  window.onload = async () => {
    const hasToLoad = localStorage.getItem('hasToLoad');
    if (hasToLoad === '1') {
      const saveState = JSON.parse(localStorage.getItem('saveState'));
      await loadUI(saveState);
      story.load(saveState.state);
    }
    story.execute();
  };
}