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
  loop: boolean;
};

const initialState: SongsSliceInitialState = {
  queue: "",
  homeQueue: [],
  //   searchQueue: [],
  //   favoritesQueue: [],
  currentIndex: 0,
  isPlaying: false,
  loop: false,
};

export const songsSlice = createSlice({
  name: "songsSlice",
  initialState,
  reducers: {
    setHomeQueue: (state, action: PayloadAction<SongWithoutDate[]>) => {
      if (state.homeQueue.length === 0) {
        state.queue = "home";
        state.homeQueue.push(...action.payload);
      }
    },

    playPause: (
      state,
      action: PayloadAction<{ currentIndex: number; isPlaying: boolean }>,
    ) => {
      state.isPlaying = action.payload.isPlaying;
      state.currentIndex = action.payload.currentIndex;
    },

    playForward: (state) => {
      if (
        state.currentIndex >= 0 &&
        state.currentIndex < state.homeQueue.length - 1
      ) {
        state.currentIndex = state.currentIndex + 1;
      } else {
        state.currentIndex = 0;
      }
    },

    playBackward: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex = state.currentIndex - 1;
      } else {
        state.currentIndex = state.currentIndex + (state.homeQueue.length - 1);
      }
    },

    setLoopState: (state, action: PayloadAction<boolean>) => {
      state.loop = action.payload;
    },
  },
});

export const {
  setHomeQueue,
  playPause,
  playForward,
  playBackward,
  setLoopState,
} = songsSlice.actions;

export default songsSlice.reducer;
