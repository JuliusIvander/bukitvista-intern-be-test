const Movies = require("../models/movies");
const axios = require("axios");

const {
  response_created,
  response_success,
  response_internal_server_error,
  response_not_found,
} = require("../middlewares/responseHandlers");

const urls = "http://www.omdbapi.com/";

const GetMovieTitle = async (req, res) => {
  try {
    const title = req.params.title; // Should be use + for the space
    const { data } = await axios.get(urls, {
      params: {
        apikey: process.env.API_KEY,
        t: title,
      },
    });

    if (data.Response == "False" || data.Poster == "N/A") {
      return response_not_found(res, data.Error);
    }

    return response_success(res, { poster_url: data.Poster });
  } catch (error) {
    return response_internal_server_error(res, error.message);
  }
};

const GetUserFav = async (req, res) => {
  try {
    const { user_id } = req.body;

    // Getting User's Favorite Movie
    const movie_title = await Movies.findAll({
      attributes: ["title"],
      where: {
        user_id: user_id,
      },
    });

    // Getting Movie Poster URL
    const poster_url = [];
    for (let i = 0; i < movie_title.length; i++) {
      title_url = movie_title[i].dataValues.title.split(" ").join("+");
      const { data } = await axios.get(urls, {
        params: {
          apikey: process.env.API_KEY,
          t: title_url,
        },
      });
      poster_url.push(data.Poster);
    }
    return response_success(res, { posters: poster_url });
  } catch (error) {
    return response_internal_server_error(res, error.message);
  }
};

const AddFavMovie = async (req, res) => {
  try {
    const { user_id, title } = req.body;

    await Movies.create({
      title: title,
      user_id: user_id,
    });

    const title_url = title.split(" ").join("+");
    console.log(title);
    const { data } = await axios.get(urls, {
      params: {
        apikey: process.env.API_KEY,
        t: title_url,
      },
    });

    if (data.Response == "False" || data.Poster == "N/A") {
      return response_not_found(res, data.Error);
    }

    res.cookie("session_id", user_id, { httpOnly: true, maxAge: 60000 }); // Set cookie lifespan 1 minute

    return response_created(res, { poster_url: data.Poster });
  } catch (error) {
    return response_internal_server_error(res, error.message);
  }
};

module.exports = {
  GetMovieTitle,
  GetUserFav,
  AddFavMovie,
};
