const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const nsfwschema = require('../../Schemas.js/nsfwsetup');
const { NSFW } = require('nsfw-ts');
const nsfw = new NSFW();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nsfw')
    .setNSFW(true)
    .setDMPermission(false)
    .setDescription('Uhm.. self explanatory!')
    .addSubcommand(command => command.setName('enable').setDescription('Enables nsfw commands in your server.'))
    .addSubcommand(command => command.setName('disable').setDescription('Disables nsfw commands in your server.'))
    .addSubcommand(command => command.setName('4k').setDescription('Shows a 4K "image".'))
    .addSubcommand(command => command.setName('ass').setDescription('Shows an ass image.'))
    .addSubcommand(command => command.setName('pussy').setDescription('Shows a pussy image.'))
    .addSubcommand(command => command.setName('boobs').setDescription('Shows some boobs.'))
    .addSubcommand(command => command.setName('anal').setDescription('Shows a picture of anal.'))
    .addSubcommand(command => command.setName('thigh').setDescription('Shows a picture of a thigh.'))
    .addSubcommand(command => command.setName('pgif').setDescription('Shows a porn gif.'))
    .addSubcommand(command => command.setName('hentai').setDescription('Shows a hentai image.')),
    async execute(interaction) {

        const sub = interaction.options.getSubcommand();
        const data = await nsfwschema.findOne({ Guild: interaction.guild.id });

        switch (sub) {
            case 'enable':

            if (data) return await interaction.reply({ content: `You **already** have nsfw **enabled** in this server!`, ephemeral: true});
            else {

                await nsfwschema.create({
                    Guild: interaction.guild.id
                })

                const setup = new EmbedBuilder()
                .setColor('DarkRed')
                .setTimestamp()
                .setTitle('> NSFW Enabled')
                .setAuthor({ name: `🔞 NSFW Playground`})
                .setFooter({ text: `🔞 NSFW Enabled`})
                .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')
                .addFields({ name: `• NSFW Enabled`, value: `> NSFW is now enabled. All nsfw commands are \n> now available to your members. To \n> disable nsfw do **/nsfw disable**. These \n> commands can only be executed in nsfw channels.`})
                
                await interaction.reply({ embeds: [setup] })
            }

            break;
            case 'disable':

            if (!data) return await interaction.reply({ content: `You **already** have nsfw **disabled** in this server!`, ephemeral: true});
            else {

                await nsfwschema.deleteMany({ Guild: interaction.guild.id });

                const disable = new EmbedBuilder()
                .setColor('DarkRed')
                .setTimestamp()
                .setTitle('> NSFW Disabled')
                .setAuthor({ name: `🔞 NSFW Playground`})
                .setFooter({ text: `🔞 NSFW Disabled`})
                .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')
                .addFields({ name: `• NSFW Disabled`, value: `> NSFW is now disabled. All nsfw commands are \n> no longer available to your members.`})
                
                await interaction.reply({ embeds: [disable] });
            }

            break;
            case '4k':

            await interaction.deferReply();

            if (!data) return await interaction.reply({ content: `**NSFW** is disabled in this server!`, ephemeral: true});
            if (!interaction.channel.nsfw) return await interaction.reply({ content: `You **cannot** execute this command in a **non-nsfw** channel.`, ephemeral: true});

            const kimage = await nsfw.fourk()
            const kembed = new EmbedBuilder()
            .setAuthor({ name: `🔞 NSFW Playground`})
            .setFooter({ text: `🔞 4K Image Sent`})
            .setTitle('> One 4K Image coming up..')
            .setColor('DarkRed')
            .setImage(kimage)

            await interaction.editReply({ embeds: [kembed] })

            break;
            case 'ass':

            await interaction.deferReply();

            if (!data) return await interaction.reply({ content: `**NSFW** is disabled in this server!`, ephemeral: true});
            if (!interaction.channel.nsfw) return await interaction.reply({ content: `You **cannot** execute this command in a **non-nsfw** channel.`, ephemeral: true});

            const assimage = await nsfw.ass()
            const assembed = new EmbedBuilder()
            .setAuthor({ name: `🔞 NSFW Playground`})
            .setFooter({ text: `🔞 Ass Image Sent`})
            .setTitle('> One Ass Image coming up..')
            .setColor('DarkRed')
            .setImage(assimage)

            await interaction.editReply({ embeds: [assembed] })

            break;
            case 'pussy':

            await interaction.deferReply();

            if (!data) return await interaction.reply({ content: `**NSFW** is disabled in this server!`, ephemeral: true});
            if (!interaction.channel.nsfw) return await interaction.reply({ content: `You **cannot** execute this command in a **non-nsfw** channel.`, ephemeral: true});

            const pussyimage = await nsfw.pussy()
            const pussyembed = new EmbedBuilder()
            .setAuthor({ name: `🔞 NSFW Playground`})
            .setFooter({ text: `🔞 Pussy Image Sent`})
            .setTitle('> One Pussy Image coming up..')
            .setColor('DarkRed')
            .setImage(pussyimage)

            await interaction.editReply({ embeds: [pussyembed] })

            break;
            case 'boobs':

            await interaction.deferReply();

            if (!data) return await interaction.reply({ content: `**NSFW** is disabled in this server!`, ephemeral: true});
            if (!interaction.channel.nsfw) return await interaction.reply({ content: `You **cannot** execute this command in a **non-nsfw** channel.`, ephemeral: true});

            const boobsimage = await nsfw.boobs()
            const boobsembed = new EmbedBuilder()
            .setAuthor({ name: `🔞 NSFW Playground`})
            .setFooter({ text: `🔞 Boobs Image Sent`})
            .setTitle('> One Boobs Image coming up..')
            .setColor('DarkRed')
            .setImage(boobsimage)

            await interaction.editReply({ embeds: [boobsembed] })

            break;
            case 'anal':

            await interaction.deferReply();

            if (!data) return await interaction.reply({ content: `**NSFW** is disabled in this server!`, ephemeral: true});
            if (!interaction.channel.nsfw) return await interaction.reply({ content: `You **cannot** execute this command in a **non-nsfw** channel.`, ephemeral: true});

            const analimage = await nsfw.anal()
            const analembed = new EmbedBuilder()
            .setAuthor({ name: `🔞 NSFW Playground`})
            .setFooter({ text: `🔞 Anal Image Sent`})
            .setTitle('> One Anal Image coming up..')
            .setColor('DarkRed')
            .setImage(analimage)

            await interaction.editReply({ embeds: [analembed] })

            break;
            case 'thigh':

            await interaction.deferReply();

            if (!data) return await interaction.reply({ content: `**NSFW** is disabled in this server!`, ephemeral: true});
            if (!interaction.channel.nsfw) return await interaction.reply({ content: `You **cannot** execute this command in a **non-nsfw** channel.`, ephemeral: true});

            const thighimage = await nsfw.thigh()
            const thighembed = new EmbedBuilder()
            .setAuthor({ name: `🔞 NSFW Playground`})
            .setFooter({ text: `🔞 Thigh Image Sent`})
            .setTitle('> One Thigh Image coming up..')
            .setColor('DarkRed')
            .setImage(thighimage)

            await interaction.editReply({ embeds: [thighembed] })

            break;
            case 'pgif':

            await interaction.deferReply();

            if (!data) return await interaction.reply({ content: `**NSFW** is disabled in this server!`, ephemeral: true});
            if (!interaction.channel.nsfw) return await interaction.reply({ content: `You **cannot** execute this command in a **non-nsfw** channel.`, ephemeral: true});

            const pgifimage = await nsfw.pgif()
            const pgifembed = new EmbedBuilder()
            .setAuthor({ name: `🔞 NSFW Playground`})
            .setFooter({ text: `🔞 Porn GIF Sent`})
            .setTitle('> One Porn GIF coming up..')
            .setColor('DarkRed')
            .setImage(pgifimage)

            await interaction.editReply({ embeds: [pgifembed] })

            break;
            case 'hentai':

            await interaction.deferReply();

            if (!data) return await interaction.reply({ content: `**NSFW** is disabled in this server!`, ephemeral: true});
            if (!interaction.channel.nsfw) return await interaction.reply({ content: `You **cannot** execute this command in a **non-nsfw** channel.`, ephemeral: true});

            const hentaiimage = await nsfw.hentai()
            const hentaiembed = new EmbedBuilder()
            .setAuthor({ name: `🔞 NSFW Playground`})
            .setFooter({ text: `🔞 Hentai Image Sent`})
            .setTitle('> One Hentai Image coming up..')
            .setColor('DarkRed')
            .setImage(hentaiimage)

            await interaction.editReply({ embeds: [hentaiembed] })

        }   
    }
}