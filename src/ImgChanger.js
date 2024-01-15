import { GrNext } from "react-icons/gr";
import classes from './App.module.css'

export default function ImgChanger({next,prev}) {

  return (
    <div>
        <GrNext className={classes.nextImg} onClick={next} />
        <GrNext className={classes.previousImg} onClick={prev} />
    </div>
  )
}
