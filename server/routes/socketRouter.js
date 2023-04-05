const express = require("express");
const Conversation = require("../models/Conversation");
const router = express.Router();

function SocketRouter(io) {

    router.post("/send-message", async(req, res, next) => {

        try {
            const{
                sender, 
                receiver, 
                message
            } = req.body
        
            const conversation = await Conversation.find({ users: { $all: [sender, receiver] }});
            
            if(conversation.length>0){
    
                Conversation.findOneAndUpdate(
                    { _id: conversation[0]._id  },
                    { $push: { messages: {
                        message,
                        sender
                    } } },
                    { new: true }
                  ).then((conversation) => {

                    io.emit("UPDATE", { update: true });

                    return res.status(201).json({
                        success: true,
                        conversation,  
                        message: "Message sent"
                    });
                  }).catch((err) => {
                    console.log(err);
                  });  
            }else{
                const _conversation = new Conversation({
                    messages: {
                        message,
                        sender
                    },
                    users: [sender, receiver]
                });
        
                _conversation.save()
                    .then((err, conversation)=>{

                        io.emit("UPDATE", { update: true });

                        if(err){
                            return res.status(400).json({
                                err,
                                message: "Something went wrong",
                            });
                        }
    
                        if(conversation){
                            res.send({
                                success: true,
                                conversation,
                                message: 'Message sent'
                            })
                        }
                    })
            }
            
        } catch (exp) {
            next(exp)
            
        }
    })

    return router;
}

module.exports = SocketRouter;