const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { default: axios } = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('steal')
    .setDMPermission(false)
    .setDescription('Adds specified emoji to the server.')
    .addStringOption(option => option.setName('emoji').setDescription('Specified emoji will be added to the server.').setRequired(true))
    .addStringOption(option => option.setName('name').setDescription('Specified name will be applied to specified new emoji.').setRequired(true)),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers) && interaction.user.id !== '619944734776885276') return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});

        let emoji = interaction.options.getString('emoji')?.trim();
        const name = interaction.options.getString('name');

        if (emoji.startsWith("<") && emoji.endsWith(">")) {
            const id = emoji.match(/\d{15,}/g)[0];

            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
            .then(image => {
                if (image) return "gif"
                else return "png"
            }).catch(err => {
                return "png"
            })

            emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
        }

        if (!emoji.startsWith('http')) {
            return await interaction.reply({ content: 'You **cannot** add default emojis to your server.', ephemeral: true})
        }

        if (!emoji.startsWith('https')) {
            return await interaction.reply({ content: 'You **cannot** add default emojis to your server.', ephemeral: true})
        }

        interaction.guild.emojis.create({ attachment: `${emoji}`, name: `${name}` })
        .then(emoji => {
            const embed = new EmbedBuilder()
            .setColor("DarkRed")
            .setAuthor({ name: `😂 Emoji Tool`})
            .setFooter({ text: `😂 Emoji Stolen`})
            .setTimestamp()
            .setTitle(`> Emoji Added`)
            .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')
            .addFields({ name: `• Emoji Details`, value: `> ${emoji} added with the name of **${name}**`})

            return interaction.reply({ embeds: [embed] });
        }).catch(err => {
            interaction.reply({ content: `This emoji **failed** to upload, perhaps you have reached your **emoji limit**?`, ephemeral: true})
        })
    }
}