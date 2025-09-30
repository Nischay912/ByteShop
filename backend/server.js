// step2: lets create a basic express app here below ; and we can run it using "npm run dev" as we had included the script under "dev" in package.json file there.
import express from "express";
import authRoutes from "./routes/auth.route.js";

// step4: import the dotenv package and then call its config method in order to be able to use the variables of the .env file there.
import dotenv from "dotenv";
dotenv.config();

const app = express();
// step3: lets make a variable for PORT , so that we don't hardcode it in code there ; and just in case its undefined lets say it will be 5000
const PORT = process.env.PORT || 5000;

// step5: now lets say if user visits "/api/auth" , then we will mount the authRoutes there.

// step6: see the next steps now in auth.route.js file now there.
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("server is running on http://localhost:" + PORT);
});