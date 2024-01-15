import React from 'react'
import classes from './App.module.css'

function WelcomeUsers() {
  return (
    <div className={classes.WelcomeUsers}>
    <p>Welcome</p>
    <p>choose a song</p>
    <p>and enjoy it</p>
    <span style={{fontSize: '60px'}}>😎</span>
    </div>
  )
}

export default WelcomeUsers