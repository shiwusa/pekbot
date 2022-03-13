import mongoose from "mongoose";
import "./parrot.js";
import "./user.js";
import "./log.js";

export const User = mongoose.model("users");
export const Parrot = mongoose.model("parrots");
export const Log = mongoose.model("logs");

