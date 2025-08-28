import { Outlet } from "react-router";
import { getUserSession } from "~/.server/session";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import type { Route } from "../+types/root";
import { Container } from "@mantine/core";

export async function loader({ request }: Route.LoaderArgs) {
  const { loggedIn } = await getUserSession(request);
  return { loggedIn };
}

const MainLayout = () => {
  return (
    <Container size="1440px">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default MainLayout;
