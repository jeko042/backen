import mongoose from "mongoose";
// import validator from "validator";
// validator.isMongoId()


export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MedEase",
    }).then(()=>{
        console.log("Connected to database!");
    }).catch(err=>{
        console.log(`Some error occured while connecting to databse: ${err}`);
    });
};
