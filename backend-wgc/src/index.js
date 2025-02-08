import { config } from 'dotenv';
import { getMongodbClient } from './connection.js';
import express from 'express';
import { createInvitation, deleteInvitation, findInvitationById, getAllInvitations, updateInvitationById } from './wedding-crud.js'
import cors from 'cors';
import { authenticateToken, createUser, validateLoginCredentials} from './login.js'
import cookieParser from "cookie-parser";
import { createSchedulePoint, getSchedule, deleteSchedulePoint } from './schedule-crud.js';
import { ObjectId } from 'mongodb';

config();

const dbName = process.env.DB_NAME;
const port = process.env.PORT;

const mongoClient = await getMongodbClient().connect();
const db = mongoClient.db(dbName);
const guestCollection = db.collection(process.env.COLLECTION_NAME_GUESTS);
const usersCollection = db.collection(process.env.COLLECTION_NAME_USERS);
const scheduleCollection = db.collection(process.env.COLLECTION_NAME_SCHEDULE);

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:4200", "https://www.wesele-ts.pl", "https://wesele-ts.pl"],
  credentials: true
}));
app.use(cookieParser());
app.use(authenticateToken)

//without-verification

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

app.patch('/update-invitation', async (req, res) => {
  const {id, guests, confirmed, comment, needAccommodation}= req.body;  
  const result = await updateInvitationById(guestCollection, id, guests, confirmed, comment, needAccommodation );
  res.send(result);
})

app.post('/login-user', async (req, res) => {
  const credentials = req.body;
  const result = await validateLoginCredentials(usersCollection, credentials);
  if(result.token !== null){
    res.cookie("authToken", result.token, {httpOnly: true, sameSite: 'none', secure: true});
  }

  res.status(result.status);
  res.send({isFine: result.isFine, user: result.user});
})

app.get('/schedule', async (req, res) => { 
  const result = await getSchedule(scheduleCollection);
  res.send(result);
})


//with verification

app.post('/create-invitation', async (req, res) => {
  const invitation = req.body;  
  const result = await createInvitation(guestCollection, invitation);
  res.send(result);
})

app.post('/create-user', async (req, res) => {
  const userData = req.body;
  await createUser(usersCollection, userData);
  res.send({actionResult: 'jest git'});
})

app.get('/check-session', async (req, res) => {
  const result = {isFine: true, user: req.user};
  res.send(result);
})

app.get('/logout', async (req, res) => {
  res.cookie("authToken", 'logged_out', {httpOnly: true});
  res.send();
})

app.get('/guests', async (req, res) => {
  const result = await getAllInvitations(guestCollection);
  res.send(result);
})

app.delete('/delete-invitation/:id', async (req, res) => {
  const id = req.params.id;
  const result = await deleteInvitation(guestCollection, id);
  res.send(result);
})

app.post('/create-schedule-point', async (req, res) => { 
  const schedulePoint = req.body;  
  const result = await createSchedulePoint(scheduleCollection, schedulePoint);
  res.send(result);
})

app.delete('/delete-schedule-point/:id', async (req, res) => { 
  const id = req.params.id;
  const result = await deleteSchedulePoint(scheduleCollection, new ObjectId(id));
  res.send(result);
})

app.listen(port, () => {
  console.log(`Wedding confirmation app listening on port ${port}`)
})
