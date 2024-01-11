function PointNClick() {
  let alreadyInInteraction = false;
  let shouldEnd = false;
  let onEnd = undefined;
  let onStart = undefined;
  const objects = [];
  const events = [];

  return {
    async loadMedia() {
      events.forEach(async event => await event.loadMedia());
    },
    bind(object, event) {
      objects.push(object);
      events.push(event);
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