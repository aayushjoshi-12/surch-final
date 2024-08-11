const express = require('express');
const router = express.Router();
const {Chat} = require('../DB/chat');
const axios = require('axios')
require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        console.log("in req")
        const date = new Date().toJSON().slice(0,10);
        const {query, userId} = req.body;
        console.log(date)
        if(!userId){
            res.status(400).send({message: "User hasn't logged in"});
            return;
        }
        console.log("before answer")
        const answer = await axios.post(
            'https://surch-backend.onrender.com/inference',
            {
            query,
            api_key:process.env.API_KEY
        });
        console.log("after answer");
        const chat = await Chat.findOne({date, userId});
        if(!chat){
            const chatTitle = query.substring(0,15);
            let chatArray=[];
            chatArray.push({title: chatTitle, query, answer: answer.data.inference});
            await new Chat({date, userId, chats: chatArray}).save();
            res.send({message: "successfully inserted first data"});
            return;
        }
        chat.chats.unshift({title: query.substring(0,15), query, answer: answer.data.inference});
        await chat.save();
        res.send({message: "successfull", answer: answer.data.inference });
    } catch (error) {
        console.log(error);
        res.send({message: "internal server error"})
    }
})

router.get('/initial', async (req, res) => {
    try {
        const { userid } = req.headers;
        const AllChats = await Chat.find({userId:userid}).limit(10).sort({'date': -1});
        if(!AllChats.length){
            res.status(404).send({message: "No Previous Chat found"});
            return;
        }
        res.send({message: "successfull", allChats: AllChats});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "internal server error"})
    }
})

router.get('/:date/:id', async (req, res) => {
    try {
        const { userid } = req.headers;
        const { date, id } = req.params;
        const chat = await Chat.findOne({userId: userid, date: date, });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router