import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    
    constructor(params) {
        super(params);
        this.setTitle("Login");
    }

    async getHtml() {
        
        return `
            <h1>Bem-Vindo</h1>
            <p class="erro"></p>
            <img src="" alt="user-icon">
            <label>
                Usuário:
                <input type="text">
            </label>
            <label>
                Senha:
                <input type="password" minlength="8">
                
            </label>
            <a href="/" data-link>Entrar</a>
            <a href="/cadastro" data-link class="cadastre-se">Cadastrar-se</a>
        `
    }
}