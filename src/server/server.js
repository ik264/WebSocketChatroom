const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

const CLIENTS = {};
var connectionIDCounter = 0;
wss.on('connection', function connection(ws) {
    ws.id = connectionIDCounter++;
    CLIENTS[ws.id] = ws;
    console.log(CLIENTS);
    // if (ws.id == 2) {
    //     ws.on('message', function (msg) {
    //         data = JSON.parse(msg);
    //         CLIENTS['2'].send("Hello client 2");
    //     })
    // }
    if (ws.id == 0) {
        ws.on('message', function incoming(data) {
            CLIENTS['2'].send(data);
        })
    }
    if (ws.id == 2) {
        ws.on('message', function incoming(data) {
            CLIENTS['0'].send(data);
        })
    }
    if (ws.id == 1) {
        ws.on('message', function incoming(data) {
            CLIENTS['2'].send("Hello World");
        })
    }
    // ws.on('message', function incoming(data) {
    //     wss.clients.forEach(function each(client) {
    //         if (client !== ws && client.readyState === WebSocket.OPEN) {
    //             client.send(data);
    //         }
    //     })
    // })
})

server.listen(port, function () {
    console.log(`Server is listening on ${port}!`)
})