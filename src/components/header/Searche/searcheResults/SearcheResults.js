import { useEffect, useState } from "react";
import SearcheAlbums from "./SearcheAlbums"
import classes from "./SearcheResults.module.css"
import SearcheTopTrack from "./SearcheTopTrack"
import SearcheTracks from "./SearcheTracks"
import APIKit from "../../../../spotify";
import { useDispatch } from "react-redux";
import { authActions } from "../../../../redux/authSlice";

export default function SearcheResults({ searcheKey }) {
     const [trackResults, setTrackResults] = useState();
     const [topResult, setTopResult] = useState();
     const [albumResults, setAlbumResults] = useState();
     const dispatch = useDispatch();

     function filterAlbum(album) {
          let filteredAlbum = [];
          album.forEach(element => {
               if (element.total_tracks > 8) {
                    filteredAlbum.push(element)
               }
          });
          setAlbumResults(filteredAlbum.slice(0, 3))
     }

     useEffect(() => {
          APIKit.get(`/search?q=${searcheKey}&type=track,album&market=UZ`).then((res) => {
               if (res === undefined) {
                    return
               } else {
                    setTrackResults(res?.data.tracks.items.slice(0, 4))
                    setTopResult(res?.data.albums.items[0])
                    filterAlbum(res.data.albums.items.slice(1))
               }
          })
     }, [searcheKey])

     useEffect(() => {
          if (trackResults) {
               dispatch(authActions.toggleSearcheResults(true))
          } else (
               dispatch(authActions.toggleSearcheResults(false))
          )
     }, [trackResults])

     const searcheTracks = <div className={classes.trackResults}>
          {trackResults?.map((info) => (
               <SearcheTracks
                    key={info?.id}
                    id={info?.id}
                    image={info?.album.images[0].url}
                    name={info?.name}
                    artistName={info?.artists[0].name}
                    duration={info?.duration_ms}
               />))}
     </div>

     const searcheAlbums = <div className={classes.albumResults}>
          {albumResults?.map((info) => (
               <SearcheAlbums
                    key={info?.id}
                    id={info?.id}
                    image={info?.images[0].url}
                    name={info?.name}
               />))}
     </div>

     return (
          <div className={classes.results}>
               <div>
                    <h1>Top Result</h1>
                    <h1>Tracks</h1>
               </div>
               <div>
                    <SearcheTopTrack top={topResult} />
                    {searcheTracks}
               </div>

               <h1>Albums</h1>
               {searcheAlbums}

          </div>
     )
}
