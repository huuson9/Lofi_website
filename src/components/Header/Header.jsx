import React, { useState, useEffect, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { signOutAPI, changeDayNight } from "../../redux/actions";
import "./Header.scss";
import { Link } from "react-router-dom";
import DarkLightSwitch from "../DarkLightSwitch/DarkLightSwitch";
import { create } from "@mui/material/styles/createTransitions";
import Mute from "react-mute";
import { CloseTimeContext } from "../../provider/CloseTimeProvider";
const Header = () => {
  const { reverseClose } = useContext(CloseTimeContext);
  const [muted, setMuted] = useState(true);
  const handleMuteToggle = () => {
    setMuted(!muted);
  };
  let today = new Date();
  const [times, setTimes] = useState(today);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimes(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  let minute =
    times.getMinutes() < 10 ? "0" + times.getMinutes() : times.getMinutes();
  let time =
    times.getHours() < 12
      ? times.getHours() + ":" + minute + " AM"
      : times.getHours() - 12 + ":" + minute + " PM";
  const [fullscreen, setFullscreen] = useState(false);
  const data = useSelector((state) => state.userState);
  const daynight = useSelector((state) => state.modeState);
  const dispatch = useDispatch();

  const { user } = data;
  const { mode } = daynight;

  const signOutHandler = () => {
    dispatch(signOutAPI());
  };

  const daynightHandler = () => {
    dispatch(changeDayNight(mode));
  };

  const fullscreenHandler = () => {
    if (!fullscreen) {
      setFullscreen(true);
      const e = document.documentElement;
      e.requestFullscreen();
    } else {
      setFullscreen(false);
      if (!document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  };
  return (
    <nav className="wrap">
      <Link to="/">
        <img src="/assets/icons/lofi-logo.gif" alt="" />
      </Link>
      <div className="nav-menu">
        <Link to="/about">
          <i className="fas fa-info"></i>
          <span>How it works</span>
        </Link>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/huuson9/Lofi_website"
        >
          <i className="fab fa-github"></i>
          <span>GitHub</span>
        </a>
      </div>

      <div className="nav-menu">
        <div className="time-btn" onClick={reverseClose}>
          {time}
        </div>
        <div onClick={daynightHandler}>
          <DarkLightSwitch theme={mode} />
        </div>
        {/* <Mute isMuted={muted} onToggle={setMuted(!muted)} /> */}
        {/* <Mute
          isMuted={muted}
          onToggle={handleMuteToggle}
          muteLabel="Turn off sound"
          unmuteLabel="Turn on sound"
          muteIcon={<i class="fa-solid fa-volume-xmark"></i>}
        /> */}
        {/* <div className="mute-btn" onClick={setMuted(!muted)}>
          <i class="fa-solid fa-volume-xmark"></i>
        </div> */}
        <button onClick={fullscreenHandler} className="fullscreen-btn">
          <i className="fas fa-expand fa-lg"></i>
        </button>
      </div>
      <div className="nav-menu">
        <Link to="/user">
          {user && user.photoURL && <img src={user.photoURL} alt="" />}
          {user && user.displayName && <span>{user.displayName}</span>}
        </Link>
        {user ? (
          <Link to="/" onClick={signOutHandler}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Log Out</span>
          </Link>
        ) : (
          <Link to="/login">
            <i className="fas fa-sign-in-alt"></i>
            <span>Log In</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
