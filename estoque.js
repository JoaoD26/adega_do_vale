const content = document.getElementById('content');
const URL = 'http://localhost/adega_do_vale/api/produtos';
fetch( URL, {method: 'GET'})
    .then(resp => resp.json())
    .then(data => mostrarResposta(data))
    .catch(erro => alert(erro));
        
popupAdicionar();
popupAlterar();
popupExcluir();
function mostrarResposta(data) {
    console.log(data);
    if (data.status != "sucess"){
        alert(erro);
    }else{
        criarVitrine(data.information);} 
        
    function criarVitrine(conteudo){
        conteudo.forEach(item => {
            let produto = document.createElement('div');
            produto.className = 'produto';
                            
            let id = document.createElement('div');
            id.className = 'grupo id';
            id.textContent = item.id_produto;

            let nome = document.createElement('div');
            nome.className = 'grupo nome';
            nome.textContent = item.nome;
                            
            let preco = document.createElement('div');
            preco.className = 'grupo preço';
            preco.textContent = 'R$ ' + item.preco.replace(/\./g, ',');

            let tipo = document.createElement('div');
            tipo.className = 'grupo tipo';
            tipo.textContent = item.tipo;

            let imagem = document.createElement('label');
            imagem.className = 'grupo imagem';
            imagem.textContent = item.imagem;

            let quantidade = document.createElement('div');
            quantidade.className = 'grupo quantidade';
            quantidade.textContent = item.quantidade;
                        
            content.appendChild(produto);
            produto.appendChild(id);
            produto.appendChild(nome);
            produto.appendChild(tipo);
            produto.appendChild(preco);
            produto.appendChild(imagem);
            produto.appendChild(quantidade);
        });
    }
}function popupAdicionar(){
    const tela = $('#adicionar');
        const btnsair = $('#sair');
        const btnabrir = $('#abrir1');

        btnabrir.on('click', function() {
            tela.css('display', 'flex');
        });
        btnsair.on('click', function() {
            tela.css('display', 'none');
        });
        $(document).on('click', function(event) {
            if (event.target === tela[0]) {
                tela.css('display', 'none');
            }
        });
}function popupAlterar() {
    const tela = $('#alterar');
    const btnsair = $('#sair1');
    const btnabrir = $('#abrir');

    btnabrir.on('click', function() {
        tela.css('display', 'flex');
    });
    btnsair.on('click', function() {
        tela.css('display', 'none');
    });
    $(document).on('click', function(event) {
        if (event.target === tela[0]) {
            tela.css('display', 'none');
        }
    });
}function popupExcluir() {
    const tela = $('#excluir');
    const btnsair = $('#sair2');
    const btnabrir = $('#abrir2');

    btnabrir.on('click', function() {
        tela.css('display', 'flex');
    });
    btnsair.on('click', function() {
        tela.css('display', 'none');
    });
    $(document).on('click', function(event) {
        if (event.target === tela[0]) {
            tela.css('display', 'none');
        }
    });
}
function adicionar(event, form){
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const imagem = document.getElementById('imagem').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const dados = { 
        nome: nome,  
        tipo: tipo,
        preco: preco, 
        imagem: imagem,
        quantidade: quantidade 
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',            
        },
        body: JSON.stringify(dados),
    };
    if ( nome != "" && tipo != "" && preco != "" && imagem != "" && quantidade != "") {         
            const URL = 'http://localhost/adega_do_vale/api/produtos';
            fetch(URL , options)
                .then(resp => resp.json())                                        
                .then(data => mostrarRespostaAdd(data))
                .catch(erro => console.log(erro));            
    }
}
function mostrarRespostaAdd(data,form){
    console.log(data) ; 
    if (data.status == "sucess"){
        alert("Produto cadastrado");
        location.reload();
        const tela = document.getElementById("adicionar");
        const btnadicionar = document.getElementById("add");
        btnadicionar.addEventListener('click', function () {
        tela.style.display = 'none';
    });
    } else {
        alert("Erro ao cadastrar");
    }  
    if (form) {
        form.reset();
    }                                
}
function alterar(event, form){
    event.preventDefault();
    const id_produto = parseInt(document.getElementById('id-alt').value);
    const nome = document.getElementById('nome-alt').value;
    const tipo = document.getElementById('tipo-alt').value;
    const preco = parseFloat(document.getElementById('preco-alt').value);
    const imagem = document.getElementById('imagem-alt').value;
    const quantidade = parseInt(document.getElementById('quantidade-alt').value);
    const dados = { 
        id_produto: id_produto,
        nome: nome,  
        tipo: tipo,
        preco: preco, 
        imagem: imagem,
        quantidade: quantidade 
    };
    const options = {
        method: 'PUT', 
        headers: {
        'Content-Type': 'application/json',            
        },
        body: JSON.stringify(dados),
    };
    console.log(options);

    if (id_produto != "" ) { 
            const URL = 'http://localhost/adega_do_vale/api/produtos/' + id_produto;
            fetch(URL, options)
                .then(resp => {
                    if (resp.ok) {
                        return resp.json();
                    } else {
                        throw new Error("Erro na requisição");
                    }
                })
                .then(data => mostrarRespostaAlterar(data))
                .catch(erro => {
                    console.error(erro);
                    alert("Erro ao alterar dados");
                });            
    }
}
function mostrarRespostaAlterar(data){
    console.log(data);      
    if (data.status == "sucess"){              
        alert("Dados alterados");
        location.reload();
        const tela = document.getElementById("excluir");
        const btnalterar = document.getElementById("alt");
        btnalterar.addEventListener('click', function () {
        tela.style.display = 'none';
    });
    } else {
        alert("Erro ao alterar dados");
    }
}        
function excluir(event, form){
    event.preventDefault();
    const id_produto = parseInt(document.getElementById('id-exc').value);

    if ( id_produto != "" ) {            
            const URL = 'http://localhost/adega_do_vale/api/produtos/'+ id_produto;                    

             fetch( URL , {method: 'DELETE'} ) 
                .then(resp => resp.json())                                    
                .then(data => mostrarRespostaDelete(data))
                .catch(erro => console.log(erro));            
    }
}

function mostrarRespostaDelete(data){
    console.log(data) ;       
    if(data.status == "sucess"){
        alert("Produto Excluído");
        location.reload();
        const tela = document.getElementById("excluir");
        const btnexcluir = document.getElementById("exc");
        btnexcluir.addEventListener('click', function () {
        tela.style.display = 'none';
    });
    } else {
        alert("Erro ao excluir");
    }           
} 