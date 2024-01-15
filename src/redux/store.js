import { configureStore } from "@reduxjs/toolkit";

import linkSlice from "./linkSlice";
import authSlice from "./authSlice";
import playMusic from "./playMusic";


const store = configureStore({
     reducer:{
          link: linkSlice.reducer,
          auth: authSlice.reducer,
          player: playMusic.reducer
     },
          middleware: (getDefaultMiddleware) => getDefaultMiddleware({
               immutableCheck: false,
               serializableCheck: false,
             })
})

export default store