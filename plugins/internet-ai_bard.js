let handler = async (m, {
  usedPrefix,
  command,
  text
}) => {
  try {
    if (!text) return m.reply(Func.example(usedPrefix, command, 'kucing'))
    m.react('🕒')
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image\/(jpe?g|png)/.test(mime)) {
      try {
        let img = await q.download()
        let res = await scrap.uploader(img)
        let respon = await Func.fetchJson(API('alya', '/api/func-chat', { model: 'bard', system: text, image: res.data.url }, 'apikey'))
        if (!respon.status) return m.reply(Func.jsonFormat(respon))
        m.reply(respon.data.content)
      } catch (i) {
        return client.reply(m.chat, Func.jsonFormat(i), m)
      }
    } else if (text) {
      const json = await Func.fetchJson(API('alya', '/api/bard-google-ai', { q: text }, 'apikey'))
      if (!json.status) return m.reply(Func.jsonFormat(json))
      await conn.sendMessage(m.chat, {

text: json.data.chats,

contextInfo: {

externalAdReply: { 

title: 'G O O G L E  B A R D - A I',

body: '',

thumbnailUrl: "https://telegra.ph/file/efe0022706eee2287affe.jpg",

sourceUrl: "https://bard-ai.google.com",

mediaType: 1,

renderLargerThumbnail: true

}}}, { quoted: m})
    }
  } catch (e) {
    console.log(e)
    m.reply(Func.jsonFormat(e))
  }
}
handler.help = handler.command = ['bard']
handler.tags = ['ai']
handler.limit = 2
module.exports = handler