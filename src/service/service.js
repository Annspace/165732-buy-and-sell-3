'use strict';

const {Cli} = require(`./cli`);
// const {
//   DEFAULT_COMMAND = help,
//   USER_ARGV_INDEX = 2,
//   ExitCode
// } = require(`../constants`);


const userArguments = process.argv.slice(2);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  // Cli[DEFAULT_COMMAND].run();
  process.exit(1);
}

Cli[userCommand].run(userArguments.slice(1));
