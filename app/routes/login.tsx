import { Form, redirect } from "react-router";
import type { Route } from "../+types/root";
import { login } from "~/.server/auth";
import { commitSession, getSession, getUserSession } from "~/.server/session";
import type { AuthenticationData } from "@directus/sdk";

export async function loader({ request }: Route.LoaderArgs) {
  const { loggedIn, headers } = await getUserSession(request);

  if (loggedIn) {
    return redirect("/dashboard", headers);
  }

  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  try {
    const data: AuthenticationData = await login({ email, password });
    const session = await getSession(request.headers.get("Cookie"));

    const { refresh_token, access_token, expires_at } = data;

    session.set("accessToken", access_token ?? "");
    session.set("refreshToken", refresh_token ?? "");
    session.set("expiresAt", expires_at ?? 0);

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Action failed");
    }

    throw new Error("Action failed");
  }
}

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
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
