const express = require('express')
const fs = require('fs')
const cors = require('cors');
const bodyParser= require('body-parser')

const app = express()

//Needed so CORS errors do not get thrown
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

//This tells the application to accept input in json format
app.use(express.json());

//This tells the application to handle json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const port = 3000

/* HTML ENDPOINTS */
app.get('/', (req, res)=>{
    res.send('HTML endpoint: index');
})
app.get('/detail', (req, res)=>{
    res.send('HTML endpoint: detail');
})

/*API ENDPOINTS */
app.post('/api', (req, res) => {
    let content = {}
    fs.readFile('./data.json', 'utf8', (err, data) => {
    fs.writeFileSync('./data.json', JSON.stringify(content));
    res.json(content);
    })
});
app.get('/api', (req, res) => {
    let content = {};
    if (fs.existsSync('./data.json')) {
        content = JSON.parse(fs.readFileSync('./data.json'));
    }
    res.json(content);
});
app.put('/api', (req, res)=>{
    let content= req.body;
    fs.writeFileSync('./data.json',JSON.stringify(content, null, 2)); //prettier output. From ChatGPT
    res.send(JSON.stringify(content))
})
app.delete('/api', (req, res)=>{
    if(fs.existsSync('./data.json')) fs.unlinkSync('./data.json')
})

/* Creating a server that listens to a specified port */
app.listen(port, () => {
    console.log(`A server was created to listen on port ${port}`)
})