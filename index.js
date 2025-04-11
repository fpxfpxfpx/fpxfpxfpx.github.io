// Função para tratar os dados e organizar por mês e nome.
const tratarDados = dados => {
    const dadosTratados = dados.reduce((acumulador, dadoJogador) => {
        let { id, nome, pontos, data } = dadoJogador;

        nome = nome.toLowerCase();
        pontos = Number(pontos);
        let anoMes = data.slice(0, 7); // Ex: "2025-04"

        if (!acumulador[anoMes]) {
            acumulador[anoMes] = [];
        }

        let pessoaExiste = acumulador[anoMes].find(pessoa => pessoa.nome === nome);
        if (pessoaExiste) {
            pessoaExiste.pontos += pontos;
        } else {
            acumulador[anoMes].push({ id, nome, pontos });
        }

        return acumulador;
    }, {});

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

            // Botão de visualização (olho)
            const btnOlho = document.createElement("button");
            btnOlho.innerHTML = `<i class="bi bi-eye-fill"></i>`;
            btnOlho.setAttribute("class", "btn btn-info me-2");
            btnOlho.onclick = () => {
                let info = buscarJogadorPeloNome(obterDadosDoLocalStorage(), dado.nome);

                if (info.length > 0) {
                    const tabela = `
                        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Data</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Pontos</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f4f4f4;">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${info.map(d => {
                                    return `
                                        <tr>
                                            <td style="border: 1px solid #ddd; padding: 8px;">${d.data}</td>
                                            <td style="border: 1px solid #ddd; padding: 8px;">${d.pontos}</td>
                                            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                                                <button onclick="editarEntradaPorId(${d.id})" class="btn btn-warning btn-sm me-1">
                                                    <i class="bi bi-pencil-fill"></i>
                                                </button>
                                                <button onclick="deletarEntradaPorId(${d.id})" class="btn btn-danger btn-sm">
                                                    <i class="bi bi-trash3-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    `;

                    Swal.fire({
                        title: `Aparições de ${dado.nome}`,
                        html: tabela,
                        icon: 'info',
                        confirmButtonText: 'Fechar',
                        width: '600px',
                        customClass: {
                            popup: 'swal-popup',
                            title: 'swal-title'
                        }
                    });
                } else {
                    Swal.fire({
                        title: `Aparições de ${dado.nome}`,
                        html: 'Nenhuma aparição encontrada.',
                        icon: 'info',
                        confirmButtonText: 'Fechar'
                    });
                }
            };

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
    nome = nome.toLowerCase();
    return dados.filter(dado => dado.nome.toLowerCase() === nome);
};

// Função para apagar jogador por ID.
const deletarEntradaPorId = (id) => {
    let infoPlayers = JSON.parse(localStorage.getItem("infoPlayers")) || [];
    infoPlayers = infoPlayers.filter(jogador => jogador.id !== id);
    localStorage.setItem("infoPlayers", JSON.stringify(infoPlayers));
    Swal.fire("Excluído!", "A entrada foi removida.", "success").then(() => {
        location.reload();
    });
};

// Função para editar a entrada de um jogador
const editarEntradaPorId = (id) => {
    let infoPlayers = JSON.parse(localStorage.getItem("infoPlayers")) || [];
    let jogador = infoPlayers.find(jogador => jogador.id === id);
    if (jogador) {
        Swal.fire({
            title: `Editar dados de ${jogador.nome}`,
            html: `
                <input type="text" id="editNome" class="swal2-input" value="${jogador.nome}" placeholder="Nome">
                <input type="number" id="editPontos" class="swal2-input" value="${jogador.pontos}" placeholder="Pontos">
                <input type="date" id="editData" class="swal2-input" value="${jogador.data.split('T')[0]}" placeholder="Data">
            `,
            confirmButtonText: 'Salvar',
            showCancelButton: true,
            preConfirm: () => {
                const nome = document.getElementById("editNome").value;
                const pontos = document.getElementById("editPontos").value;
                const data = document.getElementById("editData").value;

                // Atualiza a entrada no localStorage
                const index = infoPlayers.findIndex(jogador => jogador.id === id);
                if (index !== -1) {
                    infoPlayers[index].nome = nome;
                    infoPlayers[index].pontos = pontos;
                    infoPlayers[index].data = data;
                    localStorage.setItem("infoPlayers", JSON.stringify(infoPlayers));
                    Swal.fire("Atualizado!", "Os dados foram atualizados.", "success").then(() => {
                        location.reload();
                    });
                }
            }
        });
    }
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
    const dadosTratados = tratarDados(obterDadosDoLocalStorage());
    Object.keys(dadosTratados).forEach(mes => {
        const opcao = document.createElement("option");
        opcao.value = mes;
        opcao.textContent = mes;
        SelecaoMes.appendChild(opcao);
    });

    selecionarUltimoValor();

    // Mostrar a tabela inicial do mês mais recente
    const mesSelecionado = SelecaoMes.value;
    content.innerHTML = "";
    content.appendChild(criarTabelaDados(tratarDados(obterDadosDoLocalStorage())[mesSelecionado] || []));
});

// Evento para atualizar a tabela com os dados selecionados.
SelecaoMes.addEventListener("input", e => {
    const infoJogadores = tratarDados(obterDadosDoLocalStorage());
    content.innerHTML = "";
    content.appendChild(criarTabelaDados(infoJogadores[e.target.value] || []));
});

// Função para selecionar o último valor do select.
function selecionarUltimoValor() {
    const selecaoMes = document.getElementById('SelecaoMes');
    const ultimoValor = selecaoMes.options[selecaoMes.options.length - 1].value;
    selecaoMes.value = ultimoValor;
}

// Formulário para adicionar jogador.
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
    }).then(() => {
        location.reload();
    });
});
