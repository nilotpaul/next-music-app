import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = { dialogs: string[] };

const initialState: InitialState = {
  dialogs: [],
};

export const playerDialogSlice = createSlice({
  name: "playerDialogSlice",
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<string>) => {
      state.dialogs.push(action.payload);
    },
    closeDialog: (state, action: PayloadAction<string>) => {
      if (state.dialogs.includes(action.payload)) {
        const newDialog = state.dialogs.filter(
          (item) => item !== action.payload,
        );

        state.dialogs = newDialog;
      }
    },
  },
});

export const { closeDialog, openDialog } = playerDialogSlice.actions;

export default playerDialogSlice.reducer;
