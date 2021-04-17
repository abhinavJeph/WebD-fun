const http = require('http');
const port = 8000;
const fs = require('fs');

function requestHandler(req, res){
    console.log(req.url);

    res.writeHead(200, { 'contentType' : 'text/html'});
    
    let filePath;
    switch(req.url){
        case '/' :  
            filePath = './index.html';
            break;
        case '/pokemons' :
            filePath = './pokemons.html';
            break;
        default :
            filePath = './404.html'
    }

    fs.readFile(filePath, (err,data) =>{
        if(err){
            console.log('error:' + err);
            return res.end('<h1>Error!</h1>')
        }

        return res.end(data);
    })

    // fs.readFile('./index.html', function(err, data){
    //     if(err){
    //         console.log('error: '+err);
    //         res.end('<h1>Error!</h1>');
    //     }
    //     console.log("File loaded");
    //     res.end(data);
    // })

    // res.end("<h1>Gotta catch em all!</h1>");
}

const server = http.createServer(requestHandler);

server.listen(port, function(err){
    if(err){
        console.log('Error: ' + err);
        return ;
    }

    console.log('Server Running on port: ' + port);
})

// node npm = creates the basic node.js project
// Package.js contains the metadata and dependencies of the project
// We can run multiple node.js server on a single machine
// var http = require('http') creates a instance of http module in node.js file
// 200 is status code for success : OK
// 403 is status code for not having access rights
// 404 is Not Found status code
// response head stores the information and pointer to the response data
// fs module is used to read and write file
// Package.json store dependencies of nodejs project. But sometimes those dependencies also needs dependencies
// package-lock.json stores the list of all dependencies of the project
