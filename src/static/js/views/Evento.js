import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    async getEvento() {
        const response = await fetch('http://localhost:5050/events')
        const eventos = await response.json();
        const evento = eventos.find((evento) => evento._id == this.params.id)
        
        return evento;
    }
    
    constructor(params) {
        super(params);
        this.getEvento().then((evento) => this.setTitle(evento.name))
    }

    async getHtml() {

        const evento = await this.getEvento();

        return `
            <div class="evento-img">
                <img src="${evento.image}" alt="event_cover" />
            </div>
            
            <div class="container evento-container">
                <h1>${evento.name}</h1>
                <p>Descrição:</p>
                <p>${evento.description}</p>
                <p>Horário:</p>
                <p>${evento.start_time} - ${evento.end_time}</p>
                <p>Local:</p>
                <p>${evento.location}</p>
                <button class="primary editar-btn" id="editar-btn">
                    <a href="/editar_evento/${evento._id}" data-link>Editar</a>
                </button>
                <button class="danger deletar-btn" id="deletar-btn">Deletar</button>
            </div>
            
            
        `
    }
}