import { useState,useEffect } from "react"
import RecentMusicItem from "./RecentMusicItem";
import APIKit from "../../../spotify";
import classes from "./recentMusic.module.css"


export default  function RecentMusic () {
  const [recents, setRecents] = useState();

  useEffect(()=>{
    APIKit.get("me/playlists").then( (response)=> {
      setRecents(response.data.items);
    });
  },[])

  const recentMusic = recents?.map((playlist)=>(
      <RecentMusicItem 
      key={playlist.id} 
      id={playlist.id} 
      name={playlist.name} 
      img={playlist.images} 
      link={playlist}
      />
  ))
  return (
    <div className={classes.recentMusic}>
      {recentMusic}
    </div>
  )
}
