const {SlashCommandBuilder, PermissionsBitField} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fake-tweet")
    .setDMPermission(false)
    .setDescription("Spoofs a tweet. Make sure to use it responsibly!")
    .addStringOption(option => option.setName("tweet").setDescription("Specified tweet message will be used for the spoof.").setRequired(true).setMaxLength(30))
    .addUserOption(option => option.setName("user").setDescription("Specified user will be spoofed.").setRequired(false)),
    async execute (interaction) {

      if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && interaction.user.id !== '619944734776885276') return await interaction.reply({ content: 'You **do not** have the permission to do that!', ephemeral: true});

      let tweet = interaction.options.getString("tweet");
      let user = interaction.options.getUser("user") || interaction.user;
      let avatarUrl = user.avatarURL({ extension: "jpg" }) || 'https://cdn.discordapp.com/attachments/1080219392337522718/1093224716875087892/twitter.png';
      let canvas = `https://some-random-api.ml/canvas/tweet?avatar=${avatarUrl}&displayname=${encodeURIComponent(user.username)}&username=${encodeURIComponent(user.username)}&comment=${encodeURIComponent(tweet)}`;

      await interaction.reply({ content: `Sent a **spoofed tweet** as ${user}!`, ephemeral: true});
      await interaction.channel.sendTyping(), await interaction.channel.send({ content: canvas });
    },
};