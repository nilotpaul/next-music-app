import { createSlice } from "@reduxjs/toolkit";

export type ArtistModalInitialState = typeof initialState;

export const initialState = {
  isOpen: false,
};

export const artistModalSlice = createSlice({
  name: "artistModalSlice",
  initialState,
  reducers: {
    setArtistModalOpen: (state) => {
      state.isOpen = true;
    },

    setArtistModalClose: () => {
      initialState;
    },
  },
});

export const { setArtistModalOpen, setArtistModalClose } =
  artistModalSlice.actions;

export default artistModalSlice.reducer;
