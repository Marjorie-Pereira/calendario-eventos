import Home from "./views/Home.js";
import NovoEvento from "./views/NovoEvento.js";
import Login from "./views/Login.js";
import Cadastro from "./views/Cadastro.js";
import Evento from "./views/Evento.js";
import EditarEvento from "./views/EditarEvento.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
}

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        {path: "/", view: Home},
        {path: "/eventos/:id", view: Evento},
        {path: "/novo_evento", view: NovoEvento},
        {path: "/editar_evento/:id", view: EditarEvento},
        {path: "/cadastro", view: Cadastro},
        {path: "/login", view: Login},
    ]

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    })

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if(!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }

    const view = new match.route.view(getParams(match));
    


    document.querySelector("#app").innerHTML = await view.getHtml();

    const matchPath = match.route.path;
    switch(matchPath) {
        case "/novo_evento":
            document.getElementById("salvar-evento-btn").addEventListener("click", (e) => {
                e.preventDefault();
                const inputsObrigatorios = document.querySelectorAll("[required]");
                if (verificarInputs(inputsObrigatorios)) {
                    fazerRequisicao();
                } else alert("Preencha todos os campos!");
                
              
            })
            break;
        case "/editar_evento/:id":
            document.getElementById('salvar-edicao-btn').addEventListener('click', (e) => {
                e.preventDefault();
                const inputsObrigatorios = document.querySelectorAll("[required]");
                if (verificarInputs(inputsObrigatorios)) {
                    fazerRequisicao("PATCH", getParams(match).id);
                } else alert("Preencha todos os campos!");
            })
            break;
        case "/eventos/:id":
            document.getElementById('deletar-btn').addEventListener('click', (e) => {
                const resposta = confirm("Tem certeza que deseja deletar o evento?");
                if(!resposta) return;
                fazerRequisicao("DELETE", getParams(match).id);
            })
            break;
        
    }
    
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
});

function fazerRequisicao(method = "POST", id = null) {
    let msg;
    switch(method) {
        case "POST":
            msg = "Evento criado com sucesso!";
            break;
        case "PATCH":
            msg = "Evento editado com sucesso!";
            break;
        case "DELETE":
            msg = "Evento deletado com sucesso!";
            break;
    }

    fetch(` http://localhost:5050/events/${id}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: method === 'DELETE' ? null : JSON.stringify({
            name: document.getElementById('event-name').value,
            image: document.getElementById('event-image').value,
            description: document.getElementById('event-description').value,
            start_time: document.getElementById('start_time').value,
            end_time: document.getElementById('end_time').value,
            location: document.getElementById('location').value
        })
    }).then((response) => {
        if(response.ok) {
            alert(msg);
            method === "PATCH" ? navigateTo("/eventos/" + id) : navigateTo("/");
        } else {
            alert("Erro completar a requisição!");
        }
    })
}

function verificarInputs(inputsObrigatorios) {
    const inputsVazios = [];

    inputsObrigatorios.forEach(input => {
        if(input.value === "") {
            input.classList.add("error");  
            inputsVazios.push(input);

        } else {
            input.classList.remove("error");
            
        }
    })

    return inputsVazios.length > 0 ? false : true
}