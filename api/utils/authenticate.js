import Account from "../models/account.js";
import bcrypt from "bcrypt";

export const authenticate = async (req, res, next) => {
  const base64Auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [email, password] = Buffer.from(base64Auth, "base64")
    .toString()
    .split(":");

  if (email && password) {
    const account = await Account.findOne({ where: { email } });
    if (account && (await bcrypt.compare(password, account.password))) {
      req.user = { email, AccountId: account.id };
      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
          "X-Requested-With, Content-Type, Accept, Origin",
        expires: "-1",
      });
      return next();
    }
  }

  if (!email || !password) res.set("WWW-Authenticate", 'Basic realm="401"');
  res.status(401).send("Authentication required.");
};
