const express=require("express");
const router=express.Router();

router.get("/signin",(req,res)=>{
    return res.render("signin.ejs");

})
module.exports=router;