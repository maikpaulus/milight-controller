const amqp = require('amqp');
const express = require('express');
const bodyParser = require('body-parser');
const port = 60005;
const config = require('config');

app = express();
app.use(bodyParser.json());

const connectionParams = config.has('rabbitmq') ? config.get('rabbitmq') : undefined;
if (!connectionParams) {
  console.log('Es wurden keine Verbindungskonfiguration für die Message Queue gefunden.');
  process.exit(0);
}

const connection = amqp.createConnection({
  host: connectionParams.host,
  port: connectionParams.port,
  login: connectionParams.user,
  password: connectionParams.password,
  vhost: connectionParams.vhost
});

let globalMsgOpts = {
  command: 'licht.an',
  zone: 1
};

const {
  MessageFactory,
  Command,
  FindMessage,
  WarmWhiteMessage,
  SocketServerFactory
} = require('./lib/message/Message.js');

const socketServer = SocketServerFactory.createServerWith('udp', {
  port: 55054,
  targetHost: '192.168.178.200',
  targetPort: 5987,
  messageCallback: (findMessage) => {
    'use strict';
    const message = findMessage.toString('hex');
    
    if (44 !== message.length) {
      return;
    }

    const zone = globalMsgOpts.zone;

    if (44 === message.length) {
      if ('toralarm' === globalMsgOpts.command) {
        const delay = 1000;
        const durance = 2200;
        const wait = 1500;

        const lightOnMessage = MessageFactory.createMessageFrom(
          new Command('licht.an')
        );
        const lightOffMessage = MessageFactory.createMessageFrom(
          new Command('licht.aus')
        );
        const warmWhiteMessage = MessageFactory.createMessageFrom(
          new Command('warm.white')
        );
        const colorGreenMessage = MessageFactory.createMessageFrom(
          new Command('color.green')
        );
        const brightness10Message = MessageFactory.createMessageFrom(
          new Command('brightness.10')
        );
        const saturationMessage = MessageFactory.createMessageFrom(
          new Command('saturation.10')
        );
        const brightness100Message = MessageFactory.createMessageFrom(
          new Command('brightness.100')
        );

        lightOnMessage.processResponseFromFindMessage(message);
        lightOffMessage.processResponseFromFindMessage(message);
        colorGreenMessage.processResponseFromFindMessage(message);
        brightness10Message.processResponseFromFindMessage(message);
        brightness100Message.processResponseFromFindMessage(message);
        saturationMessage.processResponseFromFindMessage(message);

        lightOnMessage.setZone(zone);
        lightOffMessage.setZone(zone);
        colorGreenMessage.setZone(zone);
        brightness10Message.setZone(zone);
        brightness100Message.setZone(zone);
        saturationMessage.setZone(zone);

        socketServer.send(lightOnMessage, {timeout: delay});
        socketServer.send(saturationMessage, {timeout: 500});
        socketServer.send(brightness100Message, {timeout: 500});
        socketServer.send(colorGreenMessage, {timeout: delay });

        socketServer.send(lightOffMessage, { timeout: delay + durance });

        socketServer.send(lightOnMessage, { timeout: delay + durance + wait });
        socketServer.send(colorGreenMessage, { timeout: delay + durance + wait });

        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 100 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 900 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 1700 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 2500 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 3300 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 4100 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 4900 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 5700 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 6500 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 7300 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 8100 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 8900 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 9700 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 10500 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 11300 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 12100 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 12900 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 13700 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 14500 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 15300 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 16100 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 16900 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 17700 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 18500 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 19300 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 20100 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 20900 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 21700 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 22500 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 23300 }
        );
        socketServer.send(
          brightness10Message,
          { timeout: delay + durance + wait + durance + 24100 }
        );
        socketServer.send(
          brightness100Message,
          { timeout: delay + durance + wait + durance + 24900 }
        );

        socketServer.send(
          lightOffMessage,
          { timeout: delay + durance + wait + durance + 26000 }
        );
        return;
      }
      
      const brightness10Message = MessageFactory.createMessageFrom(
        new Command('brightness.10')
      );

      const brightness100Message = MessageFactory.createMessageFrom(
        new Command('brightness.100')
      );


      const saturationMessage = MessageFactory.createMessageFrom(
        new Command('saturation.10')
      );

      const lightMessage = MessageFactory.createMessageFrom(
        new Command(globalMsgOpts.command)
      );

      brightness100Message.processResponseFromFindMessage(message);
      brightness10Message.processResponseFromFindMessage(message);
      saturationMessage.processResponseFromFindMessage(message);
      lightMessage.processResponseFromFindMessage(message);
      
      brightness10Message.setZone(zone);
      brightness100Message.setZone(zone);
      saturationMessage.setZone(zone);
      lightMessage.setZone(zone);

      if (lightMessage instanceof WarmWhiteMessage) {
        const lightOnMessage = MessageFactory.createMessageFrom(
          new Command('licht.an')
        );
        
        lightOnMessage.processResponseFromFindMessage(message);
        lightOnMessage.setZone(zone);
        
        socketServer.send(brightness10Message, {timeout: 0});
        socketServer.send(lightOnMessage, {timeout: 50});
        socketServer.send(brightness100Message, {timeout: 100});
        
        return;
      }

      socketServer.send(saturationMessage, {timeout: 50});
      socketServer.send(brightness100Message, {timeout: 50});
      
      if (globalMsgOpts.transition && globalMsgOpts.command === 'licht.aus') {
        socketServer.send(brightness10Message, {timeout: 75});
      }
      console.log('xxxX', lightMessage);
      socketServer.send(lightMessage, {timeout: 125});
    }
  }
});



// add this for better debuging
connection.on('error', (err) => {
  'use strict';

  console.log('Error from amqp: ', err);
});

// Wait for connection to become established.
connection.on('ready', () => {
  'use strict';

  const queue = connection.queue('milight', {
    durable: true, 
    autoDelete: false
  }, (queue) => {
    queue.bind('milight', 'milight');
    queue.subscribe((msg) => {
      let message;
      try {
        message = JSON.parse(msg.data.toString());
      } catch (err) {
        console.log(err);
        return false;
      }

      globalMsgOpts.command = message.command;
    });
  });
});

const processMessage = (command, props) => {
  const findMessage = new FindMessage();
  
  globalMsgOpts.command = command;
  globalMsgOpts.zone = props.zone;
  globalMsgOpts.transition = props.transition;

  socketServer.send(findMessage);

};

app.post('/', (req, res) => {
  const command = req.body.command || 'licht.an';
  const props = req.body.props || { zone: 1, transition: 0 };
  processMessage(command, props);
  return res.json(true);
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
/*
{
  "command": "licht.an",
  "props": {
    "zone": 1
  }
}

{
  "command": "licht.aus",
  "props": {
    "zone": 1
  }
}
*/

// testing
// teste auf erzeugen der richtigen nachrichten bei befehlen
