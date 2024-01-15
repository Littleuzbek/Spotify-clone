import classes from "./Searche.module.css"
import { IoChevronBackCircleSharp } from "react-icons/io5"
import { ImSearch } from 'react-icons/im';
import { authActions } from '../../../redux/authSlice'
import { useDispatch } from 'react-redux';

export default function SearcheField({ setKey }) {
     const dispatch = useDispatch()

     return (
          <div className={classes.searcheField}>
               <IoChevronBackCircleSharp className={classes.backToHome} onClick={() => { dispatch(authActions.toggleAlbum(false)) }} />
               <div className={classes.inputField} >
                    <ImSearch className={classes.searcheBtn} />
                    <input type='text' onKeyUp={(e) => { setKey(e.target.value) }} placeholder='What do you want to listen to?'  />
               </div>
          </div>
     )
}
