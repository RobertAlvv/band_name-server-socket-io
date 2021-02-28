const { io } = require('../index');

io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('broatcats', { admin: 'nuevo mensaje a todos los clientes' });
    });

    client.on('mensaje-navegador-web', (payload) => {
        client.broadcast.emit('nuevo-mensaje', payload);
        console.log(payload);
    });

});