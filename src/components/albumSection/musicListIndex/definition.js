import React from 'react'
import classes from './definition.module.css'

export default function Definition({background,album}) {
  return (
     <div className={background? classes.background : classes.index}  >
     <p>#</p>
     <p>Title</p>
     <p>{album? '' : 'Album'}</p>
     <p>Time</p>
   </div>
     )
}
