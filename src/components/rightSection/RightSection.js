import React, { useState } from "react";
import classes from "./rightSection.module.css";
import AboutMusic from "./AboutMusic";
import AboutArtist from "./AboutArtist";
import { useSelector } from "react-redux";

export default function RightSection() {
  const track = useSelector((state) => state.link.track);

  return (
    <div className={classes.rightSection}>
      <AboutMusic />
      <AboutArtist artistID={track.at(-1)?.artists[0]?.id} />
    </div>
  );
}
