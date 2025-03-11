import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

interface IUser {
  id: string;
  username: string;
  password: string;
}

let mockUser: IUser = {
  id: "1",
  username: "admin",
  password: bcrypt.hashSync("mockUserPassword", 5),
};

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    (
      username: string,
      password: string,
      done: (error: any, user?: any, options?: any) => void
    ) => {
      if (username !== mockUser.username) {
        return done(null, false, { message: "Неверное имя пользователя" });
      }
      bcrypt.compare(password, mockUser.password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          return done(null, mockUser);
        } else {
          return done(null, false, { message: "Неверный пароль" });
        }
      });
    }
  )
);

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JWTStrategy(
    opts,
    (
      jwt_payload: any,
      done: (error: any, user?: any, options?: any) => void
    ) => {
      if (jwt_payload.id === mockUser.id) {
        return done(null, mockUser);
      } else {
        return done(null, false);
      }
    }
  )
);

app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: mockUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    res.json({ token });
  }
);

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "Доступ к защищенному маршруту разрешен",
      user: req.user,
    });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
