import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First Name Must Contaiin At Least 3 Characters!"],
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contaiin At Least 3 Characters!"],
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    phone:{
        type: String,
        required: true,
        minLength: [10, "Phone number must contain exact 10 digits!,"],
        maxLength: [10, "Phone number must contain exact 10 digits!,"],
    },
    nic:{
        type: String,
        required: true,
        minLength: [12, "NIC must contain exact 12 digits!,"],
        maxLength: [12, "NIC must contain exact 12 digits!,"],
    },
    dob:{
        type: String,
        required: [true, "DOB is required!"],
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password:{
      type: String,
      minLength: [8, "Password must contain At Least 8 Characters!,"],
      required: true,
      select: false,
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment:{
        type: String,
    },
    doctorAvatar:{
        public_id: String,
        url: String,
    },
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function (){
    return jwt .sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
}
export const User = mongoose.model("User", userSchema);
