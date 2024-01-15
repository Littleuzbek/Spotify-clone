import React, { useEffect, useState } from "react";
import classes from "./player.module.css";
import LeftPart from "./LeftPart";
import MiddlePart from "./middlePart/MiddlePart";
import RightPart from "./RightPart";
import { useSelector } from "react-redux";

const Player = () => {
  const [currentIndex, setCurrentIndex] = useState();
  const [PartIsShown, setPartIsShown] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [shuffleList, setShuffleList] = useState([]);
  const [signal, setSignal] = useState();
  const storedSongIndex = useSelector((state) => state.player.songIndex);
  const queueStore = useSelector((state) => state.player.queueStore);
  const albumInfos = useSelector((state) => state.link.link);
  const length = queueStore?.length;

  const songIndex = shuffle ? shuffleList[currentIndex] : currentIndex;

  useEffect(() => {
    if (!shuffle) {
      setCurrentIndex(shuffleList[currentIndex]);
    }
  }, [shuffle]);

  useEffect(() => {
    try {
      if (length === 0) {
        setCurrentIndex(-1);
      } else if (albumInfos.at(-1) === "track") {
        setCurrentIndex(storedSongIndex);
        setSignal(storedSongIndex);
        setPartIsShown(true);
      } else {
        setPartIsShown(true);
        setCurrentIndex(storedSongIndex);
        setSignal(storedSongIndex);
      }
    } catch (err) {
      window.location.reload();
    }
  }, [storedSongIndex]);

  useEffect(() => {
    try {
      let unshuffled = [];
      for (let i = 0; i < length; i++) {
        unshuffled.push(i);
      }
      let shuffled = unshuffled
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setShuffleList(shuffled);
    } catch (err) {
      window.location.reload();
    }
  }, [length]);

  const emptyLeftPart = <div></div>;

  return (
    <div className={classes.player}>
      {PartIsShown ? (
        <LeftPart songIndex={songIndex} signalToChangeAlbumType={signal} />
      ) : (
        emptyLeftPart
      )}
      <MiddlePart
        setCurrentIndex={setCurrentIndex}
        songIndex={songIndex}
        setShuffle={setShuffle}
        shuffle={shuffle}
        signalToChangeAlbumType={signal}
      />
      {PartIsShown ? <RightPart /> : emptyLeftPart}
    </div>
  );
};

export default Player;
