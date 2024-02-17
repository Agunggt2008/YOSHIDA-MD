let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  conn.confess = conn.confess ? conn.confess : {}
  if (!text) return m.reply(Func.example(usedPrefix, command, '>nomor tujuan< | >nama pengirim<  | >pesan/teks<'))
  let [jid, name, pesan] = text.split('|')
  if ((!jid || !name || !pesan)) m.reply(Func.example(usedPrefix, command, '>nomor tujuan<  | >nama pengirim<  | >pesan<'))
  jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let data = (await conn.onWhatsApp(jid))[0] || {}
  if (!data.exists) return m.reply(Func.texted('bold', 'sepertinya nomor tersebut tidak terdaftar di WhatsApp '))
  if (jid == m.sender) return m.reply(Func.texted('bold', 'tidak bisa mengirim pesan ke diri sendiri'))
  let mf = Object.values(conn.confess).find(mf => mf.status === true)
  if (mf) return !0
  try {
    let id = +new Date
    let txt = `Hallo @${data.jid.split('@')[0]}, Kamu menerima pesan menfe6\n\nDari : ${name}\nPesan : \n${pesan}\n\n Ingin membalas pesan ini? Ketik pesanmu cuyy, nanti akan saya sampaikan ke ${name}.`.trim()
    await conn.reply(data.jid, txt, null).then(() => {
      m.reply('Berhasil mengirim pesan.. semoga di bales cuyy')
      conn.confess[id] = {
        id,
        dari: m.sender,
        nama: name,
        penerima: data.jid,
        pesan: pesan,
        status: false
      }
      return !0
    })
  } catch (e) {
    console.log(e)
    m.reply('eror')
  }
}
handler.help = ['menfess']
handler.tags = ['fun']
handler.command = ['menfess', 'confess', 'menfes', 'confes']
handler.private = true
module.exports = handler