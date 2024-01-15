import React, {  useState } from 'react'
import TimeLine from "./timeLine"
import Controls from "./controls"
import classes from "./middlePart.module.css"

export default function MiddlePart({ setCurrentIndex, songIndex, setShuffle, shuffle,signalToChangeAlbumType}) {
  const [repeat, setRepeat] = useState(false);

  return (
    <div className={classes.MiddlePart}>
      <Controls setCurrentIndex={setCurrentIndex} songIndex={songIndex} repeat={repeat} setRepeat={setRepeat} setShuffle={setShuffle} shuffle={shuffle} />
      <TimeLine setCurrentIndex={setCurrentIndex} songIndex={songIndex} repeat={repeat} shuffle={shuffle} signalToChangeAlbumType={signalToChangeAlbumType} />
    </div>
  )
}
