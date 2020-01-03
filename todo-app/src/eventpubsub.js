// Event Object
// eventName = event name, call for the event
// handler = function that handles the event or
// can be data passed
const eventFactory = (eventName, handler) => {
  return { eventName, handler };
};

const eventManager = (() => {
  // contains all events
  let eventsCollection = [];

  // adds event to the collection of event.
  const subscribe = (eventNameStr, eventFunction) => {
    // if eventName already exist, change its handler to current function
    for (let key in eventsCollection) {
      if (eventsCollection[key].eventName === eventNameStr) {
        eventsCollection[key].handler = eventFunction;
        console.log("key exist replacing");
        return;
      }
    }

    // else add new event to the collection
    const newEvent = eventFactory(eventNameStr, eventFunction);
    eventsCollection.push(newEvent);
    console.log("added new key");
  };

  // fires a certain event in the collection of events
  const publish = (eventNameStr, dataToPass) => {
    // run the handler if found
    for (let key in eventsCollection) {
      if (eventsCollection[key].eventName === eventNameStr) {
        eventsCollection[key].handler(dataToPass);
        return;
      }
    }
    // if event is not found
    console.log("Event " + eventNameStr + " not found");
  };

  return { subscribe, publish };
})();

export { eventManager };
