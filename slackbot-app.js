var slackbot = require('node-slackbot');
var bot = new slackbot('Your-Token-here');

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  // I've put 3 separate LEDs on Digital pins 3 Blue, 5 Green, 6 Red.
  var array = new five.Leds([3, 5, 6]);

  // Creates a piezo object and defines the pin to be used for the signal. Pin 8.
   var piezo = new five.Piezo(8);

  // Injects the piezo into the repl
  board.repl.inject({
    piezo: piezo
  });

// Plays a song
piezo.play({
  // song is composed by an array of pairs of notes and beats
  // The first argument is the note (null means "no note")
  // The second argument is the length of time (beat) of the note (or non-note)
  song: [
    ["C4", 1 / 4],
    ["D4", 1 / 4],
    ["F4", 1 / 4],
    ["D4", 1 / 4],
    ["A4", 1 / 4],
    [null, 1 / 4],
    ["A4", 1],
    ["G4", 1],
    [null, 1 / 2],
    ["C4", 1 / 4],
    ["D4", 1 / 4],
    ["F4", 1 / 4],
    ["D4", 1 / 4],
    ["G4", 1 / 4],
    [null, 1 / 4],
    ["G4", 1],
    ["F4", 1],
    [null, 1 / 2]
  ],
  tempo: 100
});

  bot.use(function(message, cb) {
    if ('message' == message.type) {
      console.log(message.user + ' said: ' + message.text + ' of Type: ' + message.type);
    }

    if (message.text == 'Turn on') {
      array.pulse();

      piezo.play({
        // song is composed by a string of notes
        // a default beat is set, and the default octave is used
        // any invalid note is read as "no note"
        song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
        beats: 1 / 4,
        tempo: 100
      });

    } else if (message.text == 'Turn off') {
      array.stop();
      array.off();
    } else if (message.text == 'Play song') {
      // Plays the same song with a string representation
      piezo.play({
        // song is composed by a string of notes
        // a default beat is set, and the default octave is used
        // any invalid note is read as "no note"
        song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
        beats: 1 / 4,
        tempo: 100
      });
    }

    cb();
  });

  bot.connect();

});