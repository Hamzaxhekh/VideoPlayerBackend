import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logOutHandler,
  refreshTokenHandler,
  registerUser,
  updateAccountDetails,
  updateUserAvatr,
  updateUserCoverImage,
} from "../controllers/user_controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // or wherever you defined multer
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "aavatar", maxCount: 1 },
    { name: "coverImaage", maxCount: 1 },
  ]),
  registerUser
);
router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJwt, logOutHandler);
router.route("/refresh-token").post(refreshTokenHandler);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/getCurrentUser").post(verifyJwt, getCurrentUser);
router.route("/updateAccountDetails").patch(verifyJwt, updateAccountDetails);
router
  .route("/updateUserAvatr")
  .patch(verifyJwt, upload.single("avatar"), updateUserAvatr);
router
  .route("/cover-image")
  .patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage);
router.route("/getUserChannelProfile").get(verifyJwt, getUserChannelProfile);
router.route("/getWatchHistory").get(verifyJwt, getWatchHistory);

export default router;
