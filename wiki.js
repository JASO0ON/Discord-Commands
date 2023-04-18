const wiki = require('wikijs').default();
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

var timeout = [];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('wiki')
    .setDMPermission(false)
    .setDescription('Find something in Wikipedia')
    .addStringOption(option => option.setName('query').setDescription('Look something up in Wikipedia.').setRequired(true).setMaxLength(200)),
    async execute (interaction) {

        const query = interaction.options.getString('query');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && timeout.includes(interaction.member.id) && interaction.user.id !== '619944734776885276') return await interaction.reply({ content: 'You are on cooldown! You **cannot** execute /wiki.', ephemeral: true})

        await interaction.deferReply();

        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, 10000)


        const search = await wiki.search(query);
        if (!search.results.length) return await interaction.editReply({ content: '> No results were **found**!', ephemeral: true});

        const result = await wiki.page(search.results[0]);

        const summary = await result.summary();
        
        const embed = new EmbedBuilder()
        .setColor("DarkBlue")
        .setTitle(`> The search "${result.raw.title}" was Sumbited!`)
        .setAuthor({ name: ('📰 Wiki has found potential results!')})
        .addFields({ name: `• Wiki's Results`, value: `${summary.slice(0, 1021)}...`})
        .setFooter({ text: ('📰 Wiki Playground')})
        .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081275127850864640/largeblue.png')
        .setTimestamp()

        await interaction.editReply({ embeds: [embed], ephemeral: false});
    
        

    }
}
