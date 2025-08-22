import { Link, useLoaderData } from "react-router";

const Navbar = () => {
  const { loggedIn } = useLoaderData();

  console.log(loggedIn);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <div>
        <Link to="/">Logo</Link>
      </div>

      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
        {loggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {" | "}
            <Link to="/dashboard/create">Create</Link>
            {" | "}
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            {" | "}
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
