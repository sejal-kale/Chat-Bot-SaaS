import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

connectToDatabase().then(()=>{
  
  app.listen(5000,()=>{
    console.log("I am listening on the port : ",5000)
  })
  
})
