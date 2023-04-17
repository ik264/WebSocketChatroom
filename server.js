const Websocket = require('ws')
const wss = new Websocket.Server({ port: 3000})

wss.on('connection', function (ws){
    ws.on('message', function (message){
        console.log('server receive message: ',message.toString())
    })
    ws.send('msg from server!')
    ws.on('close', function (message){
        console.log('deconnect', message)
    })
})