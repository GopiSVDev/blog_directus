import { Outlet } from "react-router";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

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
