var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    content: text,
    // createdAt: moment().valueOf() // same as: new Date().getTime()
    time: Date().getTime()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
