import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    
    constructor(params) {
        super(params);
        this.setTitle("Novo Evento");
    }

    async getHtml() {
        const response = await fetch('http://localhost:5050/events')
        const eventos = await response.json();
        const evento = eventos.find((evento) => evento._id == this.params.id)

        return `
            <div class="container form-container">
               <form>
                    <div class="container form-container">
                        <h1>Editar Evento</h1>
                        <label for="event-name">
                            Nome:
                            <input type="text" id="event-name" name="name" required value="${evento.name}" />
                        </label>
                        <label for="event-image">
                            Imagem:
                            <input type="file" id="event-image" name="image" value="${evento.image}" />
                        </label>
                        <label for="event-description">
                            Descrição:
                            <input type="text" id="event-description" name="description" required value="${evento.description}" />
                        </label>
                        <label for="event-time">
                            Horário:
                            <label for="start_time">
                                Inicio:
                                <input type="time" id="start_time" name="start_time" required value="${evento.start_time}" />
                            </label>
                            <label for="end_time">
                                Fim:
                                <input type="time" id="end_time" name="end_time" required  value="${evento.end_time}"/>
                            </label>
                        </label>
                        <label for="location">
                            Local:
                            <input type="text" id="location" name="location" required value="${evento.location}" />
                        </label>
                        <button class="primary" id="salvar-edicao-btn" type="submit">Salvar</button>
                        <button class="danger">
                            <a href="/" data-link>Cancelar</a>
                        </button>
                    </div> 
                </form>
            </div> 
        `
    }
}