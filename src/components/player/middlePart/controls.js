import React, { useEffect, useState } from "react";
import { FaShuffle } from "react-icons/fa6";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";
import { BsPauseCircleFill } from "react-icons/bs";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { FaRepeat } from "react-icons/fa6";
import { BsFillPlayCircleFill } from "react-icons/bs";
import classes from "./controls.module.css";
import { audioRef } from "./timeLine";

export default function Controls({
  setCurrentIndex,
  songIndex,
  setRepeat,
  repeat,
  shuffle,
  setShuffle,
}) {
  const [previousBtn, setPreviousBtn] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);
  const [pausePlay, setPausePlay] = useState(false);
  const normalBtn = classes.controlBtn;

  const shuffleHandler = () => {
    setShuffle(!shuffle);
  };

  const repeatHandler = () => {
    setRepeat(!repeat);
  };

  const previousHandler = () => {
    if (songIndex === 0) {
      return;
    } else {
      setPreviousBtn(true);
      setTimeout(() => {
        setPreviousBtn(false);
      }, 310);
      setCurrentIndex(songIndex - 1);
    }
  };

  const nextHandler = () => {
    setNextBtn(true);
    setTimeout(() => {
      setNextBtn(false);
    }, 310);
    setCurrentIndex(songIndex + 1);
  };

  useEffect(() => {
    if (songIndex !== -1) {
          if (audioRef.current.play()) {
               setPausePlay(true);
          } else if (audioRef.current.pause()) {
               setPausePlay(false);
          }
     }
}, [songIndex]);

  const PausePlayHandler = () => {
    if (pausePlay) {
      audioRef.current.pause();
      setPausePlay(false);
    } else {
      audioRef.current.play();
      setPausePlay(true);
    }
  };

  return (
    <div className={classes.controls}>
      <FaShuffle
        className={shuffle ? classes.shuffle : normalBtn}
        onClick={shuffleHandler}
      />
      <BiSolidSkipPreviousCircle
        className={previousBtn ? classes.animBtn : normalBtn}
        onClick={previousHandler}
      />
      {pausePlay ? (
        <BsPauseCircleFill
          className={classes.controlBtn}
          onClick={PausePlayHandler}
        />
      ) : (
        <BsFillPlayCircleFill
          className={classes.controlBtn}
          onClick={PausePlayHandler}
        />
      )}
      <BiSolidSkipNextCircle
        className={nextBtn ? classes.animBtn : normalBtn}
        onClick={nextHandler}
      />
      <FaRepeat
        className={repeat ? classes.repeat : normalBtn}
        onClick={() => repeatHandler()}
      />
    </div>
  );
}
