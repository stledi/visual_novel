function PointNClick() {
  let alreadyInInteraction = false;
  let shouldEnd = false;
  let onEnd = undefined;
  let onStart = undefined;
  const objects = [];

  return {
    bind(object, event) {
      objects.push(object);
      let onend, onstart;
      object.onclick = async ev => {
        ev.preventDefault();
        ev.stopPropagation();
        if (!alreadyInInteraction) { 
          alreadyInInteraction = true;
          onstart();
          await event.execute();
          event.reset();
          alreadyInInteraction = false;
          onend();
        }
      };
      return {
        setOnEnd(Ionend) {
          onend = Ionend;
        }, 
        setOnStart(Ionstart) {
          onstart = Ionstart;
        }
      }
    },
    getSaveState() {
      return {
        music: Music.currentMusic
      }
    },
    load() {
      onStart();
    },
    end() {
      shouldEnd = true;
    },
    setOnEnd(fun) {
      onEnd = fun;
    },
    setOnStart(fun) {
      onStart = fun;
    },
    execute() {
      onStart();
      return new Promise(res => {
        id = setInterval(() => {
          if (shouldEnd) {
            clearInterval(id);
            res();
            objects.forEach(object => object.onclick = undefined);
            onEnd();
          }
        });
      })
    }
  }
}