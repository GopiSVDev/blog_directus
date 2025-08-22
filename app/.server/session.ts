import { createCookieSessionStorage } from "react-router";

type SessionData = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 900000,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"], // only for learning purpose
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
