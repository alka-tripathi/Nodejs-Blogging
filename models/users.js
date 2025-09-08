const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: '/images/default.jpg',
    },
    Role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  { timestamps: true }
);

//You only want to hash the password when it is new or updated.

//Without this check, every time you save a user (even if updating some other field), the password would get re-hashed again and again → making it unusable for login.


//agar humme future mai koi update karna ho usernam ya email mai toh hashing password will remain as it is

//pre ek middleware hai
userSchema.pre("save", async function(next){
    const user=this;

    if(!user.isModified("password")) return;

    //random string
      const salt = await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(user.password,salt);

  next();

})
userSchema.methods.comparePassword=async (enteredPass) => {
    return await bcrypt.compare(enteredPass,this.password)
    
}

exports.module = mongoose.model('user', userSchema);
