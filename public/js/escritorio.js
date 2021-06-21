const socket = io();
const searchParams = new URLSearchParams(window.location.search);



//HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const alerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes')

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escriotiro es obligatorio')
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
alerta.style.display = 'none';


socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;
});

socket.on('ultimo-ticket', (ultimo) => {
});

socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes === 0) {
        alerta.style.display = '';
    } else {
        alerta.style.display = 'none';
        lblPendientes.innerText = pendientes;
    }
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});


btnAtender.addEventListener('click', () => {

    socket.emit('atender-ticket', { escritorio }, ({ok, ticket, msg}) => {
        if (!ok) {
            lblTicket.innerHTML = 'Nadie';
            return alerta.style.display = '';
        }

        lblTicket.innerHTML = 'Ticket ' + ticket.numero;
    });

});