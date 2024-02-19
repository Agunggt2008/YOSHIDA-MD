let handler = async (m, {
  usedPrefix,
  command,
  text
}) => {
  try {
    if (!text) return m.reply(Func.example(usedPrefix, command, 'Elon Musk'))
    m.react('🕒')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image\/(jpe?g|png)/.test(mime)) {
      try {
        let img = await q.download()
        let res = await scrap.uploader(img)
        let respon = await Func.fetchJson(API('alya', '/api/func-chat', { model: 'gemini', system: text, image: res.data.url }, 'apikey'))
        if (!respon.status) return m.reply(Func.jsonFormat(respon))
        m.reply(respon.data.content)
      } catch (i) {
        return conn.reply(m.chat, Func.jsonFormat(i), m)
      }
    } else if (text) {
      const cok = await Func.fetchJson(API('alya', '/api/gemini', { q: text }, 'apikey'))
      if (!cok.status) return m.reply(Func.jsonFormat(cok))
     await conn.sendMessage(m.chat, {
text: cok.data.content,
contextInfo: {
externalAdReply: { 
title: 'G E M I N I - A I',
body: '',
thumbnailUrl: "https://telegra.ph/file/3173b0d674a4a290cfd62.jpg",
sourceUrl: '',
mediaType: 1,
renderLargerThumbnail: true

}}}, { quoted: m})
 }
    } catch (e) {
    console.log(e)
    m.reply(e.msg)
  }
}
handler.help = ['gemini']
handler.tags = ['ai']
handler.command = /^(gemini)$/i
handler.limit = 2
module.exports = handler