const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


//middleware 
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.qvgg1my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    // await client.connect();
    const doctorsCollection = client.db('doctorTicketDB').collection('doctors');


    
   app.get('/doctors', async(req, res) =>{
    const cursor = doctorsCollection.find()
    const result = await cursor.toArray()
    res.send(result);
   })

   app.get('/doctors/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await doctorsCollection.findOne(query);
    res.send(result);
   })

    app.post('/doctors', async(req, res) =>{
        const doctors = req.body;
        const result = await doctorsCollection.insertOne(doctors)
        res.send(result);
    })
  


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
    finally {

    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req, res) => {
    res.send('Server is running!!')
})
app.listen(port, ()=>{
    console.log(`listening on port: ${port}`)
})