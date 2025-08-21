import { Form, redirect } from "react-router";
import type { Route } from "../+types/root";
import { login } from "~/.server/auth";
import { commitSession, getSession } from "~/.server/session";

export async function loader({ request }: Route.LoaderArgs) {
    
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  try {
    const data = await login({ email, password });
    const { access_token, refresh_token, expires } = data;

    const session = await getSession();
    session.set("accessToken", access_token);
    session.set("refreshToken", refresh_token);

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    const message =
      error.response?.data?.errors?.[0]?.message || "Login failed";

    const session = await getSession();
    session.flash("error", message);

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form method="post">
        <div>
          <label>Email</label>
          <input name="email" type="email" required />
        </div>

        <div>
          <label>Password</label>
          <input name="password" type="password" required />
        </div>

        <button type="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;
