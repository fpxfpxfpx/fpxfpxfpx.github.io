// Função para tratar os dados e organizar por mês e nome.
const tratarDados = dados => {
    const dadosTratados = dados.reduce((acumulador, dadoJogador) => {
        let { id, nome, pontos, data } = dadoJogador;

        // Convertendo o nome para lowercase
        nome = nome.toLowerCase();

        pontos = Number(pontos);
        let anoMes = data.slice(0, 7); // Ex: "2025-04"
        if (!acumulador[anoMes]) {
            acumulador[anoMes] = [];
        }

        // Verificando se já existe o jogador com o mesmo nome (case-insensitive)
        let pessoaExiste = acumulador[anoMes].find(pessoa => pessoa.nome === nome);
        if (pessoaExiste) {
            pessoaExiste.pontos += pontos;
        } else {
            acumulador[anoMes].push({ id, nome, pontos });
        }

        return acumulador;
    }, {});

    // Ordenando os dados por pontos
    Object.keys(dadosTratados).forEach(anoMes => {
        dadosTratados[anoMes].sort((a, b) => b.pontos - a.pontos);
    });

    return dadosTratados;
};

// Função para criar a tabela de dados.
const criarTabelaDados = (dadosJogadores) => {
    const tabela = document.createElement("table");
    tabela.setAttribute("class", "table table-striped text-center");

    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");

    const cabecalhos = ["Rank", "Nome", "Pontos", "Ação"];
    cabecalhos.forEach(cabecalho => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = cabecalho;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);
    tabela.appendChild(thead);

    const tbody = document.createElement("tbody");

    if (dadosJogadores && dadosJogadores.length > 0) {
        dadosJogadores.forEach((dado, index) => {
            const tr = document.createElement("tr");

            const th = document.createElement("th");
            th.scope = "row";
            th.textContent = index + 1;
            tr.appendChild(th);

            const tdNome = document.createElement("td");
            tdNome.textContent = dado.nome;
            tr.appendChild(tdNome);

            const tdPontos = document.createElement("td");
            tdPontos.textContent = dado.pontos;
            tr.appendChild(tdPontos);

            const tdAcao = document.createElement("td");

            const btnLixo = document.createElement("button");
            btnLixo.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
            btnLixo.setAttribute("class", "btn btn-danger");
            btnLixo.onclick = () => {
                if (confirm(`Tem certeza que deseja excluir o jogador: ${dado.nome}?`)) {
                    apagarJogadorPorId(dado.id);
                    alert(`Jogador ${dado.nome} excluído com sucesso.`);
                    const infoJogadores = tratarDados(obterDadosDoLocalStorage());
                    content.innerHTML = "";
                    content.appendChild(criarTabelaDados(infoJogadores[SelecaoMes.value] || [])); // Fallback para [] vazio
                }
            };

            // Alterando a função do botão de olho para melhorar a exibição das aparições
            const btnOlho = document.createElement("button");
            btnOlho.innerHTML = `<i class="bi bi-eye-fill"></i>`;
            btnOlho.setAttribute("class", "btn btn-info");
            btnOlho.onclick = () => {
                let info = buscarJogadorPeloNome(obterDadosDoLocalStorage(), dado.nome);

                // Se houver aparições
                if (info.length > 0) {
                    // Criação de uma tabela para exibir as aparições de forma mais estruturada
                    const tabela = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Data</th>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Pontos</th>
                    </tr>
                </thead>
                <tbody>
                    ${info.map(d => {
                        const dataFormatada = new Date(d.data).toLocaleDateString('pt-BR'); // Formato brasileiro de data
                        return `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${dataFormatada}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${d.pontos}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;

                    // Exibe o Swal com a tabela
                    Swal.fire({
                        title: `Aparições de ${dado.nome}`,
                        html: tabela,  // Insere a tabela formatada
                        icon: 'info',
                        confirmButtonText: 'Fechar',
                        width: '600px', // Ajusta o tamanho da janela
                        customClass: {
                            popup: 'swal-popup',
                            title: 'swal-title'
                        }
                    });
                } else {
                    // Caso não haja aparições
                    Swal.fire({
                        title: `Aparições de ${dado.nome}`,
                        html: 'Nenhuma aparição encontrada.',
                        icon: 'info',
                        confirmButtonText: 'Fechar'
                    });
                }
            };

            tdAcao.appendChild(btnLixo);
            tdAcao.appendChild(btnOlho);

            tr.appendChild(tdAcao);
            tbody.appendChild(tr);
        });
    } else {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.setAttribute("colspan", "4");
        td.textContent = "Nenhum dado disponível";
        tr.appendChild(td);
        tbody.appendChild(tr);
    }

    tabela.appendChild(tbody);
    return tabela;
};

// Função para buscar jogador pelo nome.
const buscarJogadorPeloNome = (dados, nome) => {
    // Convertendo o nome para lowercase para comparar sem distinguir maiúsculas/minúsculas
    nome = nome.toLowerCase();
    return dados.filter(dado => dado.nome.toLowerCase() === nome);
};

// Função para apagar jogador do localStorage.
const apagarJogadorPorId = (id) => {
    let infoPlayers = JSON.parse(localStorage.getItem("infoPlayers")) || [];
    infoPlayers = infoPlayers.filter(jogador => jogador.id !== id);
    localStorage.setItem("infoPlayers", JSON.stringify(infoPlayers));
};

// Função para salvar dados no localStorage.
const salvarNoLocalStorage = (nome, pontos, data) => {
    let infoPlayers = JSON.parse(localStorage.getItem("infoPlayers")) || [];
    const ultimoId = infoPlayers.length > 0 ? infoPlayers[infoPlayers.length - 1].id : 0;
    const novoId = ultimoId + 1;

    const novoJogador = { id: novoId, nome, pontos, data };
    infoPlayers.push(novoJogador);
    localStorage.setItem("infoPlayers", JSON.stringify(infoPlayers));
};

// Função para obter dados do localStorage.
const obterDadosDoLocalStorage = () => {
    const dados = localStorage.getItem("infoPlayers");
    return dados ? JSON.parse(dados) : [];
};

// Adiciona opções para os meses no `select`.
document.addEventListener("DOMContentLoaded", () => {
    Object.keys(tratarDados(obterDadosDoLocalStorage())).forEach(mes => {
        const opcao = document.createElement("option");
        opcao.value = mes;
        opcao.textContent = mes;
        SelecaoMes.appendChild(opcao);
    });
});

// Evento para atualizar a tabela com os dados selecionados.
SelecaoMes.addEventListener("input", e => {
    const infoJogadores = tratarDados(obterDadosDoLocalStorage());
    content.innerHTML = "";
    content.appendChild(criarTabelaDados(infoJogadores[e.target.value] || [])); // Fallback para [] vazio
});

// Função para selecionar o último valor do select.
function selecionarUltimoValor() {
    const selecaoMes = document.getElementById('SelecaoMes');

    // Pega o último valor do select
    const ultimoValor = selecaoMes.options[selecaoMes.options.length - 1].value;

    // Define esse valor como o selecionado
    selecaoMes.value = ultimoValor;
}

// Função do formulário para salvar jogador.
const formulario = document.getElementById("meuFormulario");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("name").value;
    const pontos = document.getElementById("points").value;
    const data = document.getElementById("date").value;

    salvarNoLocalStorage(nome, pontos, data);
    formulario.reset();
    Swal.fire({
        title: "Sucesso!",
        text: "Jogador adicionado!",
        icon: "success"
    });
    location.reload();
});
