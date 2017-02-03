# johnny-five-node-slackbot
A NodeJS Arduino integration with SlackBot.

I wanted to make my Arduino flash certain green or red LEDs, triggered via our deploy's success or failure slack messages.

Creating a Mashup of:

https://github.com/rwaldron/johnny-five
- The JavaScript Robotics Programming Framework

https://github.com/rmcdaniel/node-slackbot
- Slackbot for node.js using RTM API.

As mentioned here: http://lightningtalks.me/simple-slack-of-things-nodejsslackarduino/

What to do:

    - Download Arduino IDE
    - Plug in your Arduino or Arduino compatible microcontroller via USB
    - Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmataPlus
        -- StandardFirmataPlus is available in Firmata v2.5.0 or greater
    - Click the "Upload" button.

If the upload was successful, the board is now prepared and you can close the Arduino IDE.

Then from this repo:
- npm install
- Go to https://api.slack.com/slack-apps and create your app with testing tokens.

Follow most of the relevent instructions from both repos above.

Important to upload, from the Arduino IDE 

Add in your Slack Token.

Connect the Arduino Uno via USB cable

Run:
- node slackbot-app.js
