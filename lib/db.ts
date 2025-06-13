import mongoose from "mongoose";
import { cache } from "react";

const MONGODB_URL = process.env.MONGODB_URL!;  //here exclamation mark means that I am certain tht i will get a url

if(!MONGODB_URL){
    throw new Error("Please define mongodb url");

}   

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn : null , promise : null};
}


export async function connectToDatabase(){

    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        //mtlb cached me abhi promise nahi h

        const opts = {
            bufferCommands : true,
            maxPoolSize : 10       //maxPoolSize mtlb ek baar me mongo se kitne cnnctions hain
        }

        /* In Mongoose, bufferCommands: true means:
If Mongoose isn't connected to MongoDB yet, it will queue up operations (like .save(), .find()) and execute them once the connection is established.
*/
cached.promise = mongoose.connect(MONGODB_URL , opts)
.then(() => mongoose.connection);

    }

    //cached me promise hai then : 

    try{

        cached.conn = await cached.promise;

    }catch(error){
        cached.promise = null;  //cuz whtvr the promise is , its wrong so just make it null
        throw error;

    }

}