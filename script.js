// Loading

window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('escondido');
    }, 600);
});




const elementos = document.querySelectorAll('.card, #hero h2, #hero p, #hero .btn, #sobre p, #contato p');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
        }
    });
}, {threshold: 0.1});

elementos.forEach((elemento) => {
    observador.observe(elemento);
});

// Modal
const modal = document.getElementById('modal');
const abrirModal = document.getElementById('abrir-modal');
const fecharModal = document.getElementById('modal-fechar');
const botoesServico = document.querySelectorAll('.modal-btn');

if (abrirModal) {
    abrirModal.addEventListener('click', () => {
        modal.classList.add('ativo');
    });

    fecharModal.addEventListener('click', () => {
        modal.classList.remove('ativo');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('ativo');
        }
    });

    botoesServico.forEach((botao) => {
        botao.addEventListener('click', () => {
            const servico = botao.dataset.servico;
            const mensagem = encodeURIComponent(`Olá, Tenho interesse em um ${servico}.`);
            window.location.href = 'https://www.instagram.com/GCreateOficial';
            modal.classList.remove('ativo');
        });
    });
}

const links = document.querySelectorAll('nav ul li a');
const paginaAtual = window.location.pathname.split('/').pop();

links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === paginaAtual || (paginaAtual === '' && href === 'index.html')) {
        link.classList.add('ativo');
    }
});


// FAQ
const perguntas = document.querySelectorAll('.faq-pergunta');

perguntas.forEach((pergunta) => {
    pergunta.addEventListener('click', () => {
        const item = pergunta.parentElement;
        item.classList.toggle('aberto');
    });
});

// Avatar - Falas

const pagina = window.location.pathname;

let mensagens = [];

if (pagina.includes("sobre")) {
    mensagens = [
        "Conheça a história da GCreate.",
        "Transformamos ideias em experiências digitais.",
        "Nosso foco é criar sites modernos e profissionais."
    ];
}
else if (pagina.includes("servicos")) {
    mensagens = [
        "Conheça nossos serviços.",
        "Criamos sites institucionais, portfólios e landing pages.",
        "Soluções sob medida para o seu negócio."
    ];
}
else if (pagina.includes("portfolio")) {
    mensagens = [
        "Confira alguns dos nossos projetos.",
        "Cada site é desenvolvido com atenção aos detalhes.",
        "Seu projeto pode ser o próximo destaque aqui."
    ];
}
else if (pagina.includes("contato")) {
    mensagens = [
        "Vamos conversar sobre seu projeto?",
        "Solicite um orçamento sem compromisso.",
        "Estamos prontos para transformar sua ideia em realidade."
    ];
}
else {
    // Início
    mensagens = [
        "Olá! Eu sou o Gee da GCreate 👋",
        "Criamos sites modernos e profissionais.",
        "Seu projeto merece uma presença digital forte.",
        "Solicite um orçamento sem compromisso 🚀"
    ];
}

const speech = document.getElementById("speech");

let mensagemAtual = 0;
let letraAtual = 0;

function escreverTexto() {

    speech.textContent = "";

    const texto = mensagens[mensagemAtual];

    let intervalo = setInterval(() => {

        speech.textContent += texto.charAt(letraAtual);

        letraAtual++;

        if (letraAtual >= texto.length) {

            clearInterval(intervalo);

            setTimeout(() => {

                letraAtual = 0;
                mensagemAtual = (mensagemAtual + 1) % mensagens.length;

                escreverTexto();

            }, 3000);

        }

    }, 50);
}

escreverTexto();

// Formulário
const formOrcamento = document.getElementById('form-orcamento');

if (formOrcamento) {
    formOrcamento.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const servico = document.getElementById('tipo-servico').value;
        const descricao = document.getElementById('descricao').value;

        let texto = `Olá! Meu nome é ${nome}. \nGostaria de um orçamento para: ${servico}. `;

        if(descricao) {
            texto += `\nDescrição do Projeto: ${descricao}` ;
        }

        const temp = document.createElement('textarea');
        temp.value = texto;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);


            alert('Mensagem copiada! Cole no chat do Instagram.');
            Window.location.href = 'https://www.instagram.com/GCreateOficial' ;
            modal.classList.remove("ativo");
        });

        
    }