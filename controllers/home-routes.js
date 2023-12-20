const router= require("express").Router()
const{ User, Post, Comment }=require("../models")

router.get("/", async (req, res)=>{
    try {
      const postData= await Post.findAll({
        include:[User]
      })  

      const posts= postData.map((post)=>post.get({plain:true}))
      res.render('homepage', {posts})
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/post/:id', async (req,res)=>{
    try {
        const onePost= await Post.findByPk(req.params.id,{
            include:[User, {model:Comment, include:[User]}]
        })

        const post = onePost.get({plain:true})
         res.render('single-post', {post})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get('/login', (req,res)=>{
    if(req.session.logged_in){
        res.redirect('/dashboard')
    }
    res.render('login')
})

router.get('/signup', (req,res)=>{
    if(req.session.logged_in){
        res.redirect('/dashboard')
    }
    res.render('register')
})



module.exports=router;