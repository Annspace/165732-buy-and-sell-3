'use strict';

const helpText = `Программа запускает http-сервер и формирует файл с данными для API.
          Гайд:
          service.js <command>
       
          Команды:
          --version:            выводит номер версии
          --help:               печатает этот текст
          --generate <count>    формирует файл mocks.json
    `;

const run = () => {
  console.info(helpText);
};

module.exports = {
  name: `--help`,
  run,
};
