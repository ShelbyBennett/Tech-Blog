const router= require("express").Router()
const{ User }=require("../../models")

router.post("/", async (req, res)=>{
    console.log(req.body, "router hit");
    try {
        const newUser = await User.create(req.body)

        req.session.save(()=>{
            req.session.user_id=newUser.id;
            req.session.username=newUser.username;
            req.session.logged_in=true;
        })
        res.json(newUser)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.post("/login", async (req,res)=>{
    try {
        const user =await User.findOne({
            where:{
                username:req.body.username
            }
        })

        if(!user){
            res.status(400).json({message:"No user account found!"})
        }

        const validPW= user.checkPassword(req.body.password)

        if(!validPW){
            res.status(400).json({message:"There was an issue with your credentials"})
        }

        req.session.save(()=>{
            req.session.user_id=user.id;
            req.session.username=user.username;
            req.session.logged_in=true;
        })

        res.json(user)

    } catch (error) {
       console.log(error); 
       res.status(500).json(error)
    }
})

router.post("/logout", async (req, res)=>{
    try {
        if( req.session.logged_in){
            await req.session.destroy(()=>{
                res.status(204).end()
            })
        }else{
            res.status(404).end()
        }
    } catch (error) {
        
    }
})

module.exports=router