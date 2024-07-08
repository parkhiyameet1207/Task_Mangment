const express = require("express");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/TasksList");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const Schema = mongoose.Schema;

const subtTaskSchema = new Schema({
    title: String,
    cardId: String,
    listId: { type: Schema.Types.ObjectId, ref: 'MainTask' }
});

const mainTaskSchema = new Schema({
    title: String,
    subtasks: [{ type: Schema.Types.ObjectId, ref: 'SubtTask' }]
});

const MainTask = mongoose.model('maintask', mainTaskSchema);
const SubtTask = mongoose.model('subtask', subtTaskSchema);

app.post('/api/board/addlist', async (req, res) => {
    const { listId, title } = req.body
    let data = new MainTask({ title: title });
    await data.save();
    res.send(data);
});

app.get('/api/board/getlsit', async (req, res) => {
    let db = MainTask;
    let data = await db.find().exec();
    res.send(data);
})
app.post('/api/board/addcard', async (req, res) => {
    const { cardText, cardId, listId } = req.body;
       let mainTask = await MainTask.findById(listId);
    let data = new SubtTask({ title: cardText, cardId: cardId, listId: listId });
    await data.save();
    res.send(data);
  });
  
  app.get('/api/board/getcard', async (req, res) => {
    let db = SubtTask;
    let data = await db.find().exec();
    console.log(data);
    res.json(data);
  })

  app.put('/api/board/lists/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    const { title } = req.body;

    const updatedList = await SubtTask.findByIdAndUpdate(
      listId,
      { title },
      { new: true }
    );

    res.json(updatedList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/board/lists/:listId', async (req, res) => {
    try {
      const { listId } = req.params;
      await SubtTask.findByIdAndDelete(listId);
      res.json({ message: 'List deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.listen(5000);