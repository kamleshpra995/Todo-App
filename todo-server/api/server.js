const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./dbConfig')


const server = express();

server.use(cors())
server.use(helmet())
server.use(express.json())

server.get('/', (req,res)=>{
    res.send("running")
})

server.get('/todos', async (req,res)=>{
try {
    const todos = await db('todos')
    res.json(todos)

} catch (error) {
    console.log(error)
}

})

server.get('/todos/:id', async (req,res)=>{
  
    const {id} = req.params


    try {
   const currentTodos=  await db('todos').where({id})

       currentTodos.length ===0? res.status(404).send({message: "not found"}) :     res.status(200).send(currentTodos)


    
    } catch (error) {
        console.log(error)
    }
    
    })

server.delete('/todos/:id', async (req,res)=>{
    const {id} = req.params
   

    try {
        await db('todos').where({id}).del()
        res.status(200).send({message: "successfully deleted"})
    } catch (error) {
        console.log(error)
    }
})



// Lists endpoints
server.get('/lists', async (req, res) => {
  try {
    const lists = await db('lists');
    res.json(lists);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching lists" });
  }
});

server.post('/lists', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "List name is required" });
  }
  try {
    const [id] = await db('lists').insert({ name });
    res.status(201).json({ id, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating list" });
  }
});

// Get todos by list
server.get('/lists/:listId/todos', async (req, res) => {
  const { listId } = req.params;
  try {
    const todos = await db('todos')
      .where('list_id', '=', listId)
      .orderBy('id', 'desc');
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching todos" });
  }
});

// Update the POST route
server.post('/todos', async (req, res) => {
  const { title, details, priority, dueDate, list_id } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const [id] = await db('todos').insert({
      title,
      details,
      priority,
      dueDate,
      list_id,
      status: false,
      completedOn: null
    });
    
    const newTodo = await db('todos').where({ id }).first();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating todo" });
  }
});

// Update the PUT route
server.put('/todos/:id', async (req,res)=>{
  const {id} = req.params
  const {title, details, priority, dueDate, status, completedOn} = req.body
  if(!title){
      return res.status(400).json({message : "Title is required"})
  }

  try {
      await db('todos').where({id}).update({
          title,
          details,
          priority,
          dueDate,
          status: status !== undefined ? status : false,
          completedOn: completedOn || null
      })
      res.status(200).send({message: "successfully updated"})
  } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Error updating todo" })
  }
});

module.exports = server;
