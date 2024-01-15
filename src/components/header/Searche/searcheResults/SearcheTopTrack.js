import React from 'react'
import classes from "./SearcheResults.module.css"
import {linkActions} from "../../../../redux/linkSlice"
import { useDispatch } from 'react-redux'
import { authActions } from '../../../../redux/authSlice';

export default function SearcheTopTrack({top}) {
     const dispatch = useDispatch();

     const linkHandler = (id,link) =>{
          dispatch(linkActions.addAlbumLink(id))
          dispatch(linkActions.addLink(link))
          dispatch(authActions.toggleSearche(false))
     }

     return (
          <div className={classes.topResult} id={top?.id} >
               <div onClick={()=>{linkHandler(top?.id,top)}} >
                    <img src={top?.images[0].url} alt='connecting...' title={top?.name}/>
                    <p>{top?.name}</p>
                    <p>{top?.artists[0].name}</p>
               </div>
          </div>
     )
}
