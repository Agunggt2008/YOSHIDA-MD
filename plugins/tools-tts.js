const defaultLang = 'id'
let handler = async (m, { usedPrefix,
    command,
    args
}) => {
    if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'id hello guys'))
    try {
        let text = args.slice(1).join('')
        if ((args[0] || '').length !== 2) {
            lang = defaultLang
            text = args.join(' ')
        }
        if (!text && m.quoted && m.quoted.text) text = m.quoted.text
        conn.sendPresenceUpdate('recording', m.chat)
        let json = await Func.fetchJson(API('alya', '/api/tts', { text: text, iso: args[0] }, 'apikey'))
        conn.sendMedia(m.chat, json.data.url, m, {
            filename: 'tts.opus',
            mentions: [m.sender]
        })
    } catch (e) {
        console.log(e)
        return m.reply(`Masukan kode bahasa yang benar\n\nketik #kodebahasa untuk melihat list bahasa!`)
    }
}
handler.help = ['texttospeech']
handler.tags = ['ai']
handler.command = ['tts', 'texttospeech']
handler.limit = 1
module.exports = handler
