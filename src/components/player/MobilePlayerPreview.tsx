import { useAppDispatch } from "@/redux/store";
import { openDialog } from "@/redux/slices/PlayerDialogSlice";
import { usePathname, useRouter } from "next/navigation";

const MobilePlayerPreview = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      onClick={() => {
        dispatch(openDialog("player"));
        router.push(pathname + "#player");
      }}
      className="fixed bottom-20 left-1/2 z-[80] w-[95%] -translate-x-1/2 rounded-lg bg-zinc-950 p-3"
    >
      <div>preview</div>
    </div>
  );
};

export default MobilePlayerPreview;
