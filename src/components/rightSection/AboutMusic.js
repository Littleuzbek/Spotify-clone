import React, { useEffect, useState } from "react";
import classes from "./aboutMusic.module.css";
import { useSelector } from "react-redux";

export default function AboutMusic() {
  const [albumType, setAlbumType] = useState();
  const albumInfos = useSelector((state) => state.link.link);
  const track = useSelector((state) => state.link.track);
  const img = useSelector((state) => state.link.albumTypeImg);
  const storedSongIndex = useSelector((state) => state.player.songIndex);

  useEffect(() => {
    const type = albumInfos?.at(-1)?.type ? albumInfos?.at(-1)?.type : albumInfos?.at(-1);
    setAlbumType(type);
  }, [storedSongIndex]);

  if (track.length > 0) {
    if (albumType === "playlist") {
      return (
        <div className={classes.aboutMusic}>
          <p>{albumInfos.at(-1)?.name}</p>
          <img src={track.at(-1)?.album?.images[0]?.url} alt="" />
          <div>
            <p>{track.at(-1)?.name}</p>
            <p>{track.at(-1)?.artists[0]?.name}</p>
          </div>
        </div>
      );
    } else if (albumType === "album") {
      return (
        <div className={classes.aboutMusic}>
          <p>{albumInfos.at(-1)?.name}</p>
          <img src={img.at(-1)} alt="" />
          <div>
            <p>{track.at(-1)?.name}</p>
            <p>{track.at(-1)?.artists[0]?.name}</p>
          </div>
        </div>
      );
    } else if (albumType === "track") {
      return(
      <div className={classes.aboutMusic}>
        <p>{track.at(-1)?.name}</p>
        <img src={track.at(-1)?.album?.images[0]?.url} alt={track.at(-1)?.name} />
        <div>
          <p>{track.at(-1)?.name}</p>
          <p>{track.at(-1)?.artists[0]?.name}</p>
        </div>
      </div>
      );
    } else {
      return;
    }
  }
}
