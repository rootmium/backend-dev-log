import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("./dev.db");

const insertJoke = db.prepare("INSERT INTO Joke (text) VALUES (?)");
insertJoke.run("What’s a programmer’s favorite hangout place? The Foo Bar.");

const sql = db.createTagStore();

 const all = sql.all`SELECT * FROM Joke`;
// console.log(all);

// const joke = sql.get`SELECT text FROM Joke WHERE id = 8`;
// console.log(joke.text);

const totalJokes = sql.get`SELECT COUNT(*) FROM Joke`;
console.log(totalJokes);
