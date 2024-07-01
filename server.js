const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/TasksList");

const userRoutes = require('./routers');
const bodyParser = require('body-parser');
const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send("Runn Server")
})
const Task = new mongoose.Schema({
  title: String
});
const users = mongoose.model('Task2', Task);

// const main = async () => {
//   let data = new users({ title: 'Darpan' });
//   await data.save();
// }

// main()
app.get("/api/items", async (req, res) => {
  const items = await users.find();
  console.log("items",items);
  // res.json(items);
  // try {
  //   console.log("items :::::::::: >",items);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Server Error");
  // }
});
app.use('/', userRoutes);

app.post('/api/items', async (req, res) => {
  console.log("req",req);
 //   let data = new users({ title: 'Darpan' });
  // let data = new users({ title: 'Darpan' });

});

app.listen(5000);