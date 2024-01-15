import React, { useEffect, useState } from 'react'
import classes from "./rightPart.module.css"
import { FaMicrophone } from "react-icons/fa"
import { BiSolidVolumeFull } from "react-icons/bi"
import { audioRef } from './middlePart/timeLine'
import {BiSolidVolume} from 'react-icons/bi'

export default function RightPart() {
  const [toggle,setToggle] = useState(false)
  const [volume,setVolume] = useState()
  const [previousVolume,setPreviousVolume] = useState(false)


  const volumeHandler = (e) => {
    const value = Number(e.target.value) / 10;
    setVolume(value);
    audioRef.current.volume = value
    if(audioRef.current.volume === 0){
      setToggle(true)
    }else{
      setToggle(false)
    }
  }

  const muteHandler =(e)=>{
    audioRef.current.volume = e;
    setToggle(true)
  }

  const unmuteHandler =(e)=>{
    audioRef.current.volume = e;
    setToggle(false)
  }

  useEffect(()=>{
      if(volume === 0){
        setPreviousVolume(false)
      }else{
        setPreviousVolume(true)
      }
  },[volume])

  return (
    <div className={classes.rightPart}>
      <div>
      <FaMicrophone className={classes.microPhone} />
      </div>
      <div>
        {toggle ? <BiSolidVolume className={classes.volumeDown}
        onClick={()=> previousVolume? unmuteHandler(volume) : unmuteHandler(1)}/>
        :
        <BiSolidVolumeFull className={classes.volumeUp} onClick={()=>muteHandler(0)} />}
        <input type='range' min={0} max={10} onClick={(e)=>volumeHandler(e)}  onChange={(e)=>volumeHandler(e)} className={classes.volume} />
      </div>
    </div>
  )
}
