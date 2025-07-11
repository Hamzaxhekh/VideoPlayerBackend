import { asyncHandler } from "../utills/asyncHaandler.js";
import { ApiError } from "../utills/ApiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utills/Cloudinary.js";
import { ApiResponse } from "../utills/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  // ✅ Basic validation
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // ✅ Check if user exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // ✅ Get file paths
  const avatarLocalPath = req?.files?.aavatar?.[0]?.path;
  const coverImageLocalPath = req?.files?.coverImaage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // ✅ Upload to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  // ✅ Create user
  const user = await User.create({
    fullName,
    avatar: avatar.url, // ✅ corrected
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(), // ✅ assuming it's not undefined
  });

  // ✅ Select user (excluding sensitive fields)
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(400, "Something went wrong while registering user");
  }

  // ✅ Send response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
