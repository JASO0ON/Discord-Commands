const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Start a poll.')
    .setDMPermission(false)
    .addStringOption(option => option.setName('description').setDescription('Specified description will be used for the poll.').setRequired(true).setMaxLength(900).setMinLength(5))
    .addChannelOption(option => option.setName('channel').setDescription('Specified channel will receive the poll.').setRequired(false)),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({ content: `You **do not** have the permission to do that!`, ephemeral: true})
        const { options } = interaction;

        const description = options.getString('description');
        const channel = options.getChannel('channel') || interaction.channel;

        const pollEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle('> Poll')
        .addFields({ name: `• Description`, value: `> ${description}`})
        .addFields({ name: `• Creator`, value: `> Poll created by **${interaction.user.tag}**`})
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081199958704791552/largegreen.png')
        .setAuthor({ name: `✋ Poll System`})
        .setFooter({ text: `✋ Poll Created`});

        const m = await channel.send({ embeds: [pollEmbed] });
        await m.react("✅");
        await m.react("❌");
        await interaction.reply({ content: `**Successfully** created a poll in ${channel}.`, ephemeral: true });
    }
}