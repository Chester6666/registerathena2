const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     
let kayıtsız = ayarlar.kayıtsızROL

client.on("guildMemberAdd", member => {
  member.roles.add(kayıtsız);
});
//-----------------------GİRENE-ROL-VERME SON----------------------\\     




//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-999])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9999])/g, d => {
          return {
            '0': `<a:0_:823957615314599986>`,
            '1': `<a:1_:823957659526496278>`,
            '2': `<a:2_:823957711837855755>`,
            '3': `<a:3_:823957785666125824>`,
            '4': `<a:4_:823957821057925141>`,
            '5': `<a:5_:823957878556852225>`,
            '6': `<a:6_:823957918378491974>`,
            '7': `<a:7_:823957953202880563>`,
            '8': `<a:8_:823957987214753795>`,
            '9': `<a:9_:823958025047375873>`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === "823915528002338844");
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 604800) kontrol = '**<a:carpi:824162597594464286> Hesap açıldıktan sonra 7 gün geçmemiş.**'
  if (kurulus > 604800) kontrol = '**<a:tik:824162590460084244> Hesap açıldıktan sonra 7 gün geçmiş.**'
    moment.locale("tr");
    kanal.send(`
__**Athena**__**'ya Hoş geldin <@`+member.id+`> seninle beraber `+üyesayısı+` kişi olduk**
  
      <:tag:823959740651798609> **Soldaki teyit odalarına geçersen yetkililerimiz seni kayıt edebilir**
      
      <:tag:823959740651798609> **<@&823915527838892084> rolündeki arkadaşlar seninle ilgilenecektir**
      
      <:tag:823959740651798609> **<#823915528002338844> kanalına göz atarsan seviniriz**

      <:tag:823959740651798609> **Kayıt olduktan sonra kuralları okumayı unutma**

      <:tag:823959740651798609> **Hesabın oluşturulma tarihi :** \``+gecen+`\`
      
      `+kontrol+``)});

  
//-----------------------HOŞ-GELDİN-MESAJI SON----------------------\\     

client.on("ready", () => {
  client.channels.cache.get(ayarlar.botses).join();
}); 


client.on("guildMemberAdd", async member => {
member.setNickname("★ İsim | Yaş")
})