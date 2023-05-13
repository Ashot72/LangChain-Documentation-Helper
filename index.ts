import * as path from 'path';
import * as express from 'express';
import * as bodyParser from "body-parser";

import { getAnswer } from './answer';
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/files', express.static(path.join(__dirname, 'data')))

app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/api/data', getAnswer)

const port = 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})