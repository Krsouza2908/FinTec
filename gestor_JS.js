// Dados Falsos (Mock Data) - Isso viria do seu banco de dados
// Agora inclui "titulo" e "descricao" como no seu formulário
const FAKE_REPORTS_FROM_DB = [
    { 
        id: 1, 
        protocolo: '2025-PRT-1234', 
        titulo: 'Fraude no setor X', 
        descricao: 'O funcionário Y está alterando os relatórios financeiros para cobrir perdas. Tenho provas em anexo.', 
        risk: 'nao-classificado', 
        date: '2025-11-13' 
    },
    { 
        id: 2, 
        protocolo: '2025-PRT-5678', 
        titulo: 'Problema de Segurança', 
        descricao: 'A porta dos fundos está com a tranca quebrada há uma semana e ninguém arruma.', 
        risk: 'medio', 
        date: '2025-11-12' 
    },
    { 
        id: 3, 
        protocolo: '2025-PRT-9012', 
        titulo: 'Assédio moral', 
        descricao: 'Comentários inadequados e gritos feitos pelo gerente Z na reunião de equipe de ontem.', 
        risk: 'alto', 
        date: '2025-11-11' 
    }
];

window.addEventListener('load', function() {
    renderReports(FAKE_REPORTS_FROM_DB); // Carrega todos ao iniciar

    // Adiciona o evento ao filtro
    document.getElementById('filtro-risco').addEventListener('change', function() {
        const filtro = this.value;
        if (filtro === 'todos') {
            renderReports(FAKE_REPORTS_FROM_DB);
        } else {
            const reportsFiltrados = FAKE_REPORTS_FROM_DB.filter(report => report.risk === filtro);
            renderReports(reportsFiltrados);
        }
    });
});

function renderReports(reports) {
    const container = document.getElementById('reportsContainer');
    container.innerHTML = ''; // Limpa o "Carregando..."

    if (reports.length === 0) {
        container.innerHTML = '<p>Nenhuma denúncia encontrada para este filtro.</p>';
        return;
    }

    reports.forEach(report => {
        // Cria o "card" para cada denúncia
        const card = document.createElement('div');
        card.className = `report-card risk-${report.risk}`;
        card.setAttribute('data-id', report.id);

        card.innerHTML = `
            <h3>${report.titulo}</h3>
            <small>Protocolo: ${report.protocolo} | Recebido em: ${report.date}</small>
            <p>${report.descricao}</p>
            <div classclass="anexos-placeholder">
                <small><i>(Simulação: ${Math.floor(Math.random() * 3) + 1} arquivos anexos)</i></small>
            </div>
            <div class="risk-classifier">
                <label for="risk-${report.id}">Classificar Risco:</label>
                <select id="risk-${report.id}" class="risk-select">
                    <option value="nao-classificado" ${report.risk === 'nao-classificado' ? 'selected' : ''}>Não Classificado</option>
                    <option value="baixo" ${report.risk === 'baixo' ? 'selected' : ''}>Baixo</option>
                    <option value="medio" ${report.risk === 'medio' ? 'selected' : ''}>Médio</option>
                    <option value="alto" ${report.risk === 'alto' ? 'selected' : ''}>Alto</option>
                </select>
            </div>
        `;

        // Adiciona o evento para mudar a cor da borda ao classificar
        const riskSelect = card.querySelector('.risk-select');
        riskSelect.addEventListener('change', function(event) {
            const newRisk = event.target.value;
            card.className = `report-card risk-${newRisk}`; // Muda a classe da borda
            
            // Atualiza o dado "fake" (para o filtro funcionar)
            const reportInDb = FAKE_REPORTS_FROM_DB.find(r => r.id === report.id);
            if(reportInDb) {
                reportInDb.risk = newRisk;
            }
            
            console.log(`Denúncia #${report.id} atualizada para Risco: ${newRisk}`);
            // Aqui iria a chamada 'fetch' para salvar no backend
        });

        container.appendChild(card);
    });
}