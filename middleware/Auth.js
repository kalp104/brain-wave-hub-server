const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()



// signup

exports.auth = async (req, res, next) => {
    try {
        const token = req.copkies.token ||
                        req.body.token ||
                        req.header("Authorization").replace("bearer","");

        if(!token) {
            return res.status(401).json({
                success : false,
                message : "token is missing"
            });
        }


        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.body = decode;
            
        }
        catch (e) {
            return res
            .status(401)
            .json({ success: false, message: "token is invalid" });
    
        }
        next();
    }
    catch (e) {
        return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }
}


exports.isStudent = async (req, res, next) => {
    try {
        const userDetails = await User.findOne({email : req.user.email});
        if(userDetails.accoutType !== "Student") {
            return res.status(401).json({
                success : false,
                message: "this is protected route for Student" });
        }
        next();
    }
    catch (e) {
        return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
    }
}


exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
    
};
