const Discord = require('discord.js');
const rdb = require('quick.db');
const moment = require('moment');
exports.run = async (client, message, args) => {
let müzisyen = '823915527927365674' 
if(!["823915527838892084"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(`**Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısın!**`).then(x => x.delete({timeout: 5000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
 member.roles.add(müzisyen)
  let embed = new Discord.MessageEmbed()
  .setColor('BLACK')
  .setDescription(`**${member} kişisi artık ${müzisyen}**`)
  .setTimestamp()
message.react(client.emojiler.onay).catch();
message.channel.send(embed).then(x => x.delete({timeout: 5000}));
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['müzisyen'],
  permLevel: 0
}
exports.help = {
  name: 'vip',
  description: "Belirtilen üyeye kayıtsız rolü verir",
  usage: 'vip @kişi'
}