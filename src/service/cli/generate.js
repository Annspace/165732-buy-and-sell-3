'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {getRandomInt, shuffle, getPictureFileName} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  ExitCode,
  MAX_OFFERS,
  FILE_NAME,
  CATEGORIES,
  SENTENCES,
  TITLES,
  OfferType,
  PictureRestrict,
  SumRestrict,
} = require(`../../constants`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

const writeToFile = async (data, fileName = FILE_NAME) => {
  try {
    await fs.writeFile(fileName, data);
    console.log(chalk.green(`Operation success. File created.`));
  } catch (err) {
    throw new Error(chalk.red(`Can't write data to file...`));
  }
};

const run = async (count) => {
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (countOffer > MAX_OFFERS) {
    console.error(chalk.red(`Не больше ${MAX_OFFERS} объявлений`));
    process.exit(ExitCode.success);
  }

  const content = JSON.stringify(generateOffers(countOffer));

  await writeToFile(content);

};

module.exports = {
  name: `--generate`,
  run,
};
