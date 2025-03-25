import AbstractView from "./AbstractView.js";
 

export default class extends AbstractView {
    
    constructor(params) {
        super(params);
        this.setTitle("Novo Evento");
    }

    async getHtml() {
        
        return `
            <form>
                <div class="container form-container">
                    <h1>Novo Evento</h1>
                    <label for="event-name">
                        Nome:
                        <input type="text" id="event-name" name="name" required />
                    </label>
                    <label for="event-image">
                        Imagem:
                        <input type="file" id="event-image" name="image"/>
                    </label>
                    <label for="event-description">
                        Descrição:
                        <input type="text" id="event-description" name="description" required />
                    </label>
                    <label for="event-time">
                        Horário:
                        <label for="start_time">
                            Inicio:
                            <input type="time" id="start_time" name="start_time" required />
                        </label>
                        <label for="end_time">
                            Fim:
                            <input type="time" id="end_time" name="end_time" required />
                        </label>
                    </label>
                    <label for="location">
                        Local:
                        <input type="text" id="location" name="location" required />
                    </label>
                    <button class="primary" id="salvar-evento-btn" type="submit">Salvar</button>
                    <button class="danger">
                        <a href="/" data-link>Cancelar</a>
                    </button>
                </div> 
            </form>
            
        `
    }
    
}

