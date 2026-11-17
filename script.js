 console.log('Olá! O JavaScript da Minha Loja foi carregado com sucesso.');
 const nomeDaLoja = 'Doceria G&G';

    // Número (number): sem aspas. Será alterado, então usamos let.
    let quantidadeNoCarrinho = 0;
    let totalNoCarrinho = 0;

    // Verdadeiro ou falso (boolean): só aceita true ou false.
    const lojaAberta = true;

    // Template string: texto entre crases (`) que aceita variáveis
    // dentro de ${ }. Muito mais fácil que juntar textos com "+".
    console.log(`A loja "${nomeDaLoja}" está aberta? ${lojaAberta}`);

    // typeof mostra o TIPO de um valor (string, number, boolean...).
    console.log(typeof nomeDaLoja, typeof quantidadeNoCarrinho, typeof lojaAberta);


    // ==========================================================
    // PASSO 3: SELECIONAR ELEMENTOS DA PÁGINA (DOM)
    // ==========================================================
    // O DOM é a página HTML transformada em objetos que o
    // JavaScript consegue encontrar e alterar.
    //
    // document.querySelector('#nome') procura UM elemento.
    //   '#' procura por id; '.' procura por classe.
    // document.querySelectorAll('.classe') procura TODOS.

    // Elementos do carrinho
    const contadorCarrinho = document.querySelector('#contador-carrinho');
    const totalCarrinho = document.querySelector('#total-carrinho');
    const aviso = document.querySelector('#aviso');

    // Botões dos produtos (querySelectorAll devolve uma lista)
    const botoesComprar = document.querySelectorAll('.botao-brilho');
    const botoesDetalhes = document.querySelectorAll('.botao-detalhes');

    // Elementos da janela de detalhes (modal)
    const modal = document.querySelector('#modal');
    const modalTitulo = document.querySelector('#modal-titulo');
    const modalDescricao = document.querySelector('#modal-descricao');
    const modalPreco = document.querySelector('#modal-preco');
    const modalComprar = document.querySelector('#modal-comprar');
    const modalFechar = document.querySelector('#modal-fechar');

    // Botão do modo escuro
    const botaoTema = document.querySelector('#botao-tema');

    // Elementos da seção de introdução (testes 1 e 2)
    //const botaoDemo = document.querySelector('#botao-demo');
    //const resultadoDemo = document.querySelector('#resultado-demo');
    //const campoNomeDemo = document.querySelector('#campo-nome-demo');
    //const botaoSaudacao = document.querySelector('#botao-saudacao');
    //const resultadoSaudacao = document.querySelector('#resultado-saudacao');

    // Elementos do formulário
    const formulario = document.querySelector('#formulario-contato');
    const campoNome = document.querySelector('#nome');
    const mensagemFormulario = document.querySelector('#mensagem-formulario');


    // ==========================================================
    // PASSO 4: ARRAY E OBJETOS (OS DADOS DA LOJA)
    // ==========================================================
    // Um ARRAY é uma lista, escrita entre colchetes [ ].
    // Um OBJETO é uma ficha com propriedades, escrita entre
    // chaves { } no formato nome: valor.
    // Aqui temos um array de objetos: uma lista de fichas de produto.
    //
    // O "id" de cada produto é o mesmo número usado no data-id do HTML.
    const produtos = [
      {
        id: 1,
        nome: 'Banoffee (Fatia)',
        preco: 12.00,
        descricao: 'Banoffee deliciosa, feita com banana, doce de leite e chantilly.'
      },
      {
        id: 2,
        nome: 'Torta de Limão (Fatia)',
        preco: 15.00,
        descricao: 'Torta de limão fresca, perfeita para qualquer ocasião.'
      },
      {
        id: 3,
        nome: 'Torta de Maçã (Fatia)',
        preco: 18.00,
        descricao: 'Torta de maçã caseira, com recheio de canela e cobertura de açúcar.'
      },
      {
        id: 4,
        nome: 'Torta Cookie (Fatia)',
        preco: 10.00,
        descricao: 'Torta de cookie crocante, com recheio de chocolate e cobertura de açúcar.'
      }
    ];


    // ==========================================================
    // PASSO 5: FUNÇÕES
    // ==========================================================
    // Uma FUNÇÃO é um bloco de código com nome, que você escreve
    // uma vez e usa quantas vezes quiser.
    //   function nome(parametros) { ... }
    // Parâmetros são os dados que a função recebe.
    // return devolve um resultado para quem chamou a função.

    // --- Função 1: transforma um número em preço (ex.: 1400 vira R$ 1.400,00)
    function formatarPreco(valor) {
      // toLocaleString formata o número no padrão do Brasil.
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // --- Função 2: mostra um aviso rápido na tela
    // Esta variável guarda o "cronômetro" do aviso. Usamos let porque
    // o valor muda a cada aviso.
    let temporizadorAviso;

    function mostrarAviso(texto) {
      // Escreve o texto dentro do elemento de aviso
      aviso.textContent = texto;
      // Adiciona a classe "visivel": o CSS faz o aviso aparecer
      aviso.classList.add('visivel');
      // Cancela um cronômetro antigo, se existir (evita sumir cedo demais)
      clearTimeout(temporizadorAviso);
      // setTimeout executa a função depois de um tempo (2500 ms = 2,5 s)
      temporizadorAviso = setTimeout(() => {
        // Remove a classe: o aviso desaparece
        aviso.classList.remove('visivel');
      }, 2500);
    }

    // --- Função 3: atualiza o resumo do carrinho na tela
    function atualizarCarrinho() {
      // textContent troca o texto de um elemento
      contadorCarrinho.textContent = quantidadeNoCarrinho;
      totalCarrinho.textContent = formatarPreco(totalNoCarrinho);
    }

    // --- Função 4: coloca um produto no carrinho
    function adicionarAoCarrinho(idDoProduto) {
      // find percorre o array e devolve o PRIMEIRO produto cujo id combina.
      // "item => item.id === idDoProduto" é uma arrow function (função curta).
      // === compara valor E tipo.
      const produto = produtos.find(item => item.id === idDoProduto);

      // Condicional: se não achou o produto (valor "undefined"), avisa e para.
      // O "!" significa "não".
      if (!produto) {
        console.log('Produto não encontrado: ' + idDoProduto);
        return; // return sem valor encerra a função aqui
      }

      // ++ soma 1 à variável.
      quantidadeNoCarrinho++;
      // += soma o preço ao total (é o mesmo que total = total + preço).
      totalNoCarrinho += produto.preco;

      // Mostra os novos valores na tela e avisa o usuário
      atualizarCarrinho();
      mostrarAviso(`${produto.nome} foi adicionado ao carrinho!`);

      // Registra no console para o programador acompanhar
      console.log(`Carrinho: ${quantidadeNoCarrinho} item(ns), total ${formatarPreco(totalNoCarrinho)}`);
    }


    // ==========================================================
    // PASSO 6: EVENTOS (REAGIR AO CLIQUE)
    // ==========================================================
    // Um EVENTO é algo que acontece na página (clique, tecla, envio).
    // addEventListener('evento', função) significa:
    //   "quando este evento acontecer, execute esta função".
    // A função entregue se chama CALLBACK.

    // forEach repete o código para CADA botão da lista.
    botoesComprar.forEach((botao) => {
      botao.addEventListener('click', () => {
        // dataset.id lê o valor de data-id do HTML.
        // Ele chega como TEXTO, então convertemos para número com Number().
        const idDoProduto = Number(botao.dataset.id);
        adicionarAoCarrinho(idDoProduto);
      });
    });


    // ==========================================================
    // PASSO 7: JANELA DE DETALHES (MODAL)
    // ==========================================================
    // Guarda qual produto está aberto na janela.
    // null significa "nenhum valor" (a janela começa fechada).
    let produtoAberto = null;

    function abrirModal(idDoProduto) {
      const produto = produtos.find(item => item.id === idDoProduto);
      if (!produto) {
        return;
      }

      // Guarda o produto atual
      produtoAberto = produto;

      // Preenche a janela com os dados do produto
      modalTitulo.textContent = produto.nome;
      modalDescricao.textContent = produto.descricao;
      modalPreco.textContent = formatarPreco(produto.preco);

      // A classe "aberto" faz o CSS mostrar a janela
      modal.classList.add('aberto');
      // Leva o foco do teclado para o botão de fechar (acessibilidade)
      modalFechar.focus();
    }

    function fecharModal() {
      // Remove a classe: a janela some
      modal.classList.remove('aberto');
      produtoAberto = null;
    }

    // Botões "Detalhes": abrem a janela do produto correspondente
    botoesDetalhes.forEach((botao) => {
      botao.addEventListener('click', () => {
        abrirModal(Number(botao.dataset.id));
      });
    });

    // Botão "Fechar"
    modalFechar.addEventListener('click', fecharModal);

    // Botão "Adicionar ao carrinho" dentro da janela
    modalComprar.addEventListener('click', () => {
      // Só age se houver um produto aberto
      if (produtoAberto !== null) {
        adicionarAoCarrinho(produtoAberto.id);
        fecharModal();
      }
    });

    // Clicar na parte escura (fora da caixa branca) também fecha.
    // "evento" é um objeto que descreve o que aconteceu;
    // evento.target é o elemento que recebeu o clique.
    modal.addEventListener('click', (evento) => {
      if (evento.target === modal) {
        fecharModal();
      }
    });

    // Apertar a tecla Esc (Escape) fecha a janela.
    // O evento 'keydown' acontece quando uma tecla é pressionada.
    document.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape') {
        fecharModal();
      }
    });


    // ==========================================================
    // PASSO 8: MODO ESCURO (E MEMÓRIA COM localStorage)
    // ==========================================================
    // classList.toggle('escuro') funciona como um interruptor:
    // se a classe existe, remove; se não existe, adiciona.
    // O CSS muda as cores quando o body tem a classe "escuro".
    //
    // localStorage é um pequeno armário do navegador: guarda dados
    // mesmo depois de fechar a página. Só guarda TEXTO.

    // Função que ajusta o texto do botão conforme o tema atual
    function atualizarTextoDoTema() {
      // classList.contains devolve true se a classe existe
      const estaEscuro = document.body.classList.contains('escuro');
      // Operador ternário: condição ? valorSeVerdadeiro : valorSeFalso
      botaoTema.textContent = estaEscuro ? 'Modo claro' : 'Modo escuro';
    }

    // Ao abrir a página: se o tema guardado era o escuro, aplica de novo
    if (localStorage.getItem('tema') === 'escuro') {
      document.body.classList.add('escuro');
    }
    atualizarTextoDoTema();

    // Ao clicar no botão: alterna o tema e guarda a escolha
    botaoTema.addEventListener('click', () => {
      // toggle devolve true se a classe ficou ligada
      const escuro = document.body.classList.toggle('escuro');
      localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
      atualizarTextoDoTema();
    });


    // ==========================================================
    // PASSO 9: OS TESTES DA SEÇÃO "INTRODUÇÃO AO JAVASCRIPT"
    // ==========================================================

    // --- TESTE 1: contador de cliques ---
    // Variável que conta os cliques. Começa em zero.
    //let cliquesDemo = 0;

    //botaoDemo.addEventListener('click', () => {
      //cliquesDemo++; // soma 1 a cada clique

      // if / else: o programa escolhe um caminho.
      //if (cliquesDemo === 1) {
        //resultadoDemo.textContent = 'Você clicou 1 vez!';
      //} else {
        //resultadoDemo.textContent = `Você clicou ${cliquesDemo} vezes!`;
      //}
    //});

    // --- TESTE 2: ler o que o usuário digitou ---
    botaoSaudacao.addEventListener('click', () => {
      // .value lê o texto do campo.
      // .trim() remove espaços do começo e do fim.
      const nome = campoNomeDemo.value.trim();

      // Se o nome estiver vazio (''), pede para digitar.
      if (nome === '') {
        resultadoSaudacao.textContent = 'Digite o seu nome primeiro.';
      } else {
        resultadoSaudacao.textContent = `Olá, ${nome}! Seja bem-vindo à ${nomeDaLoja}.`;
      }
    });


    // ==========================================================
    // PASSO 10: VALIDAR O FORMULÁRIO
    // ==========================================================
    // O evento 'submit' acontece quando o formulário é enviado.
    // Por padrão, o navegador recarregaria a página.
    // evento.preventDefault() cancela esse comportamento, e assim
    // podemos verificar os dados antes.
    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();

      // Lê o nome digitado, sem espaços nas pontas
      const nome = campoNome.value.trim();

      // .length conta quantas letras o texto tem
      if (nome.length < 3) {
        mensagemFormulario.textContent = 'Digite um nome com pelo menos 3 letras.';
        // className troca a classe do elemento: o CSS pinta de vermelho
        mensagemFormulario.className = 'erro';
        return; // encerra aqui: não continua se houver erro
      }

      // Se chegou até aqui, está tudo certo
      mensagemFormulario.textContent = `Obrigado, ${nome}! Recebemos a sua mensagem.`;
      mensagemFormulario.className = 'sucesso';

      // reset() limpa todos os campos do formulário
      formulario.reset();
    });