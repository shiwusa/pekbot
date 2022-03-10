import mongoose from "mongoose";
import "./parrot";
import "./user";

export const User = mongoose.model("users");
export const Parrot = mongoose.model("parrots");

