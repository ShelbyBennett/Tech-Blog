const{User,Post,Comment}=require("../models")
const sequelize= require('../config/connection')
const userSeeds=require('./user-seeds.json')
const postSeeds=require('./post-seeds.json')
const commentSeeds=require('./comment-seeds.json')

const seedDatabase =async()=>{
    await sequelize.sync({force:true})

 await User.bulkCreate(userSeeds, {
        individualHooks:true,
        returning:true
    })
    console.log("------USER SEEDED---------");

   await Post.bulkCreate(postSeeds)

    console.log("------POST SEEDED---------");
    
  await Comment.bulkCreate(commentSeeds)
    console.log("------COMMENT SEEDED---------");

    process.exit(0)
}

seedDatabase()