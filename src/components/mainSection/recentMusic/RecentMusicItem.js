import { useDispatch } from "react-redux"
import {linkActions} from "../../../redux/linkSlice"
import { authActions } from "../../../redux/authSlice"

export default function RecentMusicItem(props) {

     const dispatch = useDispatch();

     const linkHandler = (id,link) =>{
          dispatch(linkActions.addAlbumLink(id))
          dispatch(linkActions.addLink(link))
          dispatch(authActions.toggleSearche(false))
     }
     return (
        <div key={props.id} onClick={()=>{linkHandler(props.id,props.link)}}>
          <img src={props.img[0].url} alt='' />
          <p title={props.name}>{props.name}</p>
        </div>
  )
}
