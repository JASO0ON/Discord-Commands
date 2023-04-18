const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Vote for PixelVal on Top.gg!'),

    async execute (interaction) {
        const embed = new EmbedBuilder()
        .setTitle('> Vote for us!')
        .setColor("Purple")
        .setAuthor({ name: `📜 Voting System`})
        .setFooter({ text: `📜 Vote for us`})
        .addFields({ name: `• Vote Bellow`, value: `> By pressing the button bellow \n> you can help our bot grow on \n> **Top.gg** by voting for it!`})
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081227919256457246/largepurple.png')

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Vote')
            .setStyle(ButtonStyle.Link)
            .setURL('https://top.gg/bot/1076798263098880116/vote')
        )

        await interaction.reply({ embeds: [embed], components: [button] });
    }
}