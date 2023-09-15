import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
import userRoute from "./controllers/users.js"
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express(); //creation du server web api
dotenv.config(); // donne l'acces aux vairbales d'environnement

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO) //connecte a mongodb
        console.log("Connected to the database");
    }catch(error){
        console.log("something went wrong", error); //renvoi l'erreur en cas d'echec
    }
}

mongoose.connection.on("disconnected", ()=> {
    console.log("disconnected to the database");
}) //methode qui lit la connection a la base de données et renvoi le message en console log en cas de deconnection

//features settle
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routes settle
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)

//error settle
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });


app.listen(3000, ()=>{
    connect()
    console.log("Connected to the server")
})

