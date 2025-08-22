import { Outlet } from "react-router";
import { getUserSession } from "~/.server/session";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import type { Route } from "../+types/root";

export async function loader({ request }: Route.LoaderArgs) {
  const { loggedIn } = await getUserSession(request);
  return { loggedIn };
}

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
