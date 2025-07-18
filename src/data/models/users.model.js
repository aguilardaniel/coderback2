import { Schema, model, Types} from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    age: { type: Number },
    date: { type: Date },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://cdn-icons-png.flaticon.com/512/266/266033.png" },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PUBLIC"], index: true },
    isVerified: { type: Boolean, default: false },
    verifyCode: { type: String },
    user_id: { type: Types.ObjectId, ref: "carts"},
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
