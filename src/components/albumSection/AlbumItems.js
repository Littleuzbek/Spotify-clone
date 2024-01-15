import { useDispatch } from "react-redux";
import classes from "./albumItems.module.css";
import { PlayingAction } from "../../redux/playMusic";
import { linkActions } from "../../redux/linkSlice";

export default function AlbumItems({
  id,
  album,
  name,
  duration,
  singer,
  songNumber,
  image,
}) {
  const ConvertedMin = duration / 1000 / 60;
  const ConvertedSec = (duration / 1000) % 60;
  const min = Math.trunc(ConvertedMin);
  const sec = Math.trunc(ConvertedSec);

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  const time = `${min}:${addZero(sec)}`;

  const dispatch = useDispatch();
  const GetMusic = (songNumber,image) => {
    dispatch(PlayingAction.setSongIndex(songNumber));
    dispatch(linkActions.addImg(image));
  };

  return (
    <div className={classes.itemList}  title={name}>
      <div
        className={classes.items}
        id={id}
        onClick={() => {
          GetMusic(songNumber, image);
        }}
      >
        <div className={classes.index}>
          <p>{songNumber + 1}</p>
        </div>
        <div className={classes.img}>
          <img src={image} alt="" />
        </div>
        <div className={classes.singerName}>
          <p>{name}</p>
          <p>{singer}</p>
        </div>
        <div className={classes.albumName}>
          <p>{album ? album : ""}</p>
        </div>
        <div className={classes.songTime}>
          <p>{sec ? time : ""}</p>
        </div>
      </div>
    </div>
  );
}
