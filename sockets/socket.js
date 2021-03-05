const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Metallica'));
bands.addBand(new Band('CowBoy'));
bands.addBand(new Band('Good Mean'));
bands.addBand(new Band('Day'));

console.log(bands.getBands());

io.on('connection', client => {
    
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('broatcats', { admin: 'nuevo mensaje a todos los clientes' });
    });

    client.on('emitir-mensaje', (payload) => {
        client.broadcast.emit('nuevo-mensaje', payload);
        console.log(payload);
    });

    client.on('vote-band', ( payload ) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', ( payload ) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', ( payload ) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

});