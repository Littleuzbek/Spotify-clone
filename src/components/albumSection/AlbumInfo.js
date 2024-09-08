import React, { useState, useEffect } from "react";
import classes from "./albumInfo.module.css";
import { useSelector } from "react-redux";

export default function AlbumInfo() {
  const albumInfos = useSelector((state) => state.link.link);
  const [totalTracks, setTotalTracks] = useState();

  useEffect(() => {
    if (albumInfos?.at(-1).type === "album") {
      setTotalTracks(albumInfos.at(-1).total_tracks);
    } else if (albumInfos?.at(-1).type === "playlist") {
      setTotalTracks(albumInfos?.at(-1).tracks.total);
    } else {
      setTotalTracks("Unknown");
    }
  }, [albumInfos]);

  return (
    <div className={classes.albumInfo}>
      <img src={albumInfos?.at(-1)?.images[0]?.url} alt="" />
      <div>
        <p>{albumInfos?.at(-1)?.name}</p>
        <p>{`Total tracks: ${totalTracks}`}</p>
      </div>
    </div>
  );
};