import { Form } from "react-router";

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
