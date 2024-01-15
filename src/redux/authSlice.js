import { createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
     name: 'auth',
     initialState:{
          showAlbum: false,
          showSearche: false,
          showSearcheResults: false,
          showMessage: false,
     },
     reducers:{
          toggleAlbum(state,action){
               state.showAlbum = action.payload;
          },
          toggleSearche(state,action){
               state.showSearche = action.payload
          },
          toggleSearcheResults(state,action){
               state.showSearcheResults = action.payload
          },
          toggleMessage(state,action){
               state.showMessage = action.payload
          }
     }
})

export const authActions = authSlice.actions

export default authSlice
