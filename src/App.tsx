import logo from "./logo.svg";
import "./App.css";
import { useNumber } from "./hooks/01-useNumber";
import { useEffect } from "react";
import { useDebouncedValue } from "./hooks/04-useDebouncedValue";
import { usePreviousValue } from "./hooks/05-usePreviousValue";
import { useRecordState } from "./hooks/06-useRecordState";
import { useAsyncEffect } from "./hooks/07-useAsyncEffect";
import { useEventListener } from "./hooks/08-useEventListener";

type Payload = {
  name: string;
  age?: number;
  state: string;
};

function App() {
  const [count, setCount] = useNumber(20);

  useEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") {
        console.log("enter was pressed");
      }
    },
    {
      target: window,
    }
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
