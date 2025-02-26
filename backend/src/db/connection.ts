import { connect, disconnect } from "mongoose";


 async function connectToDatabase(){

    try{
        await connect("mongodb+srv://sejalkale1910:8SABNC3xQnzmbY0A@cluster0.lzf3b.mongodb.net/chatbot?retryWrites=true&w=majority&appname=Cluster0");
    }
    catch(err){
        console.log(err.message);
        throw new Error("Cannot connect to Mongoose..!")
    }

}

async function disconnectFromDatabase() {
    try {
        await disconnect();
        
    } catch (error) {
        console.log(error);

        throw new Error("Cannot disconnect from  Mongoose..!")

    }
    
}

export {connectToDatabase,disconnectFromDatabase}