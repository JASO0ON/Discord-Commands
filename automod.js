const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("automod")
    .setDMPermission(false)
    .setDescription("Setup Automod for your server.")
    .addSubcommand(command => command
        .setName("flagged-words")
        .setDescription("Blocks profanity, specific content, and slurs from being sent.")
    )
    .addSubcommand(command => command
        .setName("spam-messages")
        .setDescription("Stops spam from being sent.")
    )
    .addSubcommand(command => command
        .setName("mention-spam")
        .setDescription("Stops users from spam pinging members.")
        .addIntegerOption(option => option
            .setName("number")
            .setDescription("Specified amount will be used as the max mention amount.")
            .setRequired(true))
    )
    .addSubcommand(command => command
        .setName("keyword")
        .setDescription("Block a specified word in the Server.")
        .addStringOption(option => option
            .setName("word")
            .setDescription("Specified word will be blocked from being sent.")
            .setRequired(true))
    ),

    async execute (interaction) {
        const { guild, options } = interaction;
        const sub = options.getSubcommand();

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({
            content: `You **do not** have the permission to do that!`,
            ephemeral: true
        });

        switch (sub) {
            case "flagged-words":

            await interaction.reply({ content: `Loading your **automod rule**..`});

            const rule = await guild.autoModerationRules.create({
                name: `Block profinity, sexual content, and slurs by PixelVal.`,
                creatorId: '1076798263098880116',
                enabled: true,
                eventType: 1,
                triggerType: 4,
                triggerMetadata: 
                    {
                        presets: [1, 2, 3]
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by PixelVal!'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    return;
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule) return;

                const embed = new EmbedBuilder()
                .setColor("DarkRed")
                .setTimestamp()
                .setDescription(`> Automod Role added`)
                .addFields({ name: `• Automod Rule`, value: `> Flagged Words rule added`})
                .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')
                .setAuthor({ name: `🔨 Automod Tool`})
                .setFooter({ text: `🔨 Flagged Words enabled`})

                await interaction.editReply({
                    content: ``,
                    embeds: [embed]
                })
            }, 3000)

            break;

            case 'keyword':

            await interaction.reply({ content: `Loading your **automod rule**..`});
            const word = options.getString("word");

            const rule2 = await guild.autoModerationRules.create({
                name: `Prevent the word ${word} by PixelVal.`,
                creatorId: '1076798263098880116',
                enabled: true,
                eventType: 1,
                triggerType: 1,
                triggerMetadata: 
                    {
                        keywordFilter: [`${word}`]
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by PixelVal.'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    return;
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule2) return;

                const embed2 = new EmbedBuilder()
                .setColor("DarkRed")
                .setTitle('> Keyword Filter added')
                .setAuthor({ name: `🔨 Automod Tool`})
                .setFooter({ text: `🔨 Keyword Added`})
                .setTimestamp()
                .addFields({ name: `• Automod Rule`, value: `> Your automod rule has been created. Messages \n> with **${word}** will be deleted`})
                .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')

                await interaction.editReply({
                    content: ``,
                    embeds: [embed2]
                })
            }, 3000)

            break;

            case 'spam-messages':

            await interaction.reply({ content: `Loading your **automod rule**..`});
            

            const rule3 = await guild.autoModerationRules.create({
                name: `Prevent Spam Messages by PixelVal.`,
                creatorId: '1076798263098880116',
                enabled: true,
                eventType: 1,
                triggerType: 5,
                triggerMetadata: 
                    {
                        //mentionTotalLimit: number
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by PixelVal.'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    return;
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule3) return;

                const embed3 = new EmbedBuilder()
                .setColor("DarkRed")
                .setTitle('> Spam Filter added')
                .setAuthor({ name: `🔨 Automod Tool`})
                .setFooter({ text: `🔨 Spam Rule added`})
                .setTimestamp()
                .addFields({ name: `• Automod Rule`, value: `> Spam Rule added, all spam messages \n> will be deleted.`})
                .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')            

                await interaction.editReply({
                    content: ``,
                    embeds: [embed3]
                })
            }, 3000)

            break;

            case 'mention-spam': 
            await interaction.reply({ content: `Loading your **automod rule**..`});
            const number =  options.getInteger("number")

            const rule4 = await guild.autoModerationRules.create({
                name: `Prevent Spam Mentions by PixelVal.`,
                creatorId: '1076798263098880116',
                enabled: true,
                eventType: 1,
                triggerType: 5,
                triggerMetadata: 
                    {
                        mentionTotalLimit: number
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by PixelVal.'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    return;
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule4) return;

                const embed4 = new EmbedBuilder()
                .setColor("DarkRed")
                .setTitle('> Spam Mention Filter added')
                .setAuthor({ name: `🔨 Automod Tool`})
                .setFooter({ text: `🔨 Spam Mention Rule added`})
                .setTimestamp()
                .addFields({ name: `• Automod Rule`, value: `> Spam Mention Rule added, all spam messages \n> will be deleted.`})
                .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081267701302972476/largered.png')

                await interaction.editReply({
                    content: ``,
                    embeds: [embed4]
                })
            }, 3000)

            break;

        }
    }
}