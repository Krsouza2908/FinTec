/* ================================================= */
/* LÓGICA DAS ABAS (Funções do HTML)                 */
/* ================================================= */

// Função para mostrar/esconder campos de identificação
function toggleIdentificacao() {
    var checkbox = document.getElementById('anonimo');
    var campos = document.getElementById('campos-identificacao');
    if (checkbox.checked) {
        campos.style.display = 'none';
    } else {
        campos.style.display = 'block';
    }
}

// Função para trocar as abas
function abrirTab(evt, nomeTab) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(nomeTab).style.display = "block";
    if (evt) {
        evt.currentTarget.className += " active";
    } else {
        document.querySelector(`.tab-link[onclick*="'${nomeTab}'"]`).className += " active";
    }
}

// Função para SIMULAR a busca de protocolo
function buscarProtocolo(event) {
    event.preventDefault(); 
    alert(
        "Função indisponível.\n\n" +
        "Este é um simulador. A denúncia foi salva como .ZIP no seu computador, " +
        "mas não foi enviada a um servidor. Por isso, não é possível 'acompanhar' o status."
    );
}


/* ================================================= */
/* LÓGICA DO ENVIO (CRIANDO UM .ZIP)                 */
/* ================================================= */

const formDenuncia = document.getElementById('form-denuncia');
const submitButton = formDenuncia.querySelector('button[type="submit"]');

// A função de envio agora é "async" para poder "esperar" os arquivos
formDenuncia.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão
    submitButton.textContent = 'Gerando...';
    submitButton.disabled = true;

    try {
        // 1. Pegar dados de TEXTO
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        // 2. Pegar dados de ARQUIVO
        const inputAnexos = document.getElementById('anexos');
        const arquivos = inputAnexos.files; // Esta é a lista de arquivos de foto/video

        // 3. Gerar Protocolo
        const protocolo = `PROTO-${Date.now()}`;

        // 4. Formatar o arquivo .TXT
        const dadosTexto = `
=========================================
PROTOCOLO: ${protocolo}
DATA: ${new Date().toLocaleString('pt-BR')}

TÍTULO: ${titulo}
DESCRIÇÃO: ${descricao}

IDENTIFICAÇÃO:
NOME: ${nome || 'Anônimo'}
EMAIL: ${email || 'Anônimo'}
=========================================\n
`;

        // 5. INICIAR O CRIADOR DE .ZIP
        const zip = new JSZip();

        // 6. Adicionar o arquivo .TXT dentro do .ZIP
        zip.file(`denuncia-${protocolo}.txt`, dadosTexto);

        // 7. Adicionar os ANEXOS (fotos/videos) dentro do .ZIP
        if (arquivos.length > 0) {
            const pastaAnexos = zip.folder("anexos"); // Cria uma subpasta "anexos"
            
            for (let i = 0; i < arquivos.length; i++) {
                const arquivo = arquivos[i];
                // 'arrayBuffer' lê o conteúdo binário do arquivo (a foto em si)
                const buffer = await arquivo.arrayBuffer(); 
                pastaAnexos.file(arquivo.name, buffer);
            }
        }

        // 8. Gerar o arquivo .ZIP final
        const conteudoZip = await zip.generateAsync({ type: "blob" });

        // 9. Forçar o Download do .ZIP
        baixarArquivo(conteudoZip, `denuncia-${protocolo}.zip`);
        
        // 10. Avisar o usuário
        alert(
            `Denúncia Gerada com Sucesso!\n\n` +
            `O arquivo "denuncia-${protocolo}.zip" foi salvo na sua pasta de Downloads.\n\n` +
            `Este .zip contém o .txt com seu relato E os arquivos de anexo.`
        );

        // 11. Limpar e mudar de aba
        formDenuncia.reset();
        toggleIdentificacao(); 
        abrirTab(null, 'acompanhar-denuncia');
        document.getElementById('protocolo').value = protocolo;

    } catch (error) {
        console.error('Falha ao gerar .zip:', error);
        alert('Houve um erro ao gerar o arquivo de denúncia.');
    } finally {
        submitButton.textContent = 'Enviar Denúncia com Segurança';
        submitButton.disabled = false;
    }
});


/**
 * Função auxiliar para forçar o download de um arquivo
 * @param {Blob} conteudo - O conteúdo do arquivo (o .zip)
 * @param {string} nomeArquivo - O nome que o arquivo terá (ex: "denuncia.zip")
 */
function baixarArquivo(conteudo, nomeArquivo) {
    const linkDownload = document.createElement("a");
    linkDownload.href = URL.createObjectURL(conteudo);
    linkDownload.download = nomeArquivo;
    document.body.appendChild(linkDownload);
    linkDownload.click();
    document.body.removeChild(linkDownload);
}