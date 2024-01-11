function Chapter(number, parts) {
  let currentPart = 0;
  let onend = undefined;

  UI.onSaveButtonPressed = () => {
    save(number, currentPart, parts[currentPart].getSaveState());
  }

  async function load() {
    const saveState = JSON.parse(localStorage.getItem('saveState'));
    currentPart = saveState.currentPart;
    parts[currentPart].load(saveState.partState);
  }

  function loadingMedia() {
    return new Promise(async res => {
      for (let part = currentPart; part < parts.length; part++) {
        console.log(parts[currentPart]);
        await parts[part].loadMedia();
      }
      Music.obj.callback(res);
    })
  }

  return {
    setOnEnd(fun) {
      onend = fun;
    },
    async start() {
      const loading = new Loading();
      loading.show();
      if (localStorage.getItem('hasToLoad') === '1') {
        await load();
      }
      await loadingMedia();

      await delay(2000);
      loading.complete();

      await untilClick();
      
      if (localStorage.getItem('hasToLoad') === '1') {
        const saveState = JSON.parse(localStorage.getItem('saveState'))
        await loadUI(saveState);
      }
      loading.hide();

      for (currentPart; currentPart < parts.length; currentPart++) {
        await parts[currentPart].execute();
      }
      onend();
    }
  }
}
