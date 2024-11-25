import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

(async () => {
  // TODO: Once we can render arbitrary HTML within the iframe, write a div#root in the HTML and load it there.
  const rootElement = document.createElement("div");
  document.body.appendChild(rootElement);

  const root = createRoot(rootElement);
  root.render(<App />);
})();
