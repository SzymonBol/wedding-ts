import { config } from 'dotenv';
import { getMongodbClient } from './connection.js';
import express from 'express';
import { createInvitation, findInvitationById, updateIsGoing } from './wedding-crud.js'

config();

const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;
const port = process.env.PORT;

const mongoClient = await getMongodbClient().connect();
const db = mongoClient.db(dbName);
const guestCollection = db.collection(collectionName);
const app = express();
app.use(express.json());

app.get('/invitation/:id', async (req, res) => {
    const id = req.params.id;
    const reulst = await findInvitationById(guestCollection, id);
    res.send(reulst);
})

app.post('/create-invitation', async (req, res) => {
  const invitation = req.body;  
  const reulst = await createInvitation(guestCollection, invitation);
  res.send(reulst);
})

// {
// 	   "id": "wercia_jawor_test",
//     "name": "Weronika",
//     "isGoing": "yes"
// }
app.patch('/update-is-going', async (req, res) => {
  const {id, name, isGoing}= req.body;  
  const reulst = await updateIsGoing(guestCollection, id, name, isGoing);
  res.send(reulst);
})

app.listen(port, () => {
  console.log(`Wedding confirmation app listening on port ${port}`)
})