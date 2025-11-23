import { jokes, getNextId } from "../data/jokes.js";

export const getAllJokes = async (_req, res) => {
  res.status(200).json(jokes);
};

export const getJokeById = async (req, res) => {
  const requestId = req.params.id;
  let finalJoke;
  jokes.map((joke) => {
    if (joke.id === parseInt(requestId)) finalJoke = joke;
  });

  if (finalJoke) return res.status(200).json(finalJoke);
  res.status(404).json({ error: "Joke not found" });
};

export const getRandomJoke = async (_req, res) => {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  res.status(200).json(joke);
};

export const createJoke = async (req, res) => {
  const text = req.body.text;

  const newJoke = {
    id: getNextId(),
    joke: text,
  };

  jokes.push(newJoke);
  res.status(201).json(jokes);
};
