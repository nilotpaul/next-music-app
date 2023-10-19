import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

type PlaylistTitleMenuProps = {
  children: React.ReactNode;
};

const PlaylistTitleMenu = ({ children }: PlaylistTitleMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="absolute -top-16 w-48 rounded-lg">
        <ContextMenuItem className="rounded-md py-2 font-semibold text-destructive">
          Delete Playlist
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PlaylistTitleMenu;
