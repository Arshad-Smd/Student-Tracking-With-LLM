import mongoose  from "mongoose";

async function connect(){
await mongoose.connect("mongodb://localhost:27017/studetails");
console.log("connect success");
}
export default connect;