const Discord = require('discord.js');
const rdb = require('quick.db');
const moment = require('moment');
exports.run = async (client, message, args) => {
let vipal = '823915527927365672' 
if(!["823915527838892084"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(`**Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısın!**`).then(x => x.delete({timeout: 5000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
 member.roles.remove(vipal)
  let embed = new Discord.MessageEmbed()
  .setColor('BLACK')
  .setDescription(`**${member} kişisi artık ${vipal} değil.**`)
  .setTimestamp()
 
message.react(client.emojiler.onay).catch();
message.channel.send(embed).then(x => x.delete({timeout: 5000}));
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['vip-al'],
  permLevel: 0
}
exports.help = {
  name: 'vip-al',
  description: "Belirtilen üyeye kayıtsız rolü verir",
  usage: 'vip-al @kişi'
}