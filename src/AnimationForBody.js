import React, { useEffect,useState } from 'react'
import { BsArrowUpShort } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import classes from "./App.module.css"
import { useSelector } from 'react-redux';

export default function AnimationForBody({toggle,bodyToggle}) {
  const track = useSelector((state) => state.link.track);
  const img = useSelector((state) => state.link.albumTypeImg);

  let currentImg = track.at(-1)?.album?.images[0]?.url? track.at(-1)?.album?.images[0]?.url : img.at(-1);

  return (
    <div> {!bodyToggle ? (
        <BsArrowUpShort onClick={toggle} className={classes.hideBodyBtn} />
      ) : (
        <div>
          <BsArrowLeftShort
            onClick={toggle}
            className={classes.reappearBtn}
          />
         {track.at(-1) ? ( <div className={classes.hiddenBody} onClick={toggle}>
            <img src={currentImg} alt="" />
            <div>
              <p>{track.at(-1)?.name}</p>
              <p>{track.at(-1)?.artists[0]?.name}</p>
            </div>
          </div>): ''}
        </div>
      )}
      </div>
  )
}
