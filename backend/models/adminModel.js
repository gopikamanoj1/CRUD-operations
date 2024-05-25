import mongoose from "mongoose";
import bcrypt from "bcrypt";


const adminSchema=mongoose.Schema({
  name:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  is_admin:{
      type:Number,
      required:true
  }
})


adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const admin = mongoose.model('admins', adminSchema);

export default admin;