import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../redux/authSlice";

export default function SearcheAlbums(props) {
  const dispatch = useDispatch();

  const showMesssage = () => {
    dispatch(authActions.toggleMessage(true));
    setTimeout(() => {
      dispatch(authActions.toggleMessage(false));
    }, 2500);
  };

  return (
    <div id={props.id} onClick={() =>{return showMesssage()}}>
      <img src={props.image} alt="" />
      <div>
        <p>{props.name}</p>
      </div>
    </div>
  );
}
