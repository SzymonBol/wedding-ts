import { config } from 'dotenv';
import { getMongodbClient } from './connection.js';
import express from 'express';
import { createInvitation, findInvitationById, updateIsGoing } from './wedding-crud.js'
import cors from 'cors';

config();

const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;
const port = process.env.PORT;

const mongoClient = await getMongodbClient().connect();
const db = mongoClient.db(dbName);
const guestCollection = db.collection(collectionName);
const app = express();
app.use(express.json());
app.use(cors())

app.get('/invitation/:id', async (req, res) => {
    const id = req.params.id;
    let result = await findInvitationById(guestCollection, id);
    if(result.length === 1){
      res.status(200);
      result = result[0];
      res.send(result);
    } else if(result.length === 0){
      res.status(400);
      res.send('Error: No invitation with given id: ' + id);
    } else {
      res.status(500);
      res.send('Error: More then 1 invitation matches with given id: '+ id);
    }
    
})

app.post('/create-invitation', async (req, res) => {
  const invitation = req.body;  
  const reulst = await createInvitation(guestCollection, invitation);
  res.send(reulst);
})

app.patch('/update-is-going', async (req, res) => {
  const {id, name, isGoing}= req.body;  
  const reulst = await updateIsGoing(guestCollection, id, name, isGoing);
  res.send(reulst);
})

app.listen(port, () => {
  console.log(`Wedding confirmation app listening on port ${port}`)
})