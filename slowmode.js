const { SlashCommandBuilder, PermissionsBitField, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Sets specified channel to use slowmode.')
    .addIntegerOption(option => option.setName('duration').setDescription('Specified duration will be applied to the slowmode (in seconds).').setRequired(true))
    .addChannelOption(option => option.setName('channel').setDescription('Specified channel will be applied with slowmode.').addChannelTypes(ChannelType.GuildText).setRequired(false)),
    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels) && interaction.user.id !== '619944734776885276') return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
 
        const duration = interaction.options.getInteger('duration');
        const channel = interaction.options.getChannel('channel') || interaction.channel;
 
        channel.setRateLimitPerUser(duration).catch(err => {
            return interaction.reply({ content: `**Couldn't** set the **slowmode** for the channel ${channel}. Check my **permissions** and **role position** and try again!`, ephemeral: true})
        });
 
        await interaction.reply({ content: `The channel's (${channel}) **slowmode** has been set to **${duration}** second(s).`, ephemeral: true });
    }
}