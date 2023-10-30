import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import songsSlice from "@/redux/slices/songsSlice";
import playerDialogSlice from "@/redux/slices/playerDialogSlice";

export const store = configureStore({
  reducer: {
    songsSlice,
    playerDialogSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
