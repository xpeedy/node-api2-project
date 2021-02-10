// implement your posts router here
const Posts = require("./posts-model")
const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    Posts.find().then(post => {
        res.status(200).json(post)
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    Posts.findById(id).then(post => {   
        !post ? 
        res.status(404).json({message:`post does not exist`}) :
        res.status(200).json(post) 
    })
    .catch(err => {
        res.status(500).json({message:`server error 500 ${err.message}`})
    })
})

router.get("/:id/comments", (req, res) => {
    
})

router.post("/", (req, res) => {
    // const { id,title,contents,created_at,updated_at} = req.params
    Posts.insert(req.body).then(newPost => {
        !newPost ?
        res.status(400).json({message:`fields are reuired`}) :
        res.status(200).json(newPost)
    })
})

router.put("/:id", (req, res) => {
    const { id } = req.params
    const body = req.body
    Posts.update(id, body).then(updatedPost => {
        !updatedPost ?
        res.status(400).json({message:`fileds are required`}) :
        res.status(200).json(updatedPost)
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    Posts.remove(id).then((post) => {
        !post ?
        res.status(404).json({message:`post not found`}) :
        res.status(200).json({message:`post was deleted`})
    })
})

router.use("*", (req, res) => {
    res.status(404).json({message: "404 Not Found"})
})

module.exports = router;