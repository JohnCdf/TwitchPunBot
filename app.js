const tmi = require('tmi.js')
const jokes = require('./jokes')

var chann = "" //channel to send messages to

var conf = {
  options: {
    debug: true
  },
  connection: {
    cluster: 'aws',
    reconnect: true
  },
  identity: {
    username: 'singleNreadyToMingL',//username of chat bot
    password: 'oauth:t25dqgyf9ol3hskc0btu32n4j2hg7w'//api key for its use
  },
  channels: [
    chann
  ]
};

function randomMoji(){
  var list = [
    'Kappa',
    'HassanChop',
    'RedCoat',
    'FUNgineer',
    'ANELE',
    'BabyRage',
    'TheTarFu',
    'DendiFace',
    'CarlSmile'
  ]

  return list[Math.floor(Math.random()*list.length)]//returns a random emoji
}


var client = new tmi.client(conf)
client.connect()

client.on('connected',function(address, port) {//will connect the bot to the channel and then start telling jokes
  setInterval(function(){
    var joke = jokes[Math.floor(Math.random()*jokes.length)]

    client.action(chann, joke.q)//build up joke
    setTimeout(function(){
      client.action(chann, joke.a)//punchline!
    },6000)

  },20000)//interval to wait between jokes

});

client.on("join", function (channel, username, self) {
  if (self) {
    client.action(chann, 'the pun bot has joined (::')
    return
  }
  client.action(chann, 'Welcome, ' + username + '! enjoy your stay ' + randomMoji())
});

client.on("part", function (channel, username, self) {
    client.action(chann, username + ' left. cya later, gator. '+randomMoji())
});
