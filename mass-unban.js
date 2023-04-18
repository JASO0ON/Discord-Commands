const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mass-unban')
        .setDMPermission(false)
        .setDescription('Unban all members in the server. Use with caution!'),
    async execute(interaction) {
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && interaction.user.id !== '619944734776885276') return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});

        try {
            
            const bannedMembers = await interaction.guild.bans.fetch();
            
            await Promise.all(bannedMembers.map(member => {
                return interaction.guild.members.unban(member.user.id);
            }));
           
            return interaction.reply({ content: 'All members have been **unbanned** from the server.', ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'An error occurred while **unbanning** members.', ephemeral: true });
        }
    }
}
