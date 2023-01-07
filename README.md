# cypress-basico-v2

Sample project for the basic course of the Talking About Testing online school.

## Pre-requirements

Antes de começar, garanta que os seguintes sistemas estejam instalados em seu computador.

- [git](https://git-scm.com/) (estou usando a versão `2.34.1` enquanto escrevo esta aula)
- [Node.js](https://nodejs.org/en/) (estou usando a versão `v16.13.2` enquanto escrevo esta aula)
- npm (estou usando a versão `8.3.2` enquanto escrevo esta aula)
- [Google Chrome](https://www.google.com/intl/pt_br/chrome/) (estou usando a versão `98.0.4758.80 (Official Build) (x86_64)` enquanto escrevo esta aula)
- [Visual Studio Code](https://code.visualstudio.com/) (estou usando a versão `1.64.0` enquanto escrevo esta aula) ou alguma outra IDE de sua preferência

> **Obs.:** Recomendo utilizar as mesmas versões, ou versões mais recentes dos sistemas listados acima.
>
> **Obs. 2:** Ao instalar o Node.js o npm é instalado junto. 🎉
>
> **Obs. 3:** Para verificar as versões do git, Node.js e npm instaladas em seu computador, execute o comando `git --version && node --version && npm --version` no seu terminal de linha de comando.
>
> **Obs. 4:** Deixei links para os instaladores na lista de requisitos acima, caso não os tenha instalados ainda.

**Note:** When installing nodejs, NPM is automatically installed too.

## Installing and starting the servers

Read the following [doc](./TestEnvironment.md) to install and start the backend and frontend servers.

## Installation

Run `npm install` (or `npm i` fot the short version) to install the dev

## Tests

You can run tests simulating a desktop or mobile viewport

...
### Desktop

Run `npm test` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.

Or, run `npm run cy:open` to open Cypress in interactive mode on a desktop viewport.

### Mobile

Run `npm run test:mobile` to run tests in headless mode

1. Run `npm run cy:open` to open the Cypress Test Runner to run tests in interactive mode.

## Support this project

If you want to support this project, leave a .

___

Made with ❤️ by [Walmyr](https://walmyr.dev).
