import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";

type SongTitleMenuProps = {
  children: React.ReactNode;
};

const SongTitleMenu = ({ children }: SongTitleMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="absolute -top-20 w-48 rounded-lg">
        <ContextMenuItem className="rounded-md py-2">
          Add to playlist
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger className="rounded-md py-2">
            More Tools
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48 -translate-y-3/4 rounded-lg">
            <ContextMenuItem className="rounded-md py-2">
              select
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default SongTitleMenu;
