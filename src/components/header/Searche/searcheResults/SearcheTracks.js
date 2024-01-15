import { useDispatch } from "react-redux";
import { PlayingAction } from "../../../../redux/playMusic";
import { linkActions } from "../../../../redux/linkSlice";
import APIKit from "../../../../spotify";

export default function SearcheTracks({
  id,
  image,
  name,
  artistName,
  duration,
}) {
  const dispatch = useDispatch();

  const ConvertedMin = duration / 1000 / 60;
  const ConvertedSec = (duration / 1000) % 60;
  const min = Math.trunc(ConvertedMin);
  const sec = Math.trunc(ConvertedSec);

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  const GetSearcheSong = (songId) => {
    APIKit.get(`/tracks/${songId}`).then((res) => {
      dispatch(linkActions.addLink(res.data.type));
      dispatch(PlayingAction.setQueue(res.data));
      dispatch(PlayingAction.setSongIndex(Math.floor(Math.random() * 100)));
    });
  };

  return (
    <div id={id} onClick={() => {GetSearcheSong(id);}} title={name}>
      <img src={image} alt="" />
      <div>
        <p>{name}</p>
        <p>{artistName}</p>
      </div>
      <p>{`${min}:${addZero(sec)}`}</p>
    </div>
  );
}
