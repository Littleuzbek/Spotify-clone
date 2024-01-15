import React, { useEffect, useState,lazy,Suspense } from "react";
import classes from "./albumSection.module.css";
import AlbumInfo from "./AlbumInfo";
// import AlbumItems from "./AlbumItems"
import { useDispatch, useSelector } from "react-redux";
import APIKit from "../../spotify";
import { authActions } from "../../redux/authSlice";
import Definition from "./musicListIndex/definition";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { PlayingAction } from "../../redux/playMusic";

const AlbumItems = lazy(()=>import('./AlbumItems'))

export default function AlbumSection() {
  const [album, setAlbum] = useState();
  const [img, setImg] = useState("");
  const storedSongIndex = useSelector(state => state.player.songIndex);
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
        setImg(false)
      });
    } else {
      setAlbum("");
    }
  }, [AlbumLink]);
  
  let albumItems;

  if (album) {
    if (albumInfos?.at(-1).type === "album") {
      albumItems = album?.map((tracks, index) => (
        <Suspense key={tracks?.id} fallback={<h1>Loading...</h1>}>
          <AlbumItems
            key={tracks?.id}
            id={tracks?.id}
            name={tracks?.name}
            singer={tracks?.artists[0].name}
            duration={tracks?.duration_ms}
            songNumber={index}
            image={img[0].url}
          />
          </Suspense>
      ));
    } else if (albumInfos?.at(-1).type === "playlist") {
      albumItems = album?.map((tracks, index) => (
        <Suspense key={tracks?.track?.id} fallback={<h1>Loading...</h1>}>
        <AlbumItems
            key={tracks?.track?.id}
            id={tracks?.track?.id}
            name={tracks?.track?.name}
            singer={tracks?.track?.artists[0].name}
            album={tracks?.track?.album.name}
            duration={tracks?.track?.duration_ms}
            songNumber={index}
            image={tracks?.track?.album.images[0].url}
          />
          </Suspense>
      ));
    }
  }

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
      dispatch(PlayingAction.setQueue(''));
      dispatch(PlayingAction.setQueue(album));
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
      {albumItems}
    </div>
  );
}
