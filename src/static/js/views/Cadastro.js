import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    
    constructor(params) {
        super(params);
        this.setTitle("Cadastro de usuário");
    }

    async getHtml() {
        
        return `
            <h1>Novo Cadastro</h1>
            <p class="erro"></p>
            <label>
                Foto de perfil:
                <input type="file">
            </label>
            <label>
                Usuário:
                <input type="text">
            </label>
            <label>
                Senha:
                <input type="password" minlength="8" placeholder="8 ou mais caracteres">
                
            </label>
            <a href="/" data-link>Cadastrar e entrar</a>
        
        `
    }
}