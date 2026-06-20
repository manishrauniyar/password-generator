import { useCallback, useEffect, useState } from "react"


const App = () => {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass)

  }
    , [length, numberAllowed, charAllowed])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password Copied!");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Password Generator
          </h1>

          <div className="flex gap-2 mb-5">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Generate Password"
              className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white outline-none"
            />

            <button
              onClick={copyPassword}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Copy
            </button>
          </div>

          <div className="mb-5">
            <label className="text-white block mb-2">
              Length: {length}
            </label>

            <input
              type="range"
              min="8"
              max="50"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full"
            />
          </div>


          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange=
                {
                  () => {
                    setNumberAllowed((prev) => !prev)
                  }}
              />
              <label className="text-white">
                Include Numbers
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => { setCharAllowed((prev) => !prev) }}
              />
              <label className="text-white">
                Include Special Characters
              </label>
            </div>
          </div>

          <button
            onClick={passwordGenerator}
            className="w-full py-3 rounded-lg bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-semibold"
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  )
}

export default App

