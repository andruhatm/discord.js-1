const { Client } = require("discord.js");
const { config } = require("dotenv");

// Declares our bot,
// the disableEveryone prevents the client to ping @everyone
const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
})

// When the bot's online, what's in these brackets will be executed
client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    // Set the user presence
    client.user.setPresence({
        status: "online",
        game: {
            name: "me getting developed",
            type: "WATCHING"
        }
    }); 
})

// When a message comes in, what's in these brackets will be executed
client.on("message", async message => {
    const prefix = '!';
    if (message.author.bot) return;
    if (!message.guild) return;
    if(!message.content.startsWith(prefix))return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    console.log(args);
    const cmd = args.shift().toLowerCase();
    console.log(cmd);

    if(cmd === 'ping'){
        const msg = await message.channel.send(`:ping_pong: Pinging...`)
        msg.edit(`:ping_pong: Pong\n Latency is ${Math.floor(msg.createdAt - message.createdAt)}ms \n API Latency is ${Math.round(client.ping)}ms`);
    }
    if(cmd === 'ping_all'){
        // console.log(cmd);
        client.guilds.first().fetchMembers().then(fetchedGuild => {
            let onlineusers = fetchedGuild.members;
            console.log(onlineusers);
            for(key of onlineusers.keys()){
                //user = user.toString();
                console.log(onlineusers.get(key).presence.status);
                //message.channel.sendFile('example.png');
                //message.channel.send(onlineusers.get(key).ping,onlineusers.get(key).nickname);
                // let userkey = client.users.get(key);
                // console.log(userkey.username,': ',userkey.ping);
            }
        });
    }
    if(cmd === 'send'){
        // message.channel.sen('/test_new/example.png');
        message.channel.send({
            files: [{
              attachment: 'pics/1.jpg',
              name: 'zhest.jpg'
            }]
          })
            .then(console.log)
            .catch(console.error);
    }
});

// Login the bot
client.login(process.env.TOKEN);