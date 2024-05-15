const mongoose = require('mongoose');

console.log("mongodb file working...")

const connectDB = async () => {
  console.log("connectionDB function called")
  await mongoose.connect("mongodb://localhost:27017/todo_app")
    .then(() => console.log("DB connected"))
    .catch(console.error)
    .finally(console.log(`db connection part run successfully`))
}


module.exports = connectDB;
