const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription(`Experiment with specified user's avatar.`)
    .addSubcommand(command => command.setName('get').setDescription(`Display specified user's avatar.`).addUserOption((option) => option.setName('user').setDescription(`Specified user's avatar will be displayed.`).setRequired(true)))
    .addSubcommand(command => command.setName('pixelate').setDescription(`Display specified user's avatar as pixelart.`).addUserOption((option) => option.setName('user').setDescription(`Specified user's avatar will be pixelated.`).setRequired(false))),
    async execute(interaction) {

        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'get':

            let user = interaction.options.getUser('user') || interaction.user;
            let userAvatar = user.displayAvatarURL({ size: 512});

            const embed = new EmbedBuilder()
            .setColor('Purple')
            .setFooter({ text: `🖼 Avatar Fetched`})
            .setAuthor({ name: `🖼 Avatar Tool`})
            .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081227919256457246/largepurple.png')
            .setTitle(`> ${user.tag}'s Avatar`)
            .addFields({ name: `• Avatar Displayed`, value: `> ${user}'s avatar has been \n> displayed`})
            .setImage(`${userAvatar}`)
            .setTimestamp();

            const button = new ButtonBuilder()
            .setLabel('Avatar Link')
            .setStyle(ButtonStyle.Link)
            .setURL(`${user.avatarURL({size: 512})}`);

            const row = new ActionRowBuilder().addComponents(button);

            await interaction.reply({ embeds: [embed], components: [row], });

            break;
            case 'pixelate':

            const user1 = interaction.options.getUser('user') || interaction.user;

            let avatarUrl = user1.avatarURL({ size: 512, extension: 'jpg' });
            let canvas = `https://some-random-api.ml/canvas/pixelate?avatar=${avatarUrl}`;

            const embed1 = new EmbedBuilder()
            .setColor('Purple')
            .setFooter({ text: `🖼 Avatar Fetched`})
            .setAuthor({ name: `🖼 Avatar Tool`})
            .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081227919256457246/largepurple.png')
            .setTitle(`> ${user1.tag}'s Pixelated Avatar`)
            .addFields({ name: `• Avatar Pixelated`, value: `> ${user1}'s avatar has been pixelated`})
            .setImage(canvas)
            .setTimestamp();

            const button1 = new ButtonBuilder()
            .setLabel('Avatar Link')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://some-random-api.ml/canvas/pixelate?avatar=${avatarUrl}`);

            const row1 = new ActionRowBuilder().addComponents(button1);

            await interaction.reply({ embeds: [embed1], components: [row1] });
        }
    }
};