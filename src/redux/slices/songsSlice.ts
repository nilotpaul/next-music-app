import { Song } from "@/types/songs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SongsSliceInitialState = {
  queue: "home" | "search" | "favorites" | "";
  homeQueue: Song[];
  // searchQueue:
  // favoritesQueue:,
  currentIndex: number;
  isPlaying: boolean;
};

const initialState: SongsSliceInitialState = {
  queue: "",
  homeQueue: [],
  //   searchQueue: [],
  //   favoritesQueue: [],
  currentIndex: 0,
  isPlaying: false,
};

export const songsSlice = createSlice({
  name: "songsSlice",
  initialState,
  reducers: {
    setHomeQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = "home";
      state.homeQueue.push(...action.payload);
    },

    playPause: (
      state,
      action: PayloadAction<{ currentIndex: number; isPlaying: boolean }>,
    ) => {
      state.currentIndex = action.payload.currentIndex;
      state.isPlaying = action.payload.isPlaying;
    },
  },
});

export const { setHomeQueue, playPause } = songsSlice.actions;

export default songsSlice.reducer;
