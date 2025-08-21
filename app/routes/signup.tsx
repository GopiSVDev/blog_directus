import { Form, redirect } from "react-router";
import type { Route } from "../+types/root";
import { register } from "~/.server/auth";

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();

  const first_name = formData.get("first_name")?.toString() || "";
  const last_name = formData.get("last_name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  try {
    await register({ first_name, last_name, email, password });
    return redirect("/login");
  } catch (error) {
    console.log(error);
  }
}

const Signup = ({ actionData }: Route.ComponentProps) => {
  return (
    <div>
      <h2>Signup</h2>
      <Form method="post">
        <div>
          <label>First Name</label>
          <input name="first_name" type="text" required />
        </div>

        <div>
          <label>Last Name</label>
          <input name="last_name" type="text" required />
        </div>

        <div>
          <label>Email</label>
          <input name="email" type="email" required />
        </div>

        <div>
          <label>Password</label>
          <input name="password" type="password" required />
        </div>

        <button type="submit">Signup</button>
      </Form>
    </div>
  );
};

export default Signup;
