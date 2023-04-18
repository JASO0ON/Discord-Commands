const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tts')
    .setDMPermission(false)
    .setDescription('Sends a specified message as a TTS (text to speech) message.')
    .addStringOption(option => option.setName('message').setDescription('Specified message will be sent as a TTS message.').setRequired(true).setMaxLength(2000)),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.SendTTSMessages) && interaction.user.id !== '619944734776885276') return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});

        const message = interaction.options.getString('message');

        const embed = new EmbedBuilder()
        .setTimestamp()
        .setColor("DarkBlue")
        .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081275127850864640/largeblue.png')
        .setDescription(`> ${message}`)
        .setTitle(`${interaction.user.username} says..`)
        .setAuthor({ name: `🔊 TTS Tool`})
        .setFooter({ text: `🔊 TTS Message sent`})

        await interaction.reply({ content: `${message}`, embeds: [embed], tts: true});
        await interaction.editReply({ embeds: [embed], content: ``})
    }
}
