let questions = [
    { question: "Qual é a comida favorita do seu parceiro?", options: ["Churrasco", "Sushi", "Hambúrguer", "Pizza"], correctIndex: 3 }, // Pizza
    { question: "Qual foi a primeira viagem que vocês fizeram juntos?", options: ["Campo", "Serra", "Praia", "Cidade grande"], correctIndex: 2 }, // Praia
    { question: "Qual é a cor favorita do seu parceiro?", options: ["Preto", "Verde", "Vermelho", "Azul"], correctIndex: 3 }, // Azul
    { question: "Qual é o filme ou série favorita do seu parceiro?", options: ["Stranger Things", "Friends", "Supernatural", "The Witcher"], correctIndex: 2 }, // Supernatural
    { question: "Qual é o doce ou sobremesa favorita do seu parceiro?", options: ["Chocolate", "Sorvete", "Brigadeiro", "Torta de limão"], correctIndex: 3 }, // Torta de limão
    { question: "Qual é o hobby ou passatempo favorito do seu parceiro?", options: ["Esportes", "Música", "Ler", "PC"], correctIndex: 3 }, // PC
    { question: "Qual é a música ou banda favorita do seu parceiro?", options: ["Bohemian Rhapsody", "Imagine", "Stairway to Heaven", "Come Together"], correctIndex: 3 }, // Come Together
    { question: "Qual é o animal favorito do seu parceiro?", options: ["Gato", "Pássaro", "Coelho", "Cachorro"], correctIndex: 3 }, // Cachorro
    { question: "Qual é a estação do ano favorita do seu parceiro?", options: ["Outono", "Primavera", "Verão", "Inverno"], correctIndex: 3 }, // Inverno
    { question: "Qual é o sabor de sorvete favorito do seu parceiro?", options: ["Morango", "Napolitano", "Chocolate", "Flocos"], correctIndex: 3 }, // Flocos
    { question: "Qual é o lugar dos sonhos que seu parceiro gostaria de visitar?", options: ["Austrália", "Japão", "Itália", "Canadá"], correctIndex: 3 }, // Canadá
    { question: "Qual é a bebida favorita do seu parceiro?", options: ["Água", "Chá", "Suco", "Refrigerante"], correctIndex: 3 }, // Refrigerante
    { question: "Qual é o personagem de filme ou série favorito do seu parceiro?", options: ["Homem-Aranha", "Batman", "Sherlock", "Doutor Estranho"], correctIndex: 3 }, // Doutor Estranho
    { question: "Qual é o lanche rápido favorito do seu parceiro?", options: ["Hambúrguer", "Pizza", "Hot dog", "Lanche de frango"], correctIndex: 3 }, // Lanche de frango
    { question: "Qual é o estilo de música favorito do seu parceiro?", options: ["Rock", "Sertanejo", "Eletrônica", "Pop"], correctIndex: 3 }, // Pop
    { question: "Qual é o esporte ou time favorito do seu parceiro?", options: ["Futebol", "Tênis", "Basquete", "Nenhum"], correctIndex: 3 }, // Nenhum
    { question: "Qual é a fruta favorita do seu parceiro?", options: ["Banana", "Laranja", "Maçã", "Uva"], correctIndex: 3 }, // Uva
    { question: "Qual é o sabor de chocolate favorito do seu parceiro?", options: ["Branco", "Amargo", "Ao leite", "Nenhum"], correctIndex: 3 }, // Nenhum
    { question: "Qual é o tipo de clima que seu parceiro mais gosta?", options: ["Quente", "Chuvoso", "Ameno", "Frio"], correctIndex: 3 }, // Frio
    { question: "Qual é o dia da semana favorito do seu parceiro?", options: ["Sexta-feira", "Quarta-feira", "Domingo", "Sábado"], correctIndex: 3 } // Sábado
];



function playMP3(fileName) {
    // Cria um objeto de áudio com o arquivo passado
    const audio = new Audio(fileName);

    // Toca o áudio
    audio.play()
        .then(() => console.log(`${fileName} está tocando!`))
        .catch(err => console.error('Erro ao tocar o áudio:', err));

    // Retorna o objeto de áudio caso queira controlar (pausar, parar) depois
    return audio;
}



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
                // Array de sons possíveis
                const correctSounds = ['acertou.mp3', 'nice.mp3'];

                // Escolhe aleatoriamente um
                const soundToPlay = correctSounds[Math.floor(Math.random() * correctSounds.length)];

                // Toca o som escolhido
                playMP3(soundToPlay);

                // Atualiza pontuação
                score++;
                scoreDisplay.innerText = `Pontos: ${score}`;
            } else {
                const correctSounds = ['preto.mp3', 'burro.mp3'];

                // Escolhe aleatoriamente um
                const soundToPlay = correctSounds[Math.floor(Math.random() * correctSounds.length)];

                // Toca o som escolhido
                playMP3(soundToPlay);
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
