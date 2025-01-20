import { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export class DiscordBot {
    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping
            ]
        });
        this.isConnected = false;
    }

    async initialize() {
        try {
            await this.client.login(process.env.DISCORD_BOT_TOKEN);
            this.isConnected = true;
            console.log('Discord bot connected successfully');

            this.client.on('ready', () => {
                console.log(`Logged in as ${this.client.user.tag}!`);
            });

            this.client.on('error', (error) => {
                console.error('Discord bot error:', error);
                this.isConnected = false;
                setTimeout(() => this.initialize(), 5000);
            });

        } catch (error) {
            console.error('Failed to initialize Discord bot:', error);
            this.isConnected = false;
            setTimeout(() => this.initialize(), 5000);
        }
    }

    async sendMessage(message, urls = {}) {
        if (!this.isConnected) return;

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('ICPSwap')
                    .setStyle(ButtonStyle.Link)
                    .setURL(urls.icpswap || 'https://google.com'),
                new ButtonBuilder()
                    .setLabel('KongSwap')
                    .setStyle(ButtonStyle.Link)
                    .setURL(urls.kongswap || 'https://google.com')
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Website')
                    .setStyle(ButtonStyle.Link)
                    .setURL(urls.website || 'https://google.com')
            );

        try {
            const guilds = this.client.guilds.cache;
            for (const guild of guilds.values()) {
                const defaultChannel = guild.channels.cache
                    .find(channel => 
                        channel.type === 0 && // 0 is text channel
                        channel.permissionsFor(guild.members.me).has('SendMessages')
                    );

                if (defaultChannel) {
                    await defaultChannel.send({
                        content: message,
                        components: [row, row2]
                    });
                }
            }
        } catch (error) {
            console.error('Error sending Discord message:', error);
        }
    }
} 