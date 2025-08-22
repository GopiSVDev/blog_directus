import { Form, redirect } from "react-router";
import type { Route } from "../+types/root";
import { login } from "~/.server/auth";
import { commitSession, destroySession, getSession } from "~/.server/session";
import type { AuthenticationData } from "@directus/sdk";
import { authClient } from "~/.server/directus";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken") as string | undefined;
  const refreshToken = session.get("refreshToken") as string | undefined;
  const expiresAt = session.get("expiresAt") as number | undefined;

  if (accessToken && refreshToken && expiresAt && Date.now() < expiresAt) {
    return redirect("/dashboard");
  }

  authClient.setToken(accessToken ?? "");

  if (accessToken && refreshToken && (!expiresAt || Date.now() > expiresAt)) {
    try {
      const refreshed = await authClient.refresh({
        refresh_token: refreshToken,
      });

      const { refresh_token, access_token, expires_at } = refreshed;

      session.set("accessToken", access_token ?? "");
      session.set("refreshToken", refresh_token ?? "");
      session.set("expiresAt", expires_at ?? 0);

      return new Response(null, {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    } catch (error) {
      return redirect("/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }
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
