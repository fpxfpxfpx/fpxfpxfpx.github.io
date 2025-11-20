let questions = [
    { question: "Qual é a comida favorita do seu parceiro?", options: ["Pizza", "Hambúrguer", "Sushi", "Churrasco"], correctIndex: 0 },
    { question: "Qual foi a primeira viagem que fizeram juntos?", options: ["Praia", "Serra", "Cidade grande", "Parque temático"], correctIndex: 1 },
    { question: "Qual é o filme favorito do seu namorado(a)?", options: ["Comédia", "Ação", "Romance", "Terror"], correctIndex: 0 },
    { question: "Quem disse 'eu te amo' primeiro?", options: ["Eu", "Meu parceiro(a)", "Ambos juntos", "Ainda não dissemos"], correctIndex: 1 },
    { question: "Qual música marcou o começo do relacionamento?", options: ["Pop", "Rock", "Sertanejo", "Rap"], correctIndex: 3 },
    { question: "Qual é o hobby favorito do seu parceiro(a)?", options: ["Esportes", "Jogos", "Leitura", "Culinária"], correctIndex: 1 },
    { question: "Qual é a bebida favorita do seu namorado(a)?", options: ["Refrigerante", "Suco", "Cerveja", "Vinho"], correctIndex: 0 },
    { question: "Qual é a cor preferida do seu parceiro(a)?", options: ["Azul", "Vermelho", "Verde", "Preto"], correctIndex: 0 },
    { question: "Quem é mais ciumento?", options: ["Eu", "Meu parceiro(a)", "Ambos", "Nenhum"], correctIndex: 0 },
    { question: "Qual o signo do seu namorado(a)?", options: ["Áries", "Touro", "Leão", "Peixes"], correctIndex: 3 },
    { question: "Qual tipo de presente ele(a) prefere?", options: ["Flores", "Chocolates", "Roupas", "Surpresa criativa"], correctIndex: 3 },
    { question: "Qual o animal favorito do seu parceiro(a)?", options: ["Gato", "Cachorro", "Pássaro", "Peixe"], correctIndex: 1 },
    { question: "Qual série ele(a) mais gosta?", options: ["Friends", "Stranger Things", "Game of Thrones", "The Office"], correctIndex: 1 },
    { question: "Qual é a comida que ele(a) não gosta?", options: ["Brócolis", "Cenoura", "Tomate", "Alface"], correctIndex: 0 },
    { question: "Quem leva mais tempo para se arrumar?", options: ["Eu", "Meu parceiro(a)", "Ambos igual", "Nenhum"], correctIndex: 1 },
    { question: "Qual tipo de filme ele(a) prefere?", options: ["Romance", "Ação", "Comédia", "Suspense"], correctIndex: 2 },
    { question: "Qual a data do aniversário do namoro?", options: ["Janeiro", "Fevereiro", "Março", "Abril"], correctIndex: 2 },
    { question: "Quem manda mais mensagens no WhatsApp?", options: ["Eu", "Meu parceiro(a)", "Igual", "Nenhum"], correctIndex: 0 },
    { question: "Qual é o jeito preferido de passar o final de semana?", options: ["Cinema", "Parque", "Casa", "Festa"], correctIndex: 2 },
    { question: "Quem é mais bagunceiro?", options: ["Eu", "Meu parceiro(a)", "Ambos", "Nenhum"], correctIndex: 0 },
    { question: "Qual é o lugar dos sonhos para viajar juntos?", options: ["Praia", "Montanha", "Cidade histórica", "Cruzeiro"], correctIndex: 0 },
    { question: "Qual é a sobremesa favorita do seu parceiro(a)?", options: ["Sorvete", "Bolo", "Chocolate", "Frutas"], correctIndex: 2 },
    { question: "Quem costuma dar mais presentes?", options: ["Eu", "Meu parceiro(a)", "Igual", "Nenhum"], correctIndex: 1 },
    { question: "Quem costuma cozinhar mais?", options: ["Eu", "Meu parceiro(a)", "Ambos", "Nenhum"], correctIndex: 2 },
    { question: "Quem é mais romântico(a)?", options: ["Eu", "Meu parceiro(a)", "Ambos", "Nenhum"], correctIndex: 1 },
    { question: "Qual é o maior medo do seu parceiro(a)?", options: ["Altura", "Escuro", "Insetos", "Perder alguém"], correctIndex: 3 },
    { question: "Quem é mais preguiçoso(a)?", options: ["Eu", "Meu parceiro(a)", "Ambos", "Nenhum"], correctIndex: 0 },
    { question: "Quem planeja mais o futuro?", options: ["Eu", "Meu parceiro(a)", "Ambos", "Nenhum"], correctIndex: 1 },
    { question: "Quem é mais vaidoso(a)?", options: ["Eu", "Meu parceiro(a)", "Ambos", "Nenhum"], correctIndex: 1 },
    { question: "Quem costuma esquecer datas importantes?", options: ["Eu", "Meu parceiro(a)", "Ambos", "Nenhum"], correctIndex: 0 }
];


const container = document.querySelector(".flex-1.bg-gradient-to-b");
let score = 0;
let selectedAnswer = null;

// Elemento para mostrar pontuação
const scoreDisplay = document.createElement("div");
scoreDisplay.className = "fixed top-4 right-4 bg-yellow-300 text-red-700 px-4 py-2 rounded-lg text-xl font-bold shadow-lg";
scoreDisplay.innerText = `Pontos: ${score}`;
document.body.appendChild(scoreDisplay);

