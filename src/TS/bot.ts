// Variables
const Discord = require('discord.js')
const fs = require('fs')
const Token: string = process.env['TOKEN']
const Bot = new Discord.Client()
const Prefix = '.'

Bot.once('ready', () => {
    console.log('✅ The bot is online!')
})

// Commands
Bot.on('message', (Message: any) => {
    if (Message.author.bot) return;
    if (Message.author.webhook) return;
    if (Message.channel.type == 'dm') return;


    switch (Message.content) {
        case (`${Prefix}test`):
            Message.channel.send(Message.guild.id)
            break
        
        default:
            let msgs = JSON.parse(fs.readFileSync('./messages.json', 'utf-8'))


            if (Message.content.substr(0, 6) === `${Prefix}watch`) {
                let _channel = Message.content.split(' ')[1]
                Message.reply(`Watching \`\`${_channel}\`\``)

                if (msgs[Message.guild.id]) {
                    msgs[Message.guild.id] = {
                        channel: _channel,
                        msgs: msgs[Message.guild.id].msgs,
                        sender: msgs[Message.guild.id].sender
                    }
                } else if (!msgs[Message.guild.id]) {
                    msgs[Message.guild.id] = {
                        channel: _channel
                    }
                }

                fs.writeFile('./messages.json', JSON.stringify(msgs), (err: string) => {
                    console.log(err)
                })
            }


            if (Message.content.substr(0, 1) === '.') return
            if (msgs[Message.guild.id] === undefined) {
                msgs[Message.guild.id] = {
                    
                }
            }
            if (msgs[Message.guild.id].channel === undefined) return
            console.log(msgs[Message.guild.id].channel)
            console.log(`[${Message.guild.id} - ${Message.channel.id}] ${Message.content}`)

            if (msgs[Message.guild.id]) {
                msgs[Message.guild.id] = {
                    channel: msgs[Message.guild.id].channel,
                    msgs: Message.content,
                    sender: Message.member.user.tag
                }
            } else if (!msgs[Message.guild.id]) {
                msgs[Message.guild.id] = {
                    channel: msgs[Message.guild.id].channel,
                    msgs: Message.content,
                    sender: Message.member.user.tag
                }
            }

            let msg = msgs[Message.guild.id].msgs

            fs.writeFile('./messages.json', JSON.stringify(msgs), (err: string) => {
                console.log(err)
            })
    }
})

Bot.login(Token)