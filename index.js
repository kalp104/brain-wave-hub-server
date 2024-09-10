const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./database/database")
const cors = require("cors");
dotenv.config();


const PORT = process.env.PORT || 4000;
app.use(cors({origin: "*"}));
app.use(express.json());

database.connect();

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});