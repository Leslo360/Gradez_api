import { v1 as uuidv1 } from "uuid";
import mysql from "mysql";
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "police2020",
  database: "capstore",
});

export const readAdmins = (req, res) => {
  con.query("SELECT * FROM administrators", (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};

export const readSingleAdmin = (req, res) => {
  con.query(
    `SELECT * FROM administrators WHERE id='${req.params.id}'`,
    (err, result) => {
      if (err) console.log(err);
      res.send({ result });
    }
  );
};

export const createAdmin = (req, res) => {
  let uuid = uuidv1();
  let newID = uuid.slice(0, 5);

  let newAdmin = [];

  newAdmin.push(
    newID,
    req.body.firstName,
    req.body.lastName,
    req.body.username,
    req.body.passcode
  );

  con.query("SHOW TABLES LIKE 'administrators'", (err, result) => {
    if (err) console.error(err);

    if (result[0]) {
      console.log("Table already exists");
    } else {
      con.query(
        "CREATE TABLE IF NOT EXISTS administrators(id VARCHAR(100), firstName VARCHAR(20), lastName VARCHAR(20), username VARCHAR(15) UNIQUE, passcode VARCHAR(20) UNIQUE)",
        (err) => {
          if (err) console.error(err);
          console.log("tabble created");
          res.send("could only create table");
        }
      );
    }
  });

  con.query(
    `INSERT INTO  administrators(id, firstName, lastName, username, passcode) VALUES (?)`,
    [newAdmin],
    (err, result) => {
      if (err) {
        console.error(err.sqlMessage);
        if (err.sqlMessage.includes("Duplicate entry")) {
          console.log("User Already exists ");
          res.send("User Already exists ");
        }
      } else {
        res.send("User created successfuly");
      }
      console.log(result);
    }
  );
};

export const loginAdmin = (req, res) => {
  console.log(req.body);
  con.query(
    `SELECT * FROM administrators WHERE username='${req.body.username}'`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.send("Error");
      }
      let enteredPass = req.body.passcode;

      result.map((user) => {
        if (enteredPass === user.passcode) {
          res.send(user.id);
          console.log("Logged In");
        } else {
          res.send("Wrong credentials");
          console.log("Not Logged In");
        }
      });
    }
  );
};
