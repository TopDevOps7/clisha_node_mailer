const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const app = express();
const router = require("express").Router();
app.use(morgan("dev"));
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// app.use("/sendMail", router.get("/", async (req, res) => {
//     res.sendStatus(200).end()
// }));
app.use(
  "/sendMail",
  router.post("/", async (req, res) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        // host: "mail.broker.cloud",
        // port: 587,
        secure: false,
        auth: {
          // user: 'no-repy@broker.cloud',
          // pass: "hviatecr77"
          user: "vladislav.ivanilov2019@gmail.com",
          pass: "star_dragon_911218885",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      await transporter.sendMail({
        from: req.body.email,
        to: "yelizavetarudneva@mail.ru",
        subject: "Mail Sent",
        template: "welcome",
        context: {
          email: req.body.email,
        },
      });
      res.json(req.body.email);
    } catch (e) {
      console.log("error while sending email: ", e);
    }
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = process.env.PORT || 4000;
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
