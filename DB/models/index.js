import mongoose from "mongoose";
import "./parrot.js";
import "./user.js";

export const User = mongoose.model("users");
export const Parrot = mongoose.model("parrots");

