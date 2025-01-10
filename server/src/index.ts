import express, { Request, Response } from 'express';
import path from 'path';
import {starting_schedule} from './data'
export type {Trips} from './api'

const app = express();
const port = 80;

// In-memory list of strings
const stringList: string[] = ['Hello', 'jobes'];
const distDir = path.join(__dirname, '../../client/static');
// Serve static files from the client/dist directory
app.use('/',express.static(distDir));

app.get('/get_list', (req: Request, res: Response) => {
    res.json(stringList);
});

app.get('/get_trips', (req: Request, res: Response) => {
  res.json(starting_schedule);
});

 
// POST /add_string - Add a string to the list
app.post('/add_string', (req: Request, res: Response) => {
    const { newString } = req.body; 

    if (typeof newString === 'string' && newString.trim().length > 0) {
        stringList.push(newString);
        res.status(200).json({ message: 'String added successfully!' });
    } else {
        res.status(400).json({ error: 'Invalid string input!' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});