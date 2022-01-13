const Movies = require("../models/movies");
const axios = require("axios");

const logger = require("../services/loggerServices");

const {
  response_created,
  response_success,
  response_internal_server_error,
  response_not_found,
} = require("../middlewares/responseHandlers");

const urls = "http://www.omdbapi.com/";

// Get Movie Title
const GetMovieTitle = async (req, res) => {
  try {
    // Getting movie title from params
    const title = req.params.title; // Should be use + for the space
    logger.http(`GET /movies/${title} Route is accessed`);

    // Get movie data from urls
    logger.http(`GET ${urls} data`);
    const { data } = await axios.get(urls, {
      params: {
        apikey: process.env.API_KEY,
        t: title,
      },
    });

    // Checking if data exists or data poster is not available
    if (data.Response == "False" || data.Poster == "N/A") {
      logger.error(`Movie Title or Movie Poster Not Found`);
      return response_not_found(res, data.Error);
    }

    logger.info("Successfully Get Movie Poster URL");
    return response_success(res, { poster_url: data.Poster });
  } catch (error) {
    logger.error(`Internal Server Error: ${error}`);
    return response_internal_server_error(res, error.message);
  }
};

// Getting All User's Favorite Movie
const GetUserFav = async (req, res) => {
  try {
    // Getting user id from request body
    logger.http("GET /movies/favorite Route is accessed");
    const { user_id } = req.body;

    // Getting all user's favorite movie from DB
    const movie_title = await Movies.findAll({
      attributes: ["title"],
      where: {
        user_id: user_id,
      },
    });

    // Get movie data from urls
    const poster_url = [];
    for (let i = 0; i < movie_title.length; i++) {
      title_url = movie_title[i].dataValues.title.split(" ").join("+");
      logger.http(`GET ${urls} data`);

      const { data } = await axios.get(urls, {
        params: {
          apikey: process.env.API_KEY,
          t: title_url,
        },
      });
      poster_url.push(data.Poster);
    }

    logger.info("Successfully Get User's Favorite Movie Poster URL");
    return response_success(res, { posters: poster_url });
  } catch (error) {
    logger.error(`Internal Server Error: ${error}`);
    return response_internal_server_error(res, error.message);
  }
};

// Adding User's Favorite Movie Function
const AddFavMovie = async (req, res) => {
  try {
    // Getting user id and movie title from request body
    logger.http("POST /movies/favorite Route is accessed");
    const { user_id, title } = req.body;

    // Store favorite movie to DB
    await Movies.create({
      title: title,
      user_id: user_id,
    });

    // Get movie data from urls
    const title_url = title.split(" ").join("+");
    console.log(title);

    logger.http(`GET ${urls} data`);
    const { data } = await axios.get(urls, {
      params: {
        apikey: process.env.API_KEY,
        t: title_url,
      },
    });

    // Checking if data exists or data poster is not available
    if (data.Response == "False" || data.Poster == "N/A") {
      logger.error(`Movie Title or Movie Poster Not Found`);
      return response_not_found(res, data.Error);
    }

    res.cookie("session_id", user_id, { httpOnly: true, maxAge: 60000 }); // Set cookie lifespan 1 minute

    logger.info("Successfully Store User's Favorite Movie To DB");
    return response_created(res, { poster_url: data.Poster });
  } catch (error) {
    logger.error(`Internal Server Error: ${error}`);
    return response_internal_server_error(res, error.message);
  }
};

module.exports = {
  GetMovieTitle,
  GetUserFav,
  AddFavMovie,
};
