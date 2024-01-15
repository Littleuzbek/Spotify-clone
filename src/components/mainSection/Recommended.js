import React, { useEffect, useState } from 'react'
import classes from "./recommended.module.css"
import APIKit from "../../spotify"
import { useDispatch } from "react-redux";
import { linkActions } from "../../redux/linkSlice";
import { authActions } from "../../redux/authSlice";


export default function Recommended() {
  const [madeForU, setMadeForU] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    APIKit.get('/browse/featured-playlists').then((response) => {
      setMadeForU(response.data.playlists.items.slice(0,3))
    });
  }, []);

  const linkHandler = (id, link) => {
    dispatch(linkActions.addAlbumLink(id));
    dispatch(linkActions.addLink(link));
    dispatch(authActions.toggleSearche(false));
  };
  
  return (
    <div className={classes.recommended}>
      {madeForU?.map((forU) => (
        <div key={forU.id} onClick={()=>{linkHandler(forU.id,forU)}} title={forU.name}>
          <img src={forU.images[0].url} alt='' />
          <div>
          <p>{forU.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
