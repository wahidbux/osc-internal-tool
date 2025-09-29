import { Router } from "express";
import passport from "passport";

export const userRouter = Router();

userRouter.get(
  "/oauth/github",
  passport.authenticate("github", { scope: ["user", "repo"] })
);

userRouter.get(
  "/oauth/redirect/github",
  passport.authenticate("github", {
    failureRedirect:
      process.env.FRONTEND_URL_FAIL || "http://localhost:5173/auth/error",
    successRedirect:
      process.env.FRONTEND_URL_SUCCESS || "http://localhost:5173",
  })
);
userRouter.get("/is-authenticated", (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});
