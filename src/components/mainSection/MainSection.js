// import React, { useState, useEffect } from 'react'
import classes from "./mainSection.module.css"
import RecentMusic from './recentMusic/RecentMusic'
import Recommended from './Recommended'
import NewRelease from './NewReleases'
import AlbumSection from "../albumSection/AlbumSection"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../../redux/authSlice"
import { useEffect } from "react"
import Searche from "../header/Searche/Searche"

export default function MainSection() {
  const albumLink = useSelector(state => state.link.albumLink);
  const showAlbum = useSelector(state => state.auth.showAlbum);
  const showSearche = useSelector(state=>state.auth.showSearche);
  const date = new Date().getHours()
  const dispatch = useDispatch()

  useEffect(()=>{
    if (albumLink.length > 0) {
      dispatch(authActions.toggleAlbum(true))
    }
  },[albumLink,dispatch])

  let greeting;
  if(date < 12){
        greeting = 'GOOD MORNING'
  }else if(date < 18){
    greeting = 'GOOD AFTERNOON'
  }else if(date < 24){
    greeting = 'GOOD EVENING'
  }
  
  return showAlbum? 
  (showSearche? <Searche /> : <AlbumSection />) : (
  <div className={classes.mainSection}>
      <p>{greeting}</p>
      <RecentMusic />
      <p>MADE FOR YOU</p>
      <Recommended />
      <p>NEW RELEASES</p>
      <NewRelease />
  </div>
  )
}
