import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Detail } from './config.js';
import {
  setDoc,
  getDoc,
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/create', async (req, res) => {
  const reqData = req.body;
  const customId = req.body.id;
  console.log(reqData);
  try {
    await setDoc(doc(Detail, customId), reqData);
    console.log('id: ', customId);
    res.status(200).send({ msg: 'User information added' });
  } catch (error) {
    console.error('Error adding document: ', error);
    res.status(500).send({ error: 'Failed to add user information' });
  }
});

app.get('/get/:email', async (req, res) => {
  const customId = req.params.email;
  try {
    const docRef = doc(Detail, customId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      // console.log(userData)
      res.status(200).send(userData);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error : ', error);
    res
      .status(500)
      .send({ error: 'Failed to retrieve user information on server' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
