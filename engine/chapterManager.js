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

  return {
    setOnEnd(fun) {
      onend = fun;
    },
    async start() {
      if (localStorage.getItem('hasToLoad') === '1') {
        await load();
      }
      for (currentPart; currentPart < parts.length; currentPart++) {
        await parts[currentPart].execute();
      }
      onend();
    }
  }
}