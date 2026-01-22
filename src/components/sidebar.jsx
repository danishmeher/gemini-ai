import React, { useContext } from "react";
import "./sidebar.css";
import { assets } from "../assets/assets";
import { useState } from "react";
import {Context} from "./context.jsx"

const sidebar = () => {
  const [extended, setextended] = useState(false);
  const {onSent , previousPrompt, setrecentPrompt, newchat} = useContext(Context)

  const loadPrompt = async (prompt)=>{
    setrecentPrompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className="sidebar">
      <div className="topbar">
        <img onClick={()=>{setextended(prev=>!prev)}} className="menu" src={assets.menu_icon} alt="" />
        <div onClick={()=>newchat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ?
          <div  className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompt.map((item,i)=>{
              return (
                <div key={i} onClick={()=>{loadPrompt(item.prompt)}} className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>{item.prompt.slice(0,18)} ...</p>
            </div>
              )
            })}
            
          </div>
          : null}
      </div>
      <div className="bottombar">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p className="help-title">Help</p> : null}

        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p className="help-title">Activity</p>:null }
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p className="help-title">Setting</p>:null}
        </div>
      </div>
    </div>
  );
};

export default sidebar;
