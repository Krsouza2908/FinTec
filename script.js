/* --- CONTROLE DAS ABAS --- */
function abrirTab(event, tabName) {
    // Esconde todos os conteúdos
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    // Remove a classe 'active' de todos os links
    const tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Mostra a aba clicada e adiciona 'active' ao link
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

/* --- LÓGICA DO FORMULÁRIO DE DENÚNCIA --- */
document.getElementById('form-denuncia').addEventListener('submit', async function(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const anexosInput = document.getElementById('anexos');
    const btn = event.target.querySelector('button[type="submit"]');
    const btnOriginalText = btn.innerHTML;

    btn.innerHTML = 'Enviando...';
    btn.disabled = true;

    // ----- SIMULAÇÃO DE BACKEND -----
    // Em um site real, aqui você usaria 'fetch' para enviar os dados
    // O JSZip (que você importou) seria usado aqui para compactar os arquivos.
    console.log("Título:", titulo);
    console.log("Descrição:", descricao);
    console.log("Arquivos:", anexosInput.files);
    
    // Simulando o envio e o recebimento de um protocolo
    setTimeout(() => {
        // Gera um protocolo falso
        const protocoloFalso = `2025-PRT-${Math.floor(Math.random() * 10000)}`;
        
        // Limpa o formulário
        document.getElementById('form-denuncia').reset();
        btn.innerHTML = btnOriginalText;
        btn.disabled = false;
        
        // Mostra um alerta de sucesso com o protocolo
        alert(`Denúncia enviada com sucesso!\n\nSeu número de protocolo é: ${protocoloFalso}\n\nGuarde este número para acompanhar sua denúncia.`);

    }, 1500); // Simula 1.5s de espera
});

/* --- LÓGICA DO FORMULÁRIO DE ACOMPANHAMENTO --- */
function buscarProtocolo(event) {
    event.preventDefault();
    const protocolo = document.getElementById('protocolo').value;
    const areaAndamento = document.getElementById('area-andamento');

    if (!protocolo) {
        alert("Por favor, insira um número de protocolo.");
        return;
    }

    console.log("Buscando protocolo:", protocolo);

    // ----- SIMULAÇÃO DE BACKEND -----
    // Aqui, o 'fetch' buscaria os dados do protocolo
    
    // Apenas simula a busca e exibe a área de chat
    areaAndamento.style.display = "block";
    
    // Atualiza o título (opcional)
    areaAndamento.querySelector('h3').textContent = `Detalhes do Caso: #${protocolo}`;
}

// Garante que a primeira aba esteja visível ao carregar
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fazer-denuncia').style.display = 'block';
});