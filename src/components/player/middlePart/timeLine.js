import classes from "./timeLine.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { linkActions } from "../../../redux/linkSlice";
import authActions from "../../../redux/authSlice"

export let audioRef = {};

export default function TimeLine({
  songIndex,
  setCurrentIndex,
  repeat,
  shuffle,
  signalToChangeAlbumType,
}) {
  const albumInfos = useSelector((state) => state.link.link);
  const queueStore = useSelector((state) => state.player.queueStore);
  const [albumType, setAlbumType] = useState();
  const [album, setAlbum] = useState();
  let infoForRightSection;

  useEffect(() => {
    setAlbumType(
      albumInfos?.at(-1)?.type ? albumInfos?.at(-1)?.type : albumInfos?.at(-1)
    );
    setAlbum("");
    setAlbum(queueStore);
  }, [signalToChangeAlbumType]);
  let audioSrc;

  if (albumType) {
    try {
      if (albumType === "playlist") {
        if (songIndex !== -1) {
          audioSrc = album[songIndex]?.track?.preview_url;
          infoForRightSection = album[songIndex]?.track;
        }
      } else if (albumType === "album") {
        if (songIndex !== -1) {
          audioSrc = album[songIndex]?.preview_url;
          infoForRightSection = album[songIndex];
        }
      } else if (albumType === "track") {
        if (songIndex !== -1) {
          if (album?.preview_url) {
            audioSrc = album?.preview_url;
            infoForRightSection = album;
          }
        }
      }
    } catch (error) {
      window.location.reload();
    }
  }

  audioRef = useRef(new Audio(audioSrc));
  const [progress, setProgress] = useState(0);
  const [progressColor, setProgressColor] = useState(false);
  const [musicTimeIndicator, setMusicTimeIndicator] = useState();
  const [shuffleTrackIndex, setShuffleTrackIndex] = useState(0);
  const dispatch = useDispatch();

  const { duration } = audioRef.current;
  const intervalRef = useRef();

  const play = () => {
    audioRef.current.play();
  };
  const pause = () => {
    audioRef.current.pause();
  };

  const startTimer = () => {
    try {
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (audioRef.current.ended) {
          if (repeat) {
            setCurrentIndex(songIndex);
            play();
          } else if (shuffle) {
            if (shuffleTrackIndex < queueStore.length) {
              setShuffleTrackIndex(shuffleTrackIndex + 1);
              setCurrentIndex(shuffleTrackIndex);
            } else {
              setShuffleTrackIndex(0);
              setCurrentIndex(0);
            }
          } else {
          if (album?.length === 1) {
            return;
          }else if (album?.length > 1) {
            nextHandler();
            } else {
              return;
            }
          }
        } else {
          setProgress(audioRef.current.currentTime);
        }
      }, 1000);
    } catch (error) {
      window.location.reload();
    }
  };

  useEffect(() => {
    try {
      if (songIndex === -1 || songIndex === undefined) {
        setMusicTimeIndicator(false);
        setShuffleTrackIndex(0);
        return;
      } else if (audioSrc === null || audioSrc === undefined) {
        pause();
        if (shuffle) {
          setShuffleTrackIndex(shuffleTrackIndex + 1);
          setCurrentIndex(shuffleTrackIndex);
        } else if (songIndex < album.length) {
          if (0 < album.length - 1){ setCurrentIndex(songIndex + 1);}
        } else {
          setCurrentIndex(0);
        }
      } else {
        if (audioRef.current.src === audioSrc) {
          return;
        } else {
          audioRef.current.src = "";
          audioRef.current.src = audioSrc;
          setMusicTimeIndicator(true);
          play();
          startTimer();
          dispatch(linkActions.addTrack(infoForRightSection));
        }
      }
    } catch (error) {
      window.location.reload();
    }
  }, [audioSrc]);

  const progressColorChangeGreen = () => {
    setProgressColor(true);
  };

  const progressColorChangeWhite = () => {
    setProgressColor(false);
  };

  const currentPercentage = duration ? `${(progress / duration) * 100}%` : `0%`;

  const trackStylingWhite = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;

  const trackStylingGreen = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, rgb(47, 251, 47)), color-stop(${currentPercentage}, #777))`;

  const changeTime = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setProgress(audioRef.current.currentTime);
  };

  const ChangeTimeAndPlay = () => {
    startTimer();
    play();
  };

  const nextHandler = () => {
    if (songIndex <= album?.length - 1) {
      pause();
      setCurrentIndex(songIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (!shuffle) {
      audioRef.current.currentTime = progress;
    }
  }, [shuffle]);

  const ConvertedMin = Math.round(duration);
  const min = ConvertedMin;

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  return (
    <div className={classes.timeLineBox}>
      {musicTimeIndicator ? (
        <p>
          00
          <span>:</span>
          {addZero(Math.round(progress))}
        </p>
      ) : (
        ""
      )}
      <input
        type="range"
        style={{
          background: progressColor ? trackStylingGreen : trackStylingWhite,
        }}
        value={progress}
        min={0}
        max={duration ? duration : ""}
        className={classes.realProgressBar}
        onChange={(e) => {
          changeTime(e.target.value);
        }}
        onMouseUp={ChangeTimeAndPlay}
        onMouseOver={progressColorChangeGreen}
        onMouseOut={progressColorChangeWhite}
      />
      {musicTimeIndicator ? (
        <p>
          00
          <span>:</span>
          {min ? min : "00"}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
