const mongoose =require("mongoose");
const Schema = mongoose.Schema;

    const messageSchema = new Schema(
        {
            message: {
                type: String,
                required: true
            },
            sender: {
                type: String,
                required: true
            }
        },
        {
            timestamps: true, 
        }
    )

    const conversationSchema = new Schema(
        {
            messages :[messageSchema],
            users: {
                type: Array,
            },
        },
        {
            timestamps: true, 
        }
    ); 

const Conversation = mongoose.model('Conversation',conversationSchema); 

module.exports = Conversation; 