function Chapter(number, parts) {
  let currentPart = 0;
  let onend = undefined;

  UI.onSaveButtonPressed = () => {
    save(number, currentPart, parts[currentPart].getSaveState());
  }

  async function load() {
    const saveState = JSON.parse(localStorage.getItem('saveState'));
    await loadUI(saveState);
    currentPart = saveState.currentPart;
    parts[currentPart].load(saveState.partState);
  }

  function loadingMedia() {
    return new Promise(async res => {
      for (let part = currentPart; part < parts.length; part++) {
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
      if (localStorage.getItem('hasToLoad') === '1') {
        await load();
      }
      await loadingMedia();
      for (currentPart; currentPart < parts.length; currentPart++) {
        await parts[currentPart].execute();
      }
      onend();
    }
  }
}