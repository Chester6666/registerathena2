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

//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    const tag = "★";
    const sunucu = "823915527545552937";
    const kanal = "823915531517165620";
    const rol = "823915527801274456";

    try {
      if (
        newUser.username.includes(tag) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `<:tag:823959740651798609>  ${newUser} adlı kişi ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `<:tag:823959740651798609> Merhaba **${
              newUser.username
            }**, Sunucumuzda **${tag}** Tagımızı Aldığın İçin **${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            }** Rolünü Sana Verdim!`
          );
      }
      if (
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("d40000")
              .setDescription(
                `<:tag:823959740651798609> ${newUser} adlı kişi ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `<:tag:823959740651798609> Selam **${
              newUser.username
            }**, Sunucumuzda **${tag}** Tagımızı Çıkardığın İçin **${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            }** Rolünü Senden Aldım!`
          );
      }
    } catch (e) {
      console.log(`Bir hata oluştu! ${e}`);
    }
  }
});

//Serendia'dan alınıp V12 Çevirilmiştir!

//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get("823915527545552937"); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "★"; // Buraya Ekip Tag
  var tagrol = "823915527801274456"; // Buraya Ekip Rolünün ID
  var kanal = "823915531517165620"; // Loglanacağı Kanalın ID

  if (
    !sunucu.members.has(yeni.id) ||
    yeni.bot ||
    stg.username === yeni.username
  )
    return;

  if (yeni.username.includes(tag) && !uye.roles.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache
        .get(kanal)
        .send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
    } catch (err) {
      console.error(err);
    }
  }

  if (!yeni.username.includes(tag) && uye.roles.has(tagrol)) {
    try {
      await uye.roles.remove(
        uye.roles.filter(
          rol => rol.position >= sunucu.roles.get(tagrol).position
        )
      );
      await uye.send(
        `Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`
      );
      await client.channels.cache
        .get(kanal)
        .send(`**${yeni}** adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
    } catch (err) {
      console.error(err);
    }
  }
});

//----------------------TAG-KONTROL----------------------\\     

client.on("guildMemberAdd", member => {
  let sunucuid = "823915527545552937"; //Buraya sunucunuzun IDsini yazın
  let tag = "★"; //Buraya tagınızı yazın
  let rol = "823915527801274456"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
      .setTimestamp()
     client.channels.cache.get('823915531517165620').send(tagalma)
}
})

/////////////////////////////

client.on("guildMemberAdd", async (member) => {
  member.roles.add(ayarlar.unregister)
  member.setNickname("★ İsim | Yaş")
  });

/////////////////////////////

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'tag') {
    msg.reply('★');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '.tag') {
    msg.reply('★');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!tag') {
    msg.reply('★');
  }
});

/////////////////////////////
client.on("guildMemberAdd", member => {
  member.roles.add('823915527772045400'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});
