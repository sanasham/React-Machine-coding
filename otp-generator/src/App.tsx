import { useState } from "react";

import "./App.css";
import Otp from "./components/Otp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Otp />
    </>
  );
}

export default App;
