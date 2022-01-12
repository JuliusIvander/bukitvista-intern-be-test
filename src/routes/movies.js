const { Router } = require("express");
const { response_forbidden } = require("../middlewares/responseHandlers");
const {
  GetMovieTitle,
  GetUserFav,
  AddFavMovie,
} = require("../controllers/movieControllers");

const router = Router();

router.get("", (_, res) => {
  return response_forbidden(res, "FORBIDDEN!");
});
router.post("/favorite", AddFavMovie);
router.get("/favorite", GetUserFav);
router.get("/:title", GetMovieTitle);

module.exports = router;
