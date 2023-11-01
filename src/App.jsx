import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [lenght, setLenght] = useState("8");
  const [charAllow, setCharAllow] = useState(false);
  const [numAllow, setNumAllow] = useState(false);

  const [password, setPassword] = useState("");

  const inputRef = useRef(null);
  const passwordGenerator = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "0123456789";
    if (charAllow) str += "`~!@#$%^&*()*+-{[}]|<>()";

    for (let i = 0; i < lenght; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  };

  useEffect(() => {
    passwordGenerator();
  }, [lenght, charAllow, numAllow, setPassword]);

  const handleClick = () => {
    inputRef?.current.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-700">
      <div className="bg-slate-700 flex">
        <input
          ref={inputRef}
          type="text"
          min={1}
          max={100}
          className="border-0 outline-0 p-4 rounded-tl-lg"
          readOnly
          placeholder="Password..."
          value={password}
        />
        <button onClick={handleClick} className="p-2 rounded-br-lg bg-blue-500">
          Copy
        </button>
      </div>
      <div className="mt-4">
        <input
          type="range"
          value={lenght}
          onChange={(e) => setLenght(e.target.value)}
        />
        <input
          type="checkbox"
          className="ml-5 rounded-md"
          onChange={() => setNumAllow((prev) => !prev)}
        />
        Numbers
        <input
          type="checkbox"
          className="ml-5 rounded-md"
          onChange={() => setCharAllow((prev) => !prev)}
        />
        Special Character
      </div>
    </div>
  );
}

export default App;
