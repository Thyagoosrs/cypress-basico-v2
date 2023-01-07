/// <reference types="Cypress" />

// const { last } = require("cypress/types/lodash")

//npm run cy:open
//npm run test

//O Describe é meu cenário/suite de testes
describe('Central de Atendimento ao Cliente TAT', function () {
    //no beforeEach posso deixar por exemplo o cy.visit e algo de renderizacao do browser, será executado para cada teste
    beforeEach(function () {
        cy.visit('./src/index.html')
    })



    it('verifica o título da aplicação', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'

        cy.get('#firstName').type('Thyago')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('teste@teste.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        //Concatenando elementos. Aqui pegando um button, que contem tambem o elemento type = submit
        // cy.get('input[type="text"]').type('Olá mundo!')

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Thyago')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('teste@teste,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        //O .error e uma classe
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function () {
        //Para pegar por ID
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Thyago')
        cy.get('#lastName').type('Rodrigues')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Preenche inputs, valida inputs e limpa inputs
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').type('Thyago').should('have.value', 'Thyago').clear().should('have.value', '')
        cy.get('#lastName').type('Rodrigues').should('have.value', 'Rodrigues').clear().should('have.value', '')
        cy.get('#email').type('teste@teste.com').should('have.value', 'teste@teste.com').clear().should('have.value', '')
        cy.get('#phone').type('123456789').should('have.value', '123456789').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('butt', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmut()

        cy.get('.success').should('be.visible')
    })

    it('select exercicio 1', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('select selecionando pelo valor, e nao pelo texto', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('select selecionando pelo índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento Feedback', function () {
        //IMPORTANTE: Concatenando elementos para encontrá-los na página
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        //LER SOBRE cy.each e cy.wrap

        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

        // cy.get('input[type="radio"][value="ajuda"]').check().should('have.value', 'ajuda')
        // cy.get('input[type="radio"][value="elogio"]').check().should('have.value', 'elogio')
        // cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            /*O Invoke aqui está retirando a propriedade target (responsável por abrir o link em outra aba) do item 'a' (ancor)
            Ao remover esta propriedade target da ancora, o cypress, ao clicar no item, carrega-o na mesma aba, possibilitando
            a interacao com esta nova aba.*/
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

})