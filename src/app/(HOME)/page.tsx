import { userSession } from "@/utils/userSession";

export default async function Home() {
  const session = await userSession();
  // console.log(session);
  return <div>Home</div>;
}
