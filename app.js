function consultaCep() {
    const cep = document.querySelector('#cep').value;
    const dadosEndereco = document.querySelector('#dados-endereco');
    if (cep.length !== 8 || isNaN(cep)) {
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(json => {
            if (json.erro) {
                alert('CEP não encontrado.');
                dadosEndereco.innerHTML = '';
                return;
            }
            const endereco = `
                <p><strong>CEP:</strong> ${json.cep}</p>
                <p><strong>Logradouro:</strong> ${json.logradouro}</p>
                <p><strong>Bairro:</strong> ${json.bairro}</p>
                <p><strong>Cidade:</strong> ${json.localidade}</p>
                <p><strong>Estado:</strong> ${json.uf}</p>
                <p><strong>IBGE:</strong> ${json.ibge}</p>
                <p><strong>DDD:</strong> ${json.ddd}</p>
            `;
            dadosEndereco.innerHTML = endereco;
        })
        .catch(error => {
            alert('Erro ao consultar o CEP. Tente novamente mais tarde.');
            console.error('Erro:', error);
        });
}

function salvarEndereco() {
    const dadosEndereco = document.getElementById('dados-endereco').innerHTML;
    if (!dadosEndereco) {
        alert('Não há dados para salvar.');
        return;
    }
    localStorage.setItem('endereco', dadosEndereco);
    alert('Endereço salvo com sucesso!');
}

function excluirEndereco() {
    localStorage.removeItem('endereco');
    document.getElementById('dados-endereco').innerHTML = '';
    alert('Endereço excluído com sucesso!');
}

// local Storage quando a página é carregada
window.onload = function() {
    const dadosSalvos = localStorage.getItem('endereco');
    if (dadosSalvos) {
        document.getElementById('dados-endereco').innerHTML = dadosSalvos;
    }
}
