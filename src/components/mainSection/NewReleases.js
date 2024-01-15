import React, { useEffect, useState } from "react";
import classes from "./newReleases.module.css";
import apiClient from "../../spotify";
import { useDispatch } from "react-redux";
import { linkActions } from "../../redux/linkSlice";
import { authActions } from "../../redux/authSlice";

export default function NewReleases() {
  const [newReleases, setNewReleases] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    apiClient.get(`/browse/new-releases`).then((res) => {
      const a = res?.data?.albums?.items?.slice(0, 3);
      setNewReleases(a);
    });
  }, []);

  const linkHandler = (id, link) => {
    dispatch(linkActions.addAlbumLink(id));
    dispatch(linkActions.addLink(link));
    dispatch(authActions.toggleSearche(false));
  };

  return (
    <div className={classes.newReleases}>
      {newReleases?.map((newR) => (
        <div key={newR?.id} onClick={()=>{return linkHandler(newR.id,newR)}} title={newR?.name}>
          <img src={newR?.images[0]?.url} alt="" />
          <div>
            <p>{newR?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
