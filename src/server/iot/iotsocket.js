const WebSocket = require('ws');
const net = require('net');

function waitForServer(port, callback) {
    const client = net.createConnection({ port: port }, () => {
        client.end();
        callback(true);
    });
    client.on('error', () => {
        setTimeout(() => waitForServer(port, callback), 1000); // Retry after 1 second
    });
}

function setupWebSocketServer(port) {
    // Function to handle WebSocket connection to server 3000
    function connectToServer3000() {
        const ws3000 = new WebSocket('ws://localhost:3000');

        ws3000.on('open', function open() {
            console.log('Connected to port 3000');
            // Send initial message or perform other actions after connection
        });

        ws3000.on('message', function incoming(message) {
            console.log('Received message from port 3000:', message);
            // Process messages received from server on port 3000
        });

        ws3000.on('error', function error(err) {
            console.error('Connection error:', err);
            // Attempt to reconnect after a delay
            setTimeout(connectToServer3000, 2000); // Retry after 2 seconds
        });

        ws3000.on('close', function close() {
            console.log('Connection to port 3000 closed');
            // Attempt to reconnect after a delay
            setTimeout(connectToServer3000, 2000); // Retry after 2 seconds
        });
    }

    // Call the function to initiate the connection to server 3000
    waitForServer(3000, (ready) => {
        if (ready) {
            connectToServer3000();
        } else {
            console.error('Server 3000 is not ready');
        }
    });

    // WebSocket server setup for server 3002 can go here
    const wss = new WebSocket.Server({ port });

    wss.on('connection', function connection(ws) {
        console.log(`WebSocket connected on port ${port}`);

        ws.on('message', function incoming(message) {
            console.log(`Received message from port ${port}:`, message);
            // Process the message and send response if needed
        });

        // Establish connection to server on port 3002
        const ws3002 = new WebSocket('ws://localhost:3002');

        ws3002.on('open', function open() {
            console.log('Connected to port 3002');
            // Send initial message or perform other actions after connection
        });

        ws3002.on('message', function incoming(message) {
            console.log('Received message from port 3002:', message);
            // Process messages received from server on port 3002
        });

        // Handle errors and close events for connection to port 3002
        ws3002.on('error', function error(err) {
            console.error('Connection error:', err);
        });

        ws3002.on('close', function close() {
            console.log('Connection to port 3002 closed');
            // Handle closed connection, possibly attempt reconnection
        });
    });

    console.log(`WebSocket server listening on port ${port}`);
}

module.exports = setupWebSocketServer;
