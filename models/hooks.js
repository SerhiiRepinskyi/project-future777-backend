import bcrypt from "bcryptjs";

export const handleMongooseError = (error, data, next) => {
  const { code, name } = error;
  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};

export const validateAtUpdate = function (next) {
  this.options.runValidators = true;
  next();
};

/* used in userSchema.pre(‘save’, ...
  see a very good explanation here:
  https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
  */
export async function hashPwd(next) { 
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  user.password = await bcrypt.hash(user.password, 10);

  next();
}

