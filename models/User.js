const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        StudentId : {
            type: String,
            required: true,
            unique: true,
            trim : true,
        },
        email : {
            type : String,
            required : true,
            trim: true,
        },
        password : {
            type : String,
            required : true,
        },
        accoutTyoe: {
            type: String,
            enum: ["Admin", "Student", "Instructor"],
            required : true,
        },
        courses: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref : "course",
            },
        ],

        image : {
            type : String,
        },
        courseProgress: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref : "courseProgress",
            },
        ],
    }, {
        timestamps: true,
    }
)

module.exports = mongoose.model("user", userSchema);