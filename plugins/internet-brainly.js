let handler = async (m, {
    usedPrefix,
    command,
    text
}) => {
    if (!text) return m.reply(Func.example(usedPrefix, command, 'Penemu listrik'))
    m.react('🔎')
    try {
        const json = await Func.fetchJson(API('alya', '/api/brainly', { questions: text }, 'apikey'))
        if (!json.status) return m.reply(Func.jsonFormat(json))
        let teks = `*B R A I N L Y*\n\n`
        json.data.map((v, i) => {
            teks += `*${(i + 1)}*. ${v.question}\n`
            teks += `›  *Jawaban* : \n${v.answers}\n\n`
        })
        await conn.sendMessage(m.chat, {
text: teks,
contextInfo: {
externalAdReply: { 
title: '乂 B R A I N L Y',
body: '',
thumbnailUrl: "https://telegra.ph/file/d5726b13c39a5d51253c2.jpg",
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
    } catch {
        console.log(e)
        return m.reply(status.error)
    }
}
handler.help = ['brainly']
handler.command = ['brainly','br']
handler.tags = ['internet']
handler.limit = 2
module.exports = handler