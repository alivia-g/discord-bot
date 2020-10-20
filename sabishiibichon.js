const botSettings = require("./botSettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`Bot is ready! ${bot.user.username}`);

  try{
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch(e) {
    console.log(e.stack);
  }
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if(!command.startsWith(prefix)) return;

  if(command === `${prefix}botinfo`) {
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username)
      .setDescription("I'm a bichon")
      .setColor("#bed3a4")
      .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
      .addField("ID", message.author.id)
      .addField("Created At", message.author.createdAt);

    message.channel.send(embed);

    return;
  }

  if (command.toLowerCase().includes(`oyasu`)) {
    message.channel.send("おやすみなさい❣\nご主人さま ♡(.❛ ᴗ ❛.)♡");
  }

  if (command.toLowerCase().includes(`ohayo`)) {
    message.channel.send("お早う❣\nご主人さま♡(.❛ ᴗ ❛.)♡");
  }

  if (command.toLowerCase().indexOf(`hey`) > -1 || command.toLowerCase().indexOf(`hi`) > -1) {
    message.channel.send("お帰り！\nご主人さま♡(.❛ ᴗ ❛.)♡");
  }

  if (command.toLowerCase().includes(`kawai`)) {
    message.channel.send(`(≧◡≦)\nご主人さまが大好きだよう(.❛ ᴗ ❛.)♡♡`);
  }

  // Muting a mentioned user
  if (command === `${prefix}mute`) {
    // Check if command executor has the right permission to do this command.
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have manage messages.");
    // Get the mentioned user, return if there is none.
    let to_mute = message.mentions.users.first() || message.guild.member(args[0]);
    if (!to_mute) return message.channel.send("You did not specify a user mention or ID!");
    // If the mutee has the same or a higher role than the muter, return.
    try {
      role = await message.guild.roles.create( {
        data: {
          name: "SADB Muted",
          color: "#000000",
          permission: [],
        },
      });

      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
  }
});

bot.login(botSettings.token);
