import { Song } from "@/types/songs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SongWithoutDate = Omit<Song, "userId" | "createdAt" | "updatedAt">;

export type SongsSliceInitialState = {
  queue: "home" | "search" | "favorites" | "";
  homeQueue: SongWithoutDate[];
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
    setHomeQueue: (state, action: PayloadAction<SongWithoutDate[]>) => {
      if (state.homeQueue.length === 0) {
        state.queue = "home";
        state.homeQueue.push(...action.payload);
        state.isPlaying = true;
      }
    },

    playPause: (
      state,
      action: PayloadAction<{ currentIndex: number; isPlaying?: boolean }>,
    ) => {
      if (state.currentIndex === action.payload.currentIndex) {
        state.isPlaying = !state.isPlaying;
      }
      state.currentIndex = action.payload.currentIndex;
    },
  },
});

export const { setHomeQueue, playPause } = songsSlice.actions;

export default songsSlice.reducer;
