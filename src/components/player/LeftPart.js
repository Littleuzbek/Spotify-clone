import { useEffect, useState } from "react";
import classes from "./leftPart.module.css";
import { useSelector } from "react-redux";

export default function LeftPart({ songIndex, signalToChangeAlbumType }) {
  const albumInfos = useSelector((state) => state.link.link);
  const queueStore = useSelector((state) => state.player.queueStore);
  const img = useSelector((state) => state.link.albumTypeImg);
  const [albumType, setAlbumType] = useState();
  const [album, setAlbum] = useState();

  useEffect(() => {
    const type = albumInfos?.at(-1)?.type ? albumInfos?.at(-1)?.type : albumInfos?.at(-1)
    setAlbumType(type);
    setAlbum("");
    setAlbum(queueStore);
  }, [signalToChangeAlbumType]);

  console.log(signalToChangeAlbumType);

  let trackName;
  if (albumType) {
    if (albumType === "album") {
      trackName = album[songIndex]?.name;
    } else if (albumType === "playlist") {
      trackName = album[songIndex]?.track?.name;
    } else if (albumType === "track") {
      trackName = album?.name;
    }
  }

  const [nameAnimation, setNameAnimation] = useState(false);
  const wordToLetters = trackName?.toString().split("").map(String);
  const wordLenght = wordToLetters?.length;

  useEffect(() => {
    if (wordLenght > 26) {
      setNameAnimation(true);
    } else if (wordLenght < 26) {
      setNameAnimation(false);
    } else {
      return;
    }
  }, [songIndex]);

  if (albumType === "playlist") {
    return (
      <div className={classes.details}>
        <img src={album[songIndex]?.track?.album?.images[0].url} alt="" />
        <div>
          <div
            className={
              nameAnimation ? classes.animatedName : classes.nameOfMusic
            }
          >
            <p>{album[songIndex]?.track.name}</p>
          </div>
          <p>{album[songIndex]?.track?.artists[0]?.name}</p>
        </div>
      </div>
    );
  } else if (albumType === "album") {
    return (
      <div className={classes.details}>
        <img src={img.at(-1)} alt="" />
        <div>
          <div
            className={
              nameAnimation ? classes.animatedName : classes.nameOfMusic
            }
          >
            <p>{album[songIndex]?.name}</p>
          </div>
          <p>{album[songIndex]?.artists[0]?.name}</p>
        </div>
      </div>
    );
  } else if (albumType === "track") {
    return (
      <div className={classes.details}>
        <img src={album?.album?.images[0]?.url} alt="" />
        <div>
          <div
            className={
              nameAnimation ? classes.animatedName : classes.nameOfMusic
            }
          >
            <p>{album?.name}</p>
          </div>
          <p>{album?.artists[0]?.name}</p>
        </div>
      </div>
    );
  } else {
    return;
  }
}
