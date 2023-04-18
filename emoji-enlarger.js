const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { default: axios } = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('emoji-enlarger')
    .setDescription('Enlarge emojies. This can be used to copy their image link or download them as an image.')
    .addStringOption(option => option.setName('emoji').setDescription('The emoji you would like to enlarge.').setRequired(true)),
    async execute (interaction) {

        let emoji = interaction.options.getString('emoji')?.trim();

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

        if (!emoji.startsWith("http")) {
            return await interaction.reply({ content: "You **cannot** enlarge default emojies.", ephemeral: true})
        }

        if (!emoji.startsWith("https")) {
            return await interaction.reply({ content: "You **cannot** enlarge default emojies.", ephemeral: true})
        }

        const embed = new EmbedBuilder()
        .setColor("DarkRed")
        .setTitle('> Your emoji has been enlarged!')
        .setImage(emoji)
        .setTimestamp()
        .setFooter({ text: '> Emoji Enlarged successfully!'})
        .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')
        .setAuthor({ name: '😎 Emoji Enlarger tool'})
        .setFooter({ text: (`😎 Emoji Enlarger succeeded`)})
        .addFields({ name: '• Your Emoji was scaled', value: '> The emoji will be sent bellow'})

        await interaction.reply({ embeds: [embed]})
    }
}

