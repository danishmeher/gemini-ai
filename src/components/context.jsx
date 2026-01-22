import { createContext, useState } from "react";
import runChat from "../geminikey";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [previousPrompt, setpreviousPrompt] = useState([]); // will hold {prompt, response}
  const [showResult, setshowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setresultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newchat = () => {
    setloading(false);
    setshowResult(false);
  };

  const onSent = async (prompt) => {
    setresultData("");
    setloading(true);
    setshowResult(true);

    let response;
    let usedPrompt = prompt;

    if (prompt !== undefined) {
      setrecentPrompt(prompt);
      response = await runChat(prompt);
    } else {
      usedPrompt = input;
      setrecentPrompt(input);
      response = await runChat(input);
    }

    // Formatting response
    let newResponseArray = response.split(" ");

for (let i = 0; i < newResponseArray.length; i++) {
  const nextWord = newResponseArray[i];
  delayPara(i, nextWord + " ");
}
    // ✅ Save both prompt + response in history
    setpreviousPrompt((prev) => [...prev , { prompt: usedPrompt, response: response}]);
    setloading(false);
    setInput("");
  };

  const contextValue = {
    previousPrompt, // now an array of {prompt, response}
    setpreviousPrompt,
    onSent,
    setrecentPrompt,
    recentPrompt,
    showResult,
    loading,
    setloading,
    resultData,
    input,
    setInput,
    newchat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
