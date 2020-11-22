require("dotenv").config();

const OpenTok = require("opentok");
const db = require("../../../db/connection");

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("You must specify API_KEY and API_SECRET environment variables");
  process.exit(1);
}

const opentok = new OpenTok(apiKey, apiSecret);

const userData = [
  {
    first_name: "Judith",
    job_title: "Computer Systems Analyst II",
    special_guest: true,
  },
  {
    first_name: "Sibel",
    job_title: "Environmental Tech",
    special_guest: false,
  },
  {
    first_name: "Vanni",
    job_title: "Nurse Practicioner",
    special_guest: false,
  },
  {
    first_name: "Rivalee",
    job_title: "Software Consultant",
    special_guest: false,
  },
  {
    first_name: "Ingmar",
    job_title: "Quality Engineer",
    special_guest: false,
  },
  {
    first_name: "Anthony",
    job_title: "Environmental Specialist",
    special_guest: false,
  },
  {
    first_name: "Rosalinda",
    job_title: "Project Manager",
    special_guest: true,
  },
  {
    first_name: "Shelba",
    job_title: "Accountant II",
    special_guest: true,
  },
  {
    first_name: "Oona",
    job_title: "Administrative Assistant II",
    special_guest: true,
  },
  {
    first_name: "Daisie",
    job_title: "Staff Accountant II",
    special_guest: false,
  },
];


export function post(req, res, next) {
  console.log(req.body);
  const thinkinName = req.body.name;
  const entryCode = req.body.code; // this will get replaced by the username or id that will be logged in the session
  console.log(thinkinName, entryCode);
  getThinkin(thinkinName).then((data) => {
    if (data) {
      const sessionId = data.session_id;
      const randomUserData = JSON.stringify(
        userData[Math.round(Math.random() * 10)]
      );

      let tokenOptions = { role: "subscriber" };
      if (data.moderator_code === entryCode) {
        tokenOptions = {
          role: "moderator",
          data: randomUserData,
        };
      } else if (data.publisher_code === entryCode) {
        tokenOptions = {
          role: "publisher",
          data: randomUserData,
        };
      }
      const token = opentok.generateToken(sessionId, tokenOptions);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send({
        apiKey,
        sessionId,
        token,
        userName: JSON.parse(randomUserData).first_name,
      });
    }
  });
}

function getThinkin(name) {
  return db
    .query("SELECT * FROM tortoise_sessions WHERE name=($1);", [name])
    .then((name) => name.rows[0])
    .catch((error) => error);
}
