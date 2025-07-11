import { Router } from "express";
import { registerUser } from "../controllers/user_controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // or wherever you defined multer

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "aavatar", maxCount: 1 },
    { name: "coverImaage", maxCount: 1 },
  ]),
  registerUser
);

export default router;
