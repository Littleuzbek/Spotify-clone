import React, { useEffect, useState } from "react";
import classes from "./aboutArtist.module.css";
import APIKit from "../../spotify";

export default function AboutArtist({ artistID }) {
  const [img, setImg] = useState();
  const [followers, setFollowers] = useState();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  function test(x) {
    const result = numberWithCommas(x);
    setFollowers(result);
  }

  useEffect(() => {
    if (!artistID) {
      return;
    } else {
      APIKit.get(`/artists/${artistID}`).then((res) => {
        setImg(res.data.images[0].url);
        test(res.data.followers.total);
      });
    }
  }, [artistID]);

  if (img) {  
    return (
      <div className={classes.aboutArtist}>
        <img src={img} alt="" />
        <div className={classes.layer}></div>
        <div className={classes.SomeText}>
          <p>{followers} followers</p>
        </div>
      </div>
    );
  }
}
