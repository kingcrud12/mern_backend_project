import express from "express"
import User from "../model/User.js"
import auth from "../routes/auth.js"

const router = express.Router()

//update
router.put("/:id", async(req,res, next)=>{
    try{
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updateUser)
    }catch(err){
        next(err)
    }
})

router.get("/:id", async(req, res, next)=> {
    try{
        const getUser = await User.findById(req.params.id);
        res.status(200).json(getUser)
        
    }catch(err){
        next(err)
    }
})

router.delete("/:id", async(req, res, next)=> {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user hass been deleted")
    }catch(err){
        next(err)
    }
})

router.get("/", async(req, res, next)=> {
    try{
        const getAllUsers = await User.find()
        res.status(200).json(getAllUsers)
    }catch(err){
        next(err)
    }
})

export default router