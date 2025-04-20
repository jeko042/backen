import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import { Message } from "../models/messageSchema.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async(req, res, next) => {
    const {firstName, lastName, phone, email, message} = req.body;
    if (!firstName || !lastName || !phone || !email || !message) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
        await Message.create({firstName, lastName, phone, email, message});
        res.status(200).json({
            success: true,
            message: "Message sent successfully",
        });
});

export const getAllMessages = catchAsyncErrors(async(req,res,next)=>{
    const messages = await Message.find();
    res.status(200).json({
        success: true,
        messages,
    });
});

