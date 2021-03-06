import { v1 as uuidv1 } from "uuid";
import mysql from "mysql";
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "police2020",
  database: "capstore",
});

export const readUsers = (req, res) => {
  con.query("SELECT * FROM students", (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};

export const readSingleUser = (req, res) => {
  con.query(
    `SELECT * FROM students WHERE id='${req.params.id}'`,
    (err, result) => {
      if (err) console.log(err);
      res.send({ result });
    }
  );
};

export const createUser = (req, res) => {
  let uuid = uuidv1();
  let newID = uuid.slice(0, 5);

  let newStudent = [];
  let enrolmentStatus = "pending";

  newStudent.push(
    newID,
    req.body.firstName,
    req.body.lastName,
    req.body.dateOfBirth,
    req.body.username,
    req.body.passcode,
    enrolmentStatus
  );

  con.query("SHOW TABLES LIKE 'students'", (err, result) => {
    if (err) console.error(err);

    if (result[0]) {
      console.log("Table already exists");
    } else {
      con.query(
        "CREATE TABLE IF NOT EXISTS students(id VARCHAR(100), firstName VARCHAR(20), lastName VARCHAR(20), dateOfBirth DATE, username VARCHAR(15) UNIQUE, passcode VARCHAR(20) UNIQUE, enrolmentStatus VARCHAR(20))",
        (err) => {
          if (err) console.error(err);
          console.log("tabble created");
          res.send("could only create table");
        }
      );
    }
  });

  con.query(
    `INSERT INTO  students(id, firstName, lastName, dateOfBirth, username, passcode, enrolmentStatus) VALUES (?)`,
    [newStudent],
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

export const updateUser = (req, res) => {
  console.log(req.params.username);

  let statusChange = `UPDATE students SET enrolmentStatus='${req.body.enrolmentStatus}' WHERE username='${req.params.username}'`;

  con.query(statusChange, (err, result) => {
    if (err) {
      res.send("Error");
      console.error(err);
    }
    console.log("Status changed");

    res.send(`Student details has been updated`);
  });
};

export const deleteUser = (req, res) => {
  con.query(
    `DELETE FROM newStudent WHERE id='${req.params.id}'`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.send("Error");
      }
      res.send("User deleted");
      console.log("User deleted");
    }
  );
};

export const login = (req, res) => {
  console.log(req.body);
  con.query(
    `SELECT * FROM students WHERE username='${req.body.username}'`,
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

