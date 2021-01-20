import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// I dont know why but arrow function does not work here.
// so use es5 function defn here
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(enteredPassword);
  // compares user entered password with the User instance's password and return boolean
  return await bcrypt.compare(enteredPassword, this.password);
};

// this encrpyts the user password before it's saved to the db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
