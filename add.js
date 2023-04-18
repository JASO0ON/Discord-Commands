const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('add')
    .setDMPermission(false)
    .setDescription('Add media to your server.')
    .addSubcommand(command => command.setName('emoji').setDescription('Specified emoji will be added to the server.').addAttachmentOption(option => option.setName('emoji').setDescription('Specified file will be uploaded and used as the emoji.').setRequired(true)).addStringOption(option => option.setName('name').setDescription(`Specified name will be the emoji's name`).setRequired(true).setMinLength(2).setMaxLength(30)))
    .addSubcommand(command => command.setName('sticker').setDescription('Specified sticker will be added to the server.').addAttachmentOption(option => option.setName('sticker').setDescription('Specified PNG/JPEG file will be uploaded as a sticker.').setRequired(true)).addStringOption(option => option.setName('name').setDescription(`Specified name will be the sticker's name`).setRequired(true).setMinLength(2).setMaxLength(30)))
    .addSubcommand(command => command.setName('soundboard').setDescription('Specified sound will be added to the server soundboard.').addAttachmentOption(option => option.setName('sound').setDescription('Specified MP3 file will be uploaded as a soundboard sound.').setRequired(true)).addStringOption(option => option.setName('name').setDescription(`Specified name will be the sound's name`).setRequired(true).setMinLength(2).setMaxLength(30))),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers) && interaction.user.id !== '619944734776885276') return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});

        const sub = interaction.options.getSubcommand();
        
        switch (sub) {

            case 'emoji':

            await interaction.reply({ content: `<a:loading:1092073703308800081> Loading your **emoji**..`});

            const emojiname = interaction.options.getString('name');
            const emojiupload = interaction.options.getAttachment('emoji');
            const emoji = await interaction.guild.emojis.create({
                
            name: `${emojiname}`,
            attachment: `${emojiupload.attachment}`

            }).catch(err => {
            
                setTimeout(() => {
                    return interaction.editReply({ content: `❌ Upload **failed**! **Err**: ${err.rawError.message}`});
                }, 2000)
            })

             setTimeout(() => {
                if (!emoji) return;

                const embed = new EmbedBuilder()
                .setColor("DarkRed")
                .setAuthor({ name: `😜 Emoji Tool`})
                .setFooter({ text: `😜 Emoji Added`})
                .setTimestamp()
                .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')
                .setTitle('> Emoji Added')
                .addFields({ name: `• Emoji's Name`, value: `> Emoji added as: "<:${emojiname}:${emoji.id}>"`})

                interaction.editReply({ content: ``, embeds: [embed]});

            }, 3000)

            break;
            case 'sticker':

            const stickerupload = interaction.options.getAttachment('sticker');
            const name = interaction.options.getString('name');

            if (stickerupload.contentType === 'Image/gif') return await interaction.reply({ content: `You **cannot** upload animated stickers!`, ephemeral: true});

            await interaction.reply({ content: `<a:loading:1092073703308800081> Loading your **sticker**..`})

            const sticker = await interaction.guild.stickers.create({

                file: `${stickerupload.attachment}`,
                name: `${name}`

            }).catch(err => {
                setTimeout(() => {
                    return interaction.editReply({ content: `❌ Upload **failed**! **Err**: ${err.rawError.message}`});
                }, 2000);
            });

            const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setAuthor({ name: `😜 Sticker Tool`})
            .setFooter({ text: `😜 Sticker Added`})
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')
            .setTitle('> Sticker Added')
            .addFields({ name: `• Sticker's Name`, value: `> Sticker added as: "**${name}**"`})

            setTimeout(() => {
                if (!sticker) return;

                interaction.editReply({ content: '', embeds: [embed] });
            }, 3000);

            break;
            case 'soundboard':

            const sound = await interaction.options.getAttachment('sound');
            const soundname = await interaction.options.getString('name');

            if (sound.contentType !== 'audio/mpeg') return await interaction.reply({ content: `You **can only** upload **MP3** formatted sounds!`, ephemeral: true});

            await interaction.reply({ content: `<a:loading:1092073703308800081> Loading your **sound**..`})

            const uploadsound = await interaction.guild.soundboard.create({

                file: `${sound.attachment}`,
                name: `${soundname}`

            }).catch(err => {
                setTimeout(() => {
                    return interaction.editReply({ content: `❌ Upload **failed**! **Err**: ${err.rawError.message}`});
                }, 2000);
            });

            const soundembed = new EmbedBuilder()
            .setColor("DarkRed")
            .setAuthor({ name: `🔊 Soundboard Tool`})
            .setFooter({ text: `🔊 Sound Added`})
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')
            .setTitle('> Sound Added')
            .addFields({ name: `• Sound's Name`, value: `> Sound added as: "**${soundname}**"`})

            setTimeout(() => {
                if (!uploadsound) return;
                else {
                    interaction.editReply({ content: '', embeds: [soundembed] });
                }
            }, 3000);

        }
        
    }
}