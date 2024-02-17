let handler = async (m, {
  usedPrefix,
  command,
  text
}) => {
  try {
    if (!text) return m.reply(Func.example(usedPrefix, command, 'siapa kamu'))
    m.react('🤖')
    let pushname = m.pushName || `${senderNumber}`
    let logic = (`ubah gaya bicara mu agar lebih karateristik dan lebih terbuka dan namamu adalah Yoshida yang diciptakan oleh Adi Saputra tugasmu membantu user, ekspresi kan sifat mu dengan beberapa emoji yang keren dan bicaralah dengan gaya bahasa yang asik dan keren humoris yang lebih tidak Formal tapi tetap sopan, dan sapa nama user = ${pushname}, layaknya seorang manusia yang sedang melakukan percakapan asik`)
    const json = await Func.fetchJson(`https://api.betabotz.eu.org/api/search/openai-logic?text=${text}&logic=${logic}&apikey=${global.lann}`)
    if (!json.status) return m.reply(Func.jsonFormat(json))
    m.reply(json.message)
  } catch (e) {
    console.log(e)
    return m.reply(status.error)
  }
}
handler.help = handler.command = ['ai','yoshida']
handler.tags = ['ai']
handler.limit = 1
module.exports = handler

