const express = require('express')
const fs = require('fs')
const bodyParser= require('body-parser')

const app = express()

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
app.post('/api', (req, res)=>{
    let content= req.body
    fs.writeFileSync('./data.json',JSON.stringify(content));
    res.send(JSON.stringify(content))
    res.send('API endpoint: post')
})
app.get('/api', (req, res)=>{
    let content=req.body
    fs.existsSync('./data.json') ? JSON.parse(fs.readFileSync('./data.json')) : {}
    res.send(JSON.stringify(content))
    res.send('API endpoint: get')
})
app.put('/api', (req, res)=>{
    let content={}
    fs.writeFileSync('./data.json',JSON.stringify(content));
    res.send(JSON.stringify(content))
    res.send('API endpoint: put')
})
app.delete('/api', (req, res)=>{
    if(fs.existsSync('./data.json')) fs.unlinkSync('./data.json')
    res.send('API endpoint: delete')
})

/* Creating a server that listens to a specified port */
app.listen(port, () => {
    console.log(`A server was created to listen on porst ${port}`)
})