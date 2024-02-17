let handler = async (m, {
  usedPrefix,
  command,
  args
}) => {
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Kirim atau balas gambar dengan perintah ${usedPrefix + command}`)
    let media = await q.download()
    let url = await scrap.uploader(media)
    m.reply(status.wait)
    let res = await Func.fetchJson(`https://api.lolhuman.xyz/api/imagetoanime?apikey=GataDios&img=${url}`)
   let convert = await res.json()

			let buff = await fetch(convert.result.img_crop_single)

  .then(res => res.buffer())

			await conn.sendMessage(m.chat, { image: buff, caption: `🍟 *Fetching* : ${((new Date - old) * 1)} ms` }, { quoted: m })

	
    
  } catch (e) {
    console.log(e)
    return m.reply(status.error)
  }
}
handler.help = handler.command = ['toanime']
handler.tags = ['effect']
handler.limit = 1
module.exports = handler