const $lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const $button = document.querySelector('button');

console.log('Nuevo Ticket HTML');
const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    $button.disabled = false;
});

socket.on('ultimo-ticket', (ultimo) => {
    $lblNuevoTicket.innerText = `Ultimo ticket: ${ultimo}`;
});


socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    $button.disabled = true;
});


$button.addEventListener( 'click', () => {

    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        console.log('Desde el server: ', ticket );
        $lblNuevoTicket.innerText = ticket;
    });

});