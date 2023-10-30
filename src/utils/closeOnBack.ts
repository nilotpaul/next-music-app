import { closeDialog } from "@/redux/slices/playerDialogSlice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export default function closeOnBack(
  name: string,
  dispatch: Dispatch<AnyAction>,
  dialogs: string[],
) {
  if (!dialogs.includes(name)) return;

  const onBackPressed = (e: PopStateEvent) => {
    e.preventDefault();

    dispatch(closeDialog(name));
  };

  window.addEventListener("popstate", onBackPressed);

  return () => window.removeEventListener("popstate", onBackPressed);
}
