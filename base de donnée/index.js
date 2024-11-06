const http = require('http');
const app = require('./app');
const index = http.createServer(app)

index.listen(8080, ()=> {
    console.log("Server run in port 8080")
})