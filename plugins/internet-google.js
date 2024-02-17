let handler = async (m, {
  usedPrefix,
  command,
  text
}) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'rancangan undang-undang'))
  m.react('🔎')
  try {
    if (command == 'google') {
      let json = await Func.fetchJson(API('alya', '/api/google', { q: text }, 'apikey'))
      let teks = `乂  *G O O G L E*\n\n`
      json.data.map((v, i) => {
        teks += `*` + (i + 1) + `.* ` + v.title + `\n`;
        teks += `  ∘  *Snippet* : ` + v.snippet + `\n`;
        teks += `  ∘  *Link* : ` + v.url + `\n\n`;
      })
      await conn.sendMessage(m.chat, {

text: teks,

contextInfo: {

externalAdReply: { 

title: '乂 G O O G L E',

body: '',

thumbnailUrl: "https://telegra.ph/file/251ffc0cad1a5770cf3cd.jpg",

sourceUrl: '',

mediaType: 1,

renderLargerThumbnail: true

}}}, { quoted: m})
    }
    if (command == 'gimage') {
      let json = await Func.fetchJson(API('alya', '/api/googleimage', { q: text }, 'apikey'))
      for (let i = 0; i < 5; i++) {
        let random = Math.floor(json.data.length * Math.random())
        let caption = `乂  *G O O G L E - I M A G E*\n\n`
        caption += `  ◦  *Title* : ${json.data[random].origin.title}\n`
        caption += `  ◦  *Dimensions* : ${json.data[random].width} × ${json.data[random].height}\n\n`
        caption += global.footer
        conn.sendFile(m.chat, json.data[random].url, 'google.jpg', caption, m)
        await Func.delay(2500)
      }
    }
  } catch (e) {
    console.log(e)
    return m.reply(status.fail)
  }
};
handler.help = handler.command = ['google', 'gimage']
handler.tags = ['internet']
handler.limit = 1
module.exports = handler