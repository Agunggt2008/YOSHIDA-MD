const Bard = require('fix-esm').require('bard-ai').default
let handler = async(m, {
    usedPrefix,
    command,
    text
  }) => {
    try {
    if (!text) return m.reply(`Halo ada yang bisa saya bantu?`)
        let token_bard = 'AIzaSyA0isvvHgTADAd5d-OMsqBZMFGv284opJc',
        let myBard = Bard (token_bard)
        conn.sendMessage(m.chat, { react: { text: `🤖`, key: m.key }})
        let result = await myBard.ask(text)
        let res = result.trim()
        m.reply(res)
      } catch (e) {
    console.log(e)
    return m.reply('Terjadi kesalahan pada situs server..')
  }
}
  handler.help = handler.command = ['bard2']
  handler.tags = ['ai']
  handler.limit = false
  module.exports = handler