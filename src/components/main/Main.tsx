import { Session } from "next-auth";

import TopHeader from "./TopHeader";
import { Card, CardHeader } from "../ui/card";

type MainPageProps = {
  session: Session | null;
};

const Main = ({ session }: MainPageProps) => {
  return (
    <Card className="h-full rounded-none bg-background from-muted to-background md:rounded-lg md:bg-gradient-to-b">
      <CardHeader className="pt-4">
        <TopHeader session={session} />
      </CardHeader>
    </Card>
  );
};

export default Main;
