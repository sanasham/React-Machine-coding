import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">
        <AutoComplete />
      </div>
    </>
  );
}

export default App;
