const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const codare = new Discord.RichEmbed()

             .setColor('#fff000')
             .setAuthor(`Register Bot Yardım Menüsü`, client.user.avatarURL) 
             .setThumbnail(client.user.avatarURL)
             .addField(`.e <etiket> İsim Yaş`, `Bu komutu kullanarak erkek üye kayıt edebilirsiniz`)
             .addField(`.k <etiket> İsim Yaş`, `Bu komutu kullanarak kız üye kayıt edebilirsiniz`)
             .addField(`.isimler <etiket>`, `Bu komutu kullanarak üyenin geçmiş isimlerini görebilirsiniz`)
             .addField(`.kayıtsız <etiket>`, `Bu komutu kullanarak etiketlediğiniz kişiyi kayıtsıza atabilirsiniz`)
             .addField(`.stat`, `Bu komutu kullanarak toplam ne kadar kayıtınız olduğunu görebilirsiniz`)
             .addField(`top-stat`, `Bu komutu kullanarak en çok kayıta sahip yetkilileri görebilirsiniz`)
        
        
        
             .addField(`.vip <etiket>`, `Bu komutu kullanarak üyeye vip rolünü verebilirsiniz`)
             .addField(`.vip-al <etiket>`, `Bu komutu kullanarak üyeden vip rolünü alabilirsiniz`)
             .addField(`.müzisyen <etiket>`, `Bu komutu kullanarak üyeye müzisyen rolünü verebilirsiniz`)
             .addField(`.müzisyen-al <etiket>`, `Bu komutu kullanarak üyeden müzisyen rolünü alabilirsiniz`)
             .addField(`.streamer <etiket>`, `Bu komutu kullanarak üyeye streamer rolünü verebilirsiniz`)
             .addField(`.streamer-al <etiket>`, `Bu komutu kullanarak üyeden streamer rolünü alabilirsiniz`)
             .addField(`.kayıtçı <etiket>`, `Bu komutu kullanarak üyeye kayıtçı rolünü verebilirsiniz`)
             .addField(`.kayıtçı-al <etiket>`, `Bu komutu kullanarak üyeden kayıtçı rolünü alabilirsiniz`)
             .setFooter(`${message.author.username}`, message.author.avatarURL)
            
        return message.channel.sendEmbed(codare);
}

exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['register-yardım'],
	permLevel : 0
}

exports.help = {
	name : 'yardım',
	description : 'Komut kategorilerini atar',
	usage : '!yardım'
}