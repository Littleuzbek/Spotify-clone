import React from 'react'
import classes from "./App.module.css"

export default function loadingAnimation() {
  return (
    <div className={classes.animation}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}
