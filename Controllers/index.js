import { v1 as uuidv1 } from "uuid";
import mysql from "mysql";
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "police2020",
  database: "college",
});

export const readUsers = (req, res) => {
  con.query("SELECT * FROM newStudent", (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};

export const readSingleUser = (req, res) => {
  con.query(
    `SELECT * FROM newStudent WHERE id='${req.params.id}'`,
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
};

export const createUser = (req, res) => {
  let uuid = uuidv1();
  let newID = uuid.slice(0, 5);

  let newStudent = [];

  newStudent.push(
    newID,
    req.body.firstName,
    req.body.lastName,
    req.body.dateOfBirth
  );

  con.query("SHOW TABLES LIKE 'newStudent'", (err, result) => {
    if (err) console.error(err);

    if (result[0]) {
      console.log("Table already exists");
    } else {
      con.query(
        "CREATE TABLE IF NOT EXISTS newStudent(id VARCHAR(100), firstName VARCHAR(20), lastName VARCHAR(20), dateOfBirth DATE)",
        (err) => {
          if (err) console.error(err);
          console.log("tabble created");
        }
      );
    }
  });

  con.query(
    `INSERT INTO  newStudent(id, firstName, lastName, dateOfBirth) VALUES (?)`,
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
  console.log(req.params.id);

  let nameChangeQuery = `UPDATE newStudent SET firstname ='${req.body.firstName}' WHERE id='${req.params.id}'`;

  let surnameChangeQuery = `UPDATE newStudent SET lastName ='${req.body.lastName}' WHERE id='${req.params.id}'`;

  let dobChangeQuery = `UPDATE newStudent SET dateOfBirth ='${req.body.dateOfBirth}' WHERE id='${req.params.id}'`;

  if (req.body.firstName) {
    con.query(nameChangeQuery, (err, result) => {
      if (err) {
        console.error(err);
        res.send("Error");
      }
      console.log("First Name Changed");
    });
  }
  if (req.body.lastName) {
    con.query(surnameChangeQuery, (err, result) => {
      if (err) {
        res.send("Error");
        console.error(err);
      }
      console.log("Last Name changed");
    });
  }
  if (req.body.dateOfBirth) {
    con.query(dobChangeQuery, (err, result) => {
      if (err) {
        res.send("Error");
        console.error(err);
      }
      console.log("Date of birth changed");
    });
  }
  res.send(`Student details has been updated`);
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
