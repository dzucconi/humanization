import { humanize, simulateTyping, toString } from "humanization";

const el = document.getElementById("root");

const sample =
  "I think I like truly scary psychological thrillers because it can let me know that the horror I feel when I’m simply spiralling for a reason that is so pitiful in the scheme of things, a mere setback compared to the horror some people suffer consistently, or once, and then forever, is recognized. A writer can create the most awful version of something and contain it in an enacted plot, and the curtain of fiction places it into the same exact brain space as my real horror, however contained it is in my own consciousness. Because mostly my life is idyllic, with nothing wrong with it, and even that very fact is frightening – something else must be happening behind that curtain, waiting to terrorize me with its reality.";

const stream = humanize(sample);

simulateTyping({
  stream,
  onStroke: ({ strokedStream }) => {
    el.innerHTML = toString(strokedStream);
  }
}).then(() => (el.innerHTML += ' <a onclick="location.reload()">reload</a>'));
