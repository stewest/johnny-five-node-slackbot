# johnny-five-node-slackbot
A NodeJS Arduino integration with SlackBot.

I wanted to make my Arduino flash certain green or red LEDs, triggered via our deploy's success or failure slack messages.

Creating a Mashup of:

https://github.com/rwaldron/johnny-five
- The JavaScript Robotics Programming Framework

https://github.com/rmcdaniel/node-slackbot
- Slackbot for node.js using RTM API.

What I did was:
- npm install --save johnny-five
- npm install --save node-slackbot
- Go to https://api.slack.com/slack-apps and create your app with testing tokens.

Follow most of the relevent instructions from both repos above.

Add in your Slack Token.

Connect the Arduino Uno via USB cable

Run:
- node slackbot-app.js
