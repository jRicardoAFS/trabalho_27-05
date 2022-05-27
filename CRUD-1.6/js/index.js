const form = document.querySelector('#inProdutos');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;


// salvando
const atualizarLS = (produtos) => { localStorage.setItem('produtos', JSON.stringify(produtos)) };

//recuperando produtos 
const recuperarLS = () => JSON.parse(localStorage.getItem('produtos') || '[]');

const salvar = (event) => {
    event.preventDefault()
    const nome = form.nome.value;
    const preco = Number(form.preco.value);
    const prime = form.estado.checked;


    if (idx == 'novo') {
        const produtos = recuperarLS();
        produtos.push({ id: produtos.length + 1, nome, preco, prime });
        atualizarLS(produtos);
        preencherTabela();
        form.reset();

    } else {
        let produto = { id: idx, nome, preco, prime }
        atualizarProduto(idx, produto);
        preencherTabela();
        form.reset();
        idx = 'novo';
    }



}

const preencherTabela = () => {
    const produtos = recuperarLS();
    tabela.innerHTML = ''
    for (const produto of produtos) {
        tabela.innerHTML += `
    
    <tr>
    <div >
        <th scope="row" class="um">${produto.id}</th>
        <td>${produto.nome}</td>
        <td>${produto.preco}</td>
        <td >${produto.prime ? "Sim" : "Não"}</td>
    </div>
        <td>
            <img type="button" width = "20" src= "../img/lapis.png"  onclick = "editarProduto(${produto.id})"> 
            <img type="button" width = "20" src= "../img/lixo.png" onclick = "removerProduto(${produto.id})"> 
        </td>
       
    </tr>
    
    `;
    }
}
const removerProduto = (id) => {
    const produtos = recuperarLS();
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    if (indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    atualizarLS(produtos);
    preencherTabela()
}

const editarProduto = (id) => {
    const produtos = recuperarLS();
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    form.nome.value = produtos[indexProduto].nome;
    form.preco.value = produtos[indexProduto].preco;
    form.prime.checked = produtos[indexProduto].prime;
    idx = id;

}
const atualizarProduto = (id, produto) => {
    const produtos = recuperarLS()
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    produtos[indexProduto] = produto;
    atualizarLS(produtos)

}

form.addEventListener('submit', salvar)
document.addEventListener('DOMContentLoaded', preencherTabela)