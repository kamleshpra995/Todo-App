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


server.post('/todos', async (req,res)=>{

    const {message} = req.body
    if(!message){
        return res.status(400).json({message : "you must have a message body"})
    }
        try {
            await db('todos').insert({
                message,
                status: false,
                completedOn: null
            })
            res.status(200).json({message : "todo stored succesfully"})
            
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Error creating todo" })
        }


})
server.put('/todos/:id', async (req,res)=>{
        const {id} = req.params
        const {message, status, completedOn} = req.body
        if(!message){
            return res.status(400).json({message : "you must have a message body"})
        }

        try {
            await db('todos').where({id}).update({
                message,
                status: status !== undefined ? status : false,
                completedOn: completedOn || null
            })
            res.status(200).send({message: "successfully updated"})
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: "Error updating todo" })
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

// Update todos endpoint to handle list_id
server.post('/todos', async (req, res) => {
  const { message, list_id } = req.body;
  if (!message) {
    return res.status(400).json({ message: "You must have a message body" });
  }
  if (!list_id) {
    return res.status(400).json({ message: "List ID is required" });
  }
  try {
    await db('todos').insert({
      message,
      status: false,
      completedOn: null,
      list_id
    });
    res.status(200).json({ message: "Todo stored successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating todo" });
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

module.exports = server;
