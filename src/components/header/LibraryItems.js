import React from 'react'
import classes from "./libraryItems.module.css"
import { useDispatch } from 'react-redux'
import { linkActions } from '../../redux/linkSlice'
import { authActions } from '../../redux/authSlice'

export default function LibraryItems(props) {
  const dispatch = useDispatch()

  const linkHandler = (id,link) =>{
    dispatch(linkActions.addAlbumLink(id))
    dispatch(linkActions.addLink(link))
    dispatch(authActions.toggleSearche(false))
}

  return (
    <span className={classes.libraryItems} id={props.id} onClick={()=>{return linkHandler(props.id,props.link)}}>
     <img src={props.img[0]?.url} alt='' />
     <div>
          <p>{props.name}</p>
          <div>
               <p>{props.type}</p>
               <div></div>
               <p>{props.display_name}</p>
          </div>
     </div>
    </span>
  )
}