// Função para criar perguntas aleatórias
function createQuestionRandom(questions) {
    if (questions.length === 0) {
        container.innerHTML = `<div class="text-center text-3xl text-white font-bold mt-20">Fim do quiz! Pontos finais: ${score}</div>`;
        return;
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const questionObj = questions.splice(randomIndex, 1)[0]; // remove do array
    createQuestion(questionObj, questions);
}

// Cria a pergunta e as opções
function createQuestion(questionObj, questions) {
    container.innerHTML = "";

    const question = createQuestionElement(questionObj.question);
    container.appendChild(question);

    questionObj.options.forEach((option, index) => {
        const answer = createAnswerElement(option, index);
        setupAnswerClick(answer, questionObj, questions);
        container.appendChild(answer);
    });
}

function createQuestionElement(text) {
    const question = document.createElement("div");
    question.className = `
        w-full max-w-[900px] mx-auto
        cursor-pointer
        bg-gradient-to-b from-red-500 to-red-700
        text-white text-2xl font-semibold text-center
        rounded-xl px-6 py-6
        border-4 border-blue-900
        shadow-[0_0_25px_rgba(0,0,0,0.5)]
        animate__animated animate__fadeInLeft animate__delay-1s
    `.replace(/\s+/g, ' ').trim();
    question.innerText = text;
    return question;
}

function createAnswerElement(option, index) {
    const answer = document.createElement("div");
    answer.setAttribute("data-id", index);
    answer.className = `
        w-full max-w-[900px] mx-auto mt-6
        cursor-pointer
        bg-gradient-to-b from-red-500 to-red-700
        border-4 border-blue-900 rounded-xl
        px-6 py-5 flex items-center gap-5
        shadow-[0_0_25px_rgba(0,0,0,0.5)]
        animate__animated animate__fadeInLeft animate__delay-${index + 1}s
        transition-all duration-300
        hover:border-yellow-400 hover:opacity-100 hover:brightness-100
        relative
        overflow-hidden
    `.replace(/\s+/g, ' ').trim();

    const numberCircle = document.createElement("div");
    numberCircle.className = "w-10 h-10 bg-white rounded-full flex items-center justify-center";
    const number = document.createElement("span");
    number.className = "text-blue-700 font-bold text-lg";
    number.innerText = index + 1;
    numberCircle.appendChild(number);
    answer.appendChild(numberCircle);

    const answerText = document.createElement("span");
    answerText.className = "text-white text-lg";
    answerText.innerText = option;
    answer.appendChild(answerText);

    return answer;
}

function setupAnswerClick(answer, questionObj, questions) {
    answer.addEventListener("click", () => {
        document.querySelectorAll(".option-selected").forEach(el => {
            el.classList.remove("option-selected");
            el.style.background = "";
            const oldButton = el.querySelector(".confirm-btn");
            if (oldButton) oldButton.remove();
        });

        answer.classList.add("option-selected");
        answer.style.background = "#facc15";

        if (!answer.querySelector(".confirm-btn")) {
            const confirmButton = createConfirmButton(answer, questionObj, questions);
            answer.appendChild(confirmButton);
            requestAnimationFrame(() => {
                confirmButton.style.transform = "translateX(0)";
            });
            selectedAnswer = { element: answer, confirmButton };
        }
    });
}

function createConfirmButton(answer, questionObj, questions) {
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    confirmButton.className = `
        confirm-btn
        absolute top-0 right-0 bottom-0
        w-30
        bg-green-500 text-white
        flex items-center justify-center
        rounded-l
        cursor-pointer
        transition-transform duration-500 ease-out
        z-10
        shadow-sm
    `.replace(/\s+/g, ' ').trim();
    confirmButton.style.transform = "translateX(100%)";

    confirmButton.addEventListener("click", (e) => {
        e.stopPropagation();
        answer.classList.remove("animate__fadeInLeft");
        answer.className = answer.className.replace(/animate__delay-\ds/g, '');
        document.querySelectorAll("[data-id]").forEach(opt => opt.style.pointerEvents = "none");
        confirmButton.remove();
        answer.style.background = "#facc15";
        answer.style.borderColor = "#f59e0b";
        answer.classList.add("animate__animated", "animate__flash", "animate__infinite");

        setTimeout(() => {
            answer.classList.remove("animate__animated", "animate__flash", "animate__infinite");
            document.querySelectorAll("[data-id]").forEach(opt => {
                if (Number(opt.dataset.id) === questionObj.correctIndex) {
                    opt.style.background = "#22c55e";
                    opt.style.borderColor = "#16a34a";
                } else if (opt.classList.contains("option-selected")) {
                    opt.style.background = "#f87171";
                    opt.style.borderColor = "#b91c1c";
                }
            });

            if (isAnswerCorrect(answer.dataset.id, questionObj.correctIndex)) {
                score++;
                scoreDisplay.innerText = `Pontos: ${score}`;
            }

            setTimeout(() => {
                createQuestionRandom(questions);
            }, 2000);
        }, 1000);
    });

    return confirmButton;
}

function isAnswerCorrect(answer, answerCorrect) {
    return Number(answerCorrect) === Number(answer);
}

// Exemplo de uso: passe seu array de perguntas aqui
createQuestionRandom(questions);
