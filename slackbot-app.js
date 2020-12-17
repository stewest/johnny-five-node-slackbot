require('dotenv').config();
const token = process.env['SLACK_TOKEN'];
const userToken = process.env['SLACK_USER'];

const slackbot = require('node-slackbot');
const bot = new slackbot(token);

const { Board, Leds, Led } = require("johnny-five");
const board = new Board();

board.on("ready", function() {
  // I've put 3 separate LEDs on Digital pins 3 Blue, 5 Green, 6 Red.
  const rgb = new Led.RGB([9, 10, 11]);

  let index = 0;
  const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];
  const rgbOn = new Leds([12]);
  const array = new Leds([3, 5, 6]);
  const blue = new Leds([3]);
  const green = new Leds([5]);
  const red = new Leds([6]);
  const deployComplete = new Leds([3, 5]);

  const rainbox = function () {
    rgbOn.on();

    board.loop(250, () => {
      rgb.color(rainbow[index++]);
      if (index === rainbow.length) {
        index = 0;
      }
    });

    setTimeout(() => {
      rgbOn.off();
    }, 5000);
    console.log('Ended Rainbow');
  }

  const pulseLed = function (colour) {
    colour.pulse();

    setTimeout(function () {
      colour.stop().off();
    }, 5000);
  }

  pulseLed(array);

  const showMsg = function (msg) {
    console.log(msg.user + ' said: ' + msg.text);
  }

  bot.use(function (message, cb) {
    const user = userToken;

    if (message.text) {
      if (message.text.indexOf(user)) {
        pulseLed(green);
        // showMsg(message.text);
      }
    }

    if (message.text) {
      if (message.text.indexOf('Stew') >= 0 || message.text.indexOf('stew') >= 0) {
        pulseLed(blue);
        showMsg(message);
      }
    }

    if (message.text == 'complete' || message.text == 'Travis CI: Build Passed') {
      rainbox();
      showMsg(message);
    }

    if (message.text == 'failed' || message.text == 'Travis CI: Build Failed') {
      pulseLed(red);
      showMsg(message);
    }

    if (message.text == 'leads') {
      rainbox();
      showMsg(message);
    }

    if (message.text == 'You asked me to remind you to') {
      rainbox();
      showMsg(message);
    }

    if (message.text == 'minute until this event') {
      rainbox();
      showMsg(message);
    }

    if (message.text == 'Turn on') {
      pulseLed(array);
    }

    if (message.text == 'Turn off') {
      array.stop().off();
    }

    cb();
  });

  bot.connect();
});
