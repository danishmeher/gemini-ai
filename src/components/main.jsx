import React, { useContext } from "react";
import "./main.css";
import { assets } from "../assets/assets";
import { Context } from "./context.jsx";

const Main = () => {
  const {
    onSent,
    previousPrompt,
    showResult,
    loading,
    setInput,
    input,
    setloading,
    newchat,

  } = useContext(Context);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };
  
  const stopLoading = ()=>{
    newchat();
  }

  return (
    <div className="main">
      <div className="nav">
        <p>DANNI AI</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {showResult ? (
          <div className="chat-history">
            {previousPrompt.map((item, index) => (
              <div key={index} className="result">
                {/* User prompt */}
                <div className="result-title">
                  <img src={assets.user_icon} alt="user" />
                  <p>{item.prompt}</p>
                </div>

                {/* AI response */}
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="ai" />
                  <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
                </div>
              </div>
            ))}

            {/* ✅ Loader always at bottom while AI is typing */}
            {loading && (
              <div className="result">
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="ai" />
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="greet">
              <p>
                <span>Hello,</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card card2">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card card2">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card card2">
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={changeHandler}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                loading ? (
                  <img onClick={()=>{stopLoading()}} src={assets.stop_icon} alt="Stop" />
                ) : (
                  <img
                    onClick={() => {
                      onSent();
                    }}
                    src={assets.send_icon}
                    alt="Send"
                  />
                )
              ) : null}
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Gemini may display inaccurate info, including about people, so
              double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
