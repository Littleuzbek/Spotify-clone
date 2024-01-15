import { createSlice } from "@reduxjs/toolkit";

const playMusic = createSlice({
     name: 'player',
     initialState: {
          volume: [],
          queueStore: [],
          songIndex: [],
          searcheSong: [],
     },
     reducers: {
          setVolume(state,action){
               state.volume = action.payload
          },
          setQueue(state,action){
               state.queueStore = action.payload
          },
          setSongIndex(state,action){
               state.songIndex = action.payload
          },
          setSearcheSong(state,action){
               state.searcheSong = action.payload
          },
     }
})

export const PlayingAction = playMusic.actions;

export default playMusic