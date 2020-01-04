import { eventManager as events } from "./eventpubsub";
import data from "./data";
import view from "./view";

// load all data init

const initialize = () => {
  data.init();
  view.init();
  events.publish("activate-project", "Default Project");
};

initialize();
