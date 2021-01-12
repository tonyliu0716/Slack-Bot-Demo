// api refer:   https://slack.dev/node-slack-sdk/rtm-api
// userful git: https://github.com/5punk/react-slack-chat


// step 1: create a new classic slack app to use RTM Client
// https://api.slack.com/apps?new_classic_app=1

// step 2: after creating the bot, go to 'Bots', and add Legacy bot

// step 3: generate the bot token, copy it and paste in constants.js

// step 4: add channel name in constants.js

import { RTMClient } from '@slack/rtm-api';
import { WebClient } from '@slack/web-api';
import { CHANNEL, SLACK_OAUTH_TOKEN } from './constants';


const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);

/**
 *  proxy setting --> not used in the local
 * 
const { RtmClient } = require('@slack/client');
const { proxiedRequestTransport } = require('@slack/client/lib/clients/transports/request');
const { factory: wsTransportFactory } = require('@slack/client/lib/clients/transports/ws');

const wsTransport = factory(console.log.bind(console));
const rtm = new RtmClient(token, {
  transport: proxiedRequestTransport('your proxy url'),
  socketFn: function(socketURL) {
    return wsTransport(socketURL, { proxyURL: 'your proxy url' });
  }
});
 * 
 * 
 */



// print error message if the token is not valid
rtm.start().catch(console.error);

// when ready
rtm.on('ready', async () => {
    console.log("Slack bot started...");
    sendMessage(CHANNEL, 'Connected from react, started online...');
});


// getting slack event
rtm.on('slack_event', async (eventType, event) => {
    if(event && eventType === 'message') {
        console.log(event.text);
    }
});

// send message to the channel
async function sendMessage(channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    });
}



