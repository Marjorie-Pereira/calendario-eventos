import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    
    constructor(params) {
        super(params);
        this.setTitle("Eventos");
    }

    async getHtml() {
        const response = await fetch('http://localhost:5050/events')
        const eventos = await response.json();
        console.log(eventos)

        return `
            <div class="container">
                <button class="primary novo-evento">
                    <a href="/novo_evento" data-link> novo evento </a>
                </button>
                <h1>Eventos ativos</h1>
                <div class="eventos-ativos">
                    ${eventos.map((evento) => 
                        `<div class="evento">
                            <div class="evento-img">
                                ${evento.image ? `<img src="${evento.image}" alt="event_cover" />` : ''}
                            </div>
                            
                            <div class="evento-info">
                                <h3>${evento.name}</h3>
                                <p>${evento.start_time} - ${evento.end_time}</p>
                                <button class="primary ver-mais">
                                    <a href="/eventos/${evento._id}" data-link>Ver mais</a>
                                </button>
                            </div>
                        </div>`
                    ).join('')}
                </div>
            </div>  
        `
    }
}