const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDMPermission(false)
    .addStringOption(option => option.setName('message').setDescription('Message provided will be sent as PixelVal').setRequired(true).setMaxLength(2000))
    .setDescription('Say something as PixelVal.'), 
    async execute(interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && interaction.user.id !== '619944734776885276') return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});

        const message = interaction.options.getString('message')

        await interaction.channel.send({ content: `${message}` })
        await interaction.reply({ content: `Message "${message}" has been **sent** as me!`, ephemeral: true})
    }
}

