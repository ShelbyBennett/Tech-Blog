const router= require("express").Router()
const{ User, Post }=require("../models")
const withAuth= require('../utils/auth')

router.get("/",  withAuth, async (req, res)=>{
    try {
      const postData= await Post.findAll({
        include:[User],
        where:{
            user_id:req.session.user_id
        }
      })  

      const posts= postData.map((post)=>post.get({plain:true}))

      res.render('dash', {posts})
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports=router;