'use strict';

const fs = require(`fs`);

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

const writeToFile = (data, fileName = FILE_NAME) => {

  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.error(`Can't write data to file...`);
    }

    return console.info(`Operation success. File created.`);
  });
};

const run = (count) => {
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

  if (countOffer > MAX_OFFERS) {
    console.info(`Не больше ${MAX_OFFERS} объявлений`);
    process.exit(ExitCode.success);
  }

  const content = JSON.stringify(generateOffers(countOffer));

  writeToFile(content);

};

module.exports = {
  name: `--generate`,
  run,
};
