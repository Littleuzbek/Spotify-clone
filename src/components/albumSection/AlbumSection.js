import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/authSlice";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import AlbumInfo from "./AlbumInfo";
import Definition from "./musicListIndex/definition";
import { PlayingAction } from "../../redux/playMusic";
import APIKit from "../../spotify";
import classes from "./albumSection.module.css";

const AlbumItems = lazy(() => import("./AlbumItems"));

export default function AlbumSection() {
  const [album, setAlbum] = useState();
  const [img, setImg] = useState("");
  const storedSongIndex = useSelector((state) => state.player.songIndex);
  const albumInfos = useSelector((state) => state.link.link);
  const AlbumLink = useSelector((state) => state.link.albumLink);
  const dispatch = useDispatch();

  useEffect(() => {
    if (albumInfos?.at(-1).type === "album") { 
      APIKit.get(`/albums/${AlbumLink.at(-1)}`).then((res) => {
        setAlbum(res.data.tracks.items); 
        setImg(res.data.images); 
      });
    } else if (albumInfos?.at(-1).type === "playlist") { 
      APIKit.get(`/playlists/${AlbumLink.at(-1)}/tracks`).then((res) => {
        setAlbum(res.data.items); 
        setImg(false); 
      });
    } else {
      setAlbum(""); 
    }// eslint-disable-next-line
  }, [AlbumLink]); 

  let [background, setBackground] = useState(false);

  let element = document.getElementById("scroll");

  const backgroundHandler = () => {
    let heightOfElement = element.scrollTop;
    if (heightOfElement >= 260) {
      setBackground(true);
    } else if (heightOfElement < 260) {
      setBackground(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    dispatch(PlayingAction.setQueue(""));
    dispatch(PlayingAction.setQueue(album)); // eslint-disable-next-line
  }, [storedSongIndex]); 

  return (
    <div
      className={classes.albumSection}
      onScroll={backgroundHandler}
      id="scroll"
    >
      <div>
        <IoChevronBackCircleSharp
          className={classes.backBtn}
          onClick={() => {
            dispatch(authActions.toggleAlbum(false));
          }}
        />
      </div>
      <AlbumInfo />
      <Definition background={background} album={img} />
      {album &&
        album?.map((tracks, index) => (
          <Suspense key={tracks?.track?.id} fallback={<h1>Loading...</h1>}>
            <AlbumItems
              key={tracks?.track?.id ? tracks?.track?.id : tracks?.id}
              id={tracks?.track?.id ? tracks?.track?.id : tracks?.id}
              name={tracks?.track?.name ? tracks?.track?.name : tracks?.name}
              singer={
                tracks?.track?.artists[0].name
                  ? tracks?.track?.artists[0].name
                  : tracks?.artists[0].name
              }
              album={tracks?.track?.album.name}
              duration={
                tracks?.track?.duration_ms
                  ? tracks?.track?.duration_ms
                  : tracks?.duration_ms
              }
              songNumber={index}
              image={
                tracks?.track?.album.images[0].url
                  ? tracks?.track?.album.images[0].url
                  : img[0].url
              }
            />
          </Suspense>
        ))}
    </div>
  );
}
