const http=require('http');
const app=require('./app')
const server=http.createServer(app);
const PORT=process.env.PORT || 3030;
server.listen(PORT,(req,res)=>{
    console.log(`Server Started on ${PORT}`)
})