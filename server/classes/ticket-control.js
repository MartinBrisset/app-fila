const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }
}

class TicketControl {

    constructor() {
        
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosTickets = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy){

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosTickets = data.ultimosTickets;

        } else {
            this.reiniciarConteo();
        }

    }

    siguiente(){

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;

    }

    getUltimoTicket() {

        return `Ticket ${ this.ultimo }`;

    }

    getUltimosTickets() {

        return this.ultimosTickets;
        
    }

    atenderTicket(escritorio){

        if(this.tickets.length === 0){
            return 'no hay tickets'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        
        this.ultimosTickets.unshift(atenderTicket);

        if(this.ultimosTickets.length > 4 ){
            this.ultimosTickets.splice(-1,1);
        }

        console.log('ultimos 4');
        console.log(this.ultimosTickets);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {
        
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosTickets = [];

        console.log('Se inicio el sistema');
        this.grabarArchivo();
       
    }

    grabarArchivo(){

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosTickets: this.ultimosTickets
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

}

module.exports = {
    TicketControl
}