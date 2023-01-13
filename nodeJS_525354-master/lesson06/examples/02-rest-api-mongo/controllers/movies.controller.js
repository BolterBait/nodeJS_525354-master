// const db = require("../db/db.js");
const { HttpError } = require("../helpers/index.js");
// const Joi = require("joi");
const { Movie } = require("../models/movie");

async function getMovies(req, res) {
  const { limit } = req.query;
  // console.log("limit:", limit);
  const movies = await Movie.find({});
  res.json(movies);
}

async function getMovie(req, res, next) {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    return next(HttpError(404, "Movie not found"));
  }
  return res.json(movie);
}

async function createMovie(req, res, next) {
  const { title } = req.body;
  const newMovie = await Movie.create({ title, });
  res.status(201).json(newMovie);
}

async function deleteMovie(req, res, next) {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (!movie) {
    return next(HttpError(404, "No movie"));
  }
  await Movie.findByIdAndRemove(id);
  return res.status(200).json(movie);
}

module.exports = {
  getMovie,
  getMovies,
  createMovie,
  deleteMovie,
};
