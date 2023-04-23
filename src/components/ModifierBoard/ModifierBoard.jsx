import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./ModifierBoard.scss";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { changeMoodStatus } from "../../redux/actions";
import Scences from "../Scences/Scences";
import ReactAudioPlayer from "react-audio-player";
import { changeRainStatus } from "../../redux/actions";
import { changeVolume } from "../../redux/actions";
import CountDownTimer from "../CountDownTimer/CountDownTimer";
import TodoList from "../TodoList/TodoList";
import YoutubeVideo from "../YoutubeVideo/YoutubeVideo";

const ModifierBoard = ({
  seconds,
  minutes,
  hours,
  isRunning,
  pause,
  resume,
  restart,
  setTimerHandler,
  setTimerStart,
  timerStart,
}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.moodState);
  const rainData = useSelector((state) => state.rainState);
  const volumeData = useSelector((state) => state.volumeState);

  const { rainValue } = rainData;
  const { moodMode } = data;
  const { volumeValue } = volumeData;

  const [openMood, setOpenMood] = useState(false);
  const [openFocus, setOpenFocus] = useState(false);
  const [openScence, setOpenScence] = useState(false);
  const [openYouTube, setOpenYouTube] = useState(false);

  const [cityTraffic, setCityTraffic] = useState(0);
  const [cityRain, setCityRain] = useState(rainValue);
  const [fireplace, setFireplace] = useState(0);
  const [snow, setSnow] = useState(0);
  const [summerStorm, setSummerStorm] = useState(0);
  const [fan, setFan] = useState(0);
  const [forestNight, setForestNight] = useState(0);
  const [wave, setWave] = useState(0);
  const [wind, setWind] = useState(0);
  const [people, setPeople] = useState(0);
  const [river, setRiver] = useState(0);
  const [rainForest, setRainForest] = useState(0);

  const rainSliderHandler = (e) => {
    // if slide then make it rain
    if (e.target.value > 0) dispatch(changeRainStatus("clear", cityRain));
    // if value = 0 then stop rain
    else if (e.target.value === 0) dispatch(changeRainStatus("rain", 0));
    setCityRain(e.target.value);
  };

  const openFocusHandler = () => {
    setOpenFocus(!openFocus);
    setOpenMood(false);
    setOpenScence(false);
    setOpenYouTube(false);
  };
  const openMoodHandler = () => {
    setOpenMood(!openMood);
    setOpenFocus(false);
    setOpenScence(false);
    setOpenYouTube(false);
  };
  const openScenceHandler = () => {
    setOpenScence(!openScence);
    setOpenMood(false);
    setOpenFocus(false);
    setOpenYouTube(false);
  };
  const openYouTubeHandler = () => {
    setOpenScence(false);
    setOpenMood(false);
    setOpenFocus(false);
    setOpenYouTube(!openYouTube);
  };
  const changeMoodHandler = (e) => {
    dispatch(changeMoodStatus(e.target.id));
  };

  const changeVolumeHandler = (e) => {
    dispatch(changeVolume(e.target.value));
  };

  return (
    <>
      {!openMood && (
        <div>
          <ReactAudioPlayer
            preload="auto"
            autoPlay
            src="./assets/musics/city_traffic.mp3"
            loop
            volume={cityTraffic / 100}
          />

          <ReactAudioPlayer
            preload="auto"
            autoPlay
            src="./assets/musics/fireplace.mp3"
            loop
            volume={fireplace / 100}
          />

          <ReactAudioPlayer
            preload="auto"
            autoPlay
            src="./assets/musics/rain_city.mp3"
            loop
            volume={rainValue / 100}
          />
        </div>
      )}
      <div
        className={
          `modifier ` + (openMood && "mood ") + (openFocus && " focus ")
        }
      >
        <div className="modifier__icon">
          <div className={`icon ` + (openMood && "active")}>
            <i onClick={openMoodHandler} className="fas fa-sliders-h fa-2x"></i>
          </div>
          {openMood && (
            <div className="modifierBox">
              <h4>Mood</h4>
              <div className="options">
                <div
                  id="sleep"
                  onClick={changeMoodHandler}
                  className={`item ` + (moodMode === "sleep" ? "active" : "")}
                >
                  <i id="sleep" className="fas fa-moon fa-2x"></i>
                  <span id="sleep">Sleep</span>
                </div>
                <div
                  id="jazzy"
                  onClick={changeMoodHandler}
                  className={`item ` + (moodMode === "jazzy" ? "active" : "")}
                >
                  <i id="jazzy" className="fas fa-guitar fa-2x"></i>
                  <span id="jazzy">Jazzy</span>
                </div>
                <div
                  id="chill"
                  onClick={changeMoodHandler}
                  className={`item ` + (moodMode === "chill" ? "active" : "")}
                >
                  <i id="chill" className="fas fa-coffee fa-2x"></i>
                  <span id="chill">Chill</span>
                </div>
              </div>
              <div className="volume">
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ mb: 1 }}
                  alignItems="center"
                >
                  <i className="fas fa-volume-down fa-lg"></i>
                  <Slider
                    className="volume-slider"
                    value={volumeValue}
                    onChange={changeVolumeHandler}
                  />
                  <i className="fas fa-volume-up fa-lg"></i>
                </Stack>
              </div>
              <h5>Background Noise</h5>
              <div className="backgroundNoise">
                <div className="noise-option">
                  <p>City traffic</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/city_traffic.mp3"
                    loop
                    volume={cityTraffic / 100}
                  />
                  <Slider
                    className="slider"
                    value={cityTraffic}
                    onChange={(e) => setCityTraffic(e.target.value)}
                  />
                </div>
                <div className="noise-option">
                  <p>City rain</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/rain_city.mp3"
                    loop
                    volume={rainValue / 100}
                  />
                  <Slider
                    className="slider"
                    value={rainValue}
                    onChange={rainSliderHandler}
                  />
                </div>
                <div className="noise-option">
                  <p>Fireplace</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/fireplace.mp3"
                    loop
                    volume={fireplace / 100}
                  />
                  <Slider
                    className="slider"
                    value={fireplace}
                    onChange={(e) => setFireplace(e.target.value)}
                  />
                </div>
                <div className="noise-option">
                  <p>Snow</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/snow.mp3"
                    loop
                    volume={snow / 100}
                  />
                  <Slider
                    className="slider"
                    value={snow}
                    onChange={(e) => setSnow(e.target.value)}
                  />
                </div>
                <div className="noise-option">
                  <p>Summer Storm</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/summer_storm.mp3"
                    loop
                    volume={summerStorm / 100}
                  />
                  <Slider
                    className="slider"
                    value={summerStorm}
                    onChange={(e) => setSummerStorm(e.target.value)}
                  />
                </div>
                <div className="noise-option">
                  <p>Fan</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/fan.mp3"
                    loop
                    volume={fan / 100}
                  />
                  <Slider
                    className="slider"
                    value={fan}
                    onChange={(e) => setFan(e.target.value)}
                  />
                </div>
                <div className="noise-option">
                  <p>Forest Night</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/forest_night.mp3"
                    loop
                    volume={forestNight / 100}
                  />
                  <Slider
                    className="slider"
                    value={forestNight}
                    onChange={(e) => setForestNight(e.target.value)}
                  />
                </div>
                <div className="noise-option">
                  <p>Wave</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/waves.mp3"
                    loop
                    volume={wave / 100}
                  />
                  <Slider
                    className="slider"
                    value={wave}
                    onChange={(e) => setWave(e.target.value)}
                  />
                </div>
                <div className="noise-option">
                  <p>Wind</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/wind.mp3"
                    loop
                    volume={wind / 100}
                  />
                  <Slider
                    className="slider"
                    value={wind}
                    onChange={(e) => setWind(e.target.value)}
                  />
                </div>
                <div className="noise-option">
                  <p>People</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/people_talk_inside.mp3"
                    loop
                    volume={people / 100}
                  />
                  <Slider
                    className="slider"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                  />
                </div>
                <div className="noise-option">
                  <p>River</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/river.mp3"
                    loop
                    volume={river / 100}
                  />
                  <Slider
                    className="slider"
                    value={river}
                    onChange={(e) => setRiver(e.target.value)}
                  />
                </div>
                <div className="noise-option">
                  <p>Rain Forest</p>
                  <ReactAudioPlayer
                    preload="auto"
                    autoPlay
                    src="./assets/musics/rain_forest.mp3"
                    loop
                    volume={rainForest / 100}
                  />
                  <Slider
                    className="slider"
                    value={rainForest}
                    onChange={(e) => setRainForest(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="modifier__icon">
          <div className={`icon` + (openFocus && "active")}>
            <i
              onClick={openFocusHandler}
              className="fas fa-book-reader fa-2x"
            ></i>
          </div>
        </div>
        {openFocus && (
          <div className="modifierBox">
            <h4>Focus Mode</h4>
            <CountDownTimer
              seconds={seconds}
              minutes={minutes}
              hours={hours}
              isRunning={isRunning}
              pause={pause}
              resume={resume}
              restart={restart}
              setTimerHandler={setTimerHandler}
              setTimerStart={setTimerStart}
              timerStart={timerStart}
            />
            <h4>To do list</h4>
            <TodoList />
          </div>
        )}
        <div className="modifier__icon">
          <div className={"icon " + (openScence && "active")}>
            <svg
              width="35"
              height="35"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={openScenceHandler}
            >
              <g clip-path="url(#clip0_356_347)">
                <path
                  opacity="0.5"
                  d="M7.08317 8.74996C8.00365 8.74996 8.74984 8.00377 8.74984 7.08329C8.74984 6.16282 8.00365 5.41663 7.08317 5.41663C6.1627 5.41663 5.4165 6.16282 5.4165 7.08329C5.4165 8.00377 6.1627 8.74996 7.08317 8.74996Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill="yellow" // Thiết lập màu sắc tại đây
                  d="M50 10 L10 90 L90 90 Z"
                />
                <path
                  d="M4.99949 16.667L12.3904 9.2761C12.7204 8.94609 12.8854 8.78108 13.0757 8.71926C13.243 8.66488 13.4233 8.66488 13.5907 8.71926C13.781 8.78108 13.946 8.9461 14.276 9.2761L17.8375 12.8377M18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996Z"
                  stroke={openScence ? "#f3a952" : "#4e5054"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_356_347">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        {openScence && (
          <div className="scence_container">
            <Scences />
          </div>
        )}
        <div className="modifier__icon">
          <div className={"icon " + (openYouTube && "active")}>
            <i
              style={{ fontSize: 28 }}
              onClick={openYouTubeHandler}
              class="fa-brands fa-youtube"
            ></i>
          </div>
        </div>
        {openYouTube && (
          <div className="searchYouTube">
            <YoutubeVideo />
          </div>
        )}
      </div>
    </>
  );
};

export default ModifierBoard;
