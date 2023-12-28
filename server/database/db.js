import mongoose from "mongoose";

const Connection = async(username,password) => {
    const URL = `mongodb://${username}:${password}@ac-1gxyamv-shard-00-00.ebs2jop.mongodb.net:27017,ac-1gxyamv-shard-00-01.ebs2jop.mongodb.net:27017,ac-1gxyamv-shard-00-02.ebs2jop.mongodb.net:27017/?ssl=true&replicaSet=atlas-suuckg-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, {useNewUrlParser : true});
        console.log("Database Connected!!!");
    } catch(error) {
        console.log("Not Able To Connect!!!",error);
    }
 
} 

export default Connection;