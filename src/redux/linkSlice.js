import { createSlice} from "@reduxjs/toolkit";

const linkSlice = createSlice({
     name: 'link',
     initialState:{
          albumLink: [],
          link:[],
          track:[],
          artistID: [1],
          albumTypeImg: [],
     },
     reducers:{
          addAlbumLink(state,action){
               state.albumLink.push(action.payload)
          },
          addLink(state,action){
               state.link.push(action.payload)
          },
          addTrack(state,action){
               state.track.push(action.payload)
          },
          addArtistID(state,action){
               state.artistID.push(action.payload)
          },
          addImg(state,action){
               state.albumTypeImg.push(action.payload)
          }
     }
})

export const linkActions = linkSlice.actions

export default linkSlice
