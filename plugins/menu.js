let levelling = require('../lib/levelling')
let fs = require('fs')
let path = require('path')
let moment = require('moment-timezone')
let os = require('os')
const defaultMenu = {
   before: `Halo *%pushname!* ${emot()}
   
┬┨乂 *WELCOME* 乂┠
├━━━━━━━━━━┈─⋆
│ ▸ *Name:* %pushname
│ ▸ *Exp:* %exp
│ ▸ *Limit:* %limit
│ ▸ *Level:* %level
│ ▸ *Role:* %role
│ ▸ *Status:* %prems
┖────────────┚
┬┨乂 *%wib* 乂┠
├━━━━━━━━━━┈─⋆
│ ▸ *Tanggal:* %date
│ ▸ *Hari:* %week %weton
│ ▸ *Otw Ramadhan:* %menuju1
│ ▸ *Platform:* %platform
│ ▸ *Mode:* %mode
├━━━━━━━━━━
│ *TANDA FITUR* :
│🅟 = *Premium*
│Ⓛ = *Limit*
┖────────────┚
`.trimStart(),
  header: `╭━━━━━━━━┈─◂
│≡ *MENU %category*
├━━━━━━━━┈─◂`,
  body: `│ ▸ %cmd %islimit %isPremium`,
  footer: `╰━━━━━━━━┈─◂`,
  after: global.set.footer,
}

let handler = async (m, { 
  conn, 
  usedPrefix: _p, 
  args, 
  command, 
  setting
}) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = [ 'islami', 'image', 'quotes', 'ai', 'anonymous', 'database', 'downloader', 'effect', 'fun', 'game', 'group', 'info', 'internet', 'asupan', 'maker', 'owner', 'sticker', 'tools', 'xp', 'voice']
  if (!arrayMenu.includes(teks)) teks = '404'
 if (teks == 'ai') tags = {
    ai: 'AI'
  }
    if (teks == 'anonymous') tags = {
    anonymous: 'ANONYMOUS'
  }
  if (teks == 'database') tags = {
    database: 'DATABASE'
  }
  if (teks == 'downloader') tags = {
    downloader: 'DOWNLOADER'
  }
  if (teks == 'effect') tags = {
    effect: 'EFFECT'
  }
  if (teks == 'fun') tags = {
    fun: 'FUN'
  }
  if (teks == 'game') tags = {
    game: 'GAME'
  }
  if (teks == 'group') tags = {
    group: 'GROUP'
  }
  if (teks == 'info') tags = {
    info: 'INFO'
  }
  if (teks == 'internet') tags = {
    internet: 'INTERNET'
  }
   if (teks == 'islami') tags = {
    islami: 'ISLAMI'
  }
  if (teks == 'asupan') tags = {
    asupan: 'ASUPAN'
  }
  if (teks == 'maker') tags = {
    maker: 'MAKER'
  }
  if (teks == 'image') tags = {
    image: 'IMAGE'
  }
  if (teks == 'owner') tags = {
    owner: 'OWNER'
  }
  if (teks == 'quotes') tags = {
    quotes: 'QUOTES'
  }
  if (teks == 'sticker') tags = {
    sticker: 'STICKER'
  }
  if (teks == 'tools') tags = {
    tools: 'TOOLS'
  }
  if (teks == 'xp') tags = {
    xp: 'USER INFO'
  }
  if (teks == 'voice') tags = {
    voice: 'VOICE'
  }
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let premium = global.db.data.users[m.sender].premiumTime
    let prems = `${premium > 0 ? "Premium👑": "Free"}`
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let me = conn.getName(conn.user.jid)
    let sender = m.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (m.key.participant || m.key.remoteJid)
    let tag = `@${m.sender.replace(/@.+/g, '')}`
    let pushname = m.pushName || `${senderNumber}`
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let sound = fs.readFileSync('./media/menu.mp3')
    let platform = os.platform()
    let mode = global.opts["self"] ? "Private" : "Publik"
     
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      let capt = `Haii @${m.sender.replace(/@.+/g, '')} 👋 ${ucapan()}\n`
      capt += `Selamat datang di dashboard bot kami Kami berharap Anda akan menikmati pengalaman berinteraksi dengan bot kami yang ramah dan intuitif\n\n`
      capt += `┌  ∘  *Library* : @Whiskeysocket/baileys\n`
      capt += `└  ∘  *Platform* : ${platform}\n\n`
      capt += `Bot Ini Masih Dalam Tahap Pengembangan Apabila Terjadi Erorr atau bug Pada Fiturnya Beritahu Owner Dengan Cara Ketik #owner\n\n`
      capt += `┌  ∘  ${_p + command} ai\n`
      capt += `│  ∘  ${_p + command} anonymous\n`
      capt += `│  ∘  ${_p + command} asupan\n`
      capt += `│  ∘  ${_p + command} database\n`
      capt += `│  ∘  ${_p + command} downloader\n`
      capt += `│  ∘  ${_p + command} effect\n`
      capt += `│  ∘  ${_p + command} fun\n`
      capt += `│  ∘  ${_p + command} game\n`
      capt += `│  ∘  ${_p + command} group\n`
      capt += `│  ∘  ${_p + command} info\n`
      capt += `│  ∘  ${_p + command} islami\n`
      capt += `│  ∘  ${_p + command} internet\n`
      capt += `│  ∘  ${_p + command} image\n`
      capt += `│  ∘  ${_p + command} maker\n`
      capt += `│  ∘  ${_p + command} owner\n`
      capt += `│  ∘  ${_p + command} quotes\n`
      capt += `│  ∘  ${_p + command} sticker\n`
      capt += `│  ∘  ${_p + command} tools\n`
      capt += `│  ∘  ${_p + command} xp\n`
      capt += `└  ∘  ${_p + command} voice\n\n`
      capt += global.set.footer
      await conn.sendMessageModify(m.chat, Func.Styles(capt), m, {
        largeThumb: true,
        url: global.gcl,
        })
      return conn.sendFile(m.chat, sound, '', '', m, null, { ptt: true, waveform: [100, 0, 100, 0, 100, 0, 100], })
      
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? 'Ⓛ︎' : '')
                .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%', mode, platform, wib, more, after, menuju1, prems, pushname, tag, p: _p, uptime, muptime, me: conn.user.name, npmname: package.name, npmdesc: package.description, version: package.version, exp: exp - min, maxexp: xp, totalexp: exp, xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`, github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]', level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role, readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    conn.sendMessage(m.chat, {
            document: fs.readFileSync("./media/file.pdf"),
            fileName: '©乂Yoshida 伊',
            mimetype: Randompepek(),
            fileLength: '999999999999999',
            pageCount: "2024",
            caption: text.trim(),
            mention: [m.sender],
            contextInfo: {
              forwardingScore: '999999999',
              externalAdReply: {
                mediaType: 1,
                mediaUrl: '',
                renderLargerThumbnail: true,
                showAdAttribution: true, 
                sourceUrl: "https://saweria.co/Adisptro",
                thumbnailUrl: timeimg(),
                title: wayah(), 
                body: 'Donate For Support This Bot >〰<',
              },
            },
          }, { quoted: m })
  } catch (e) {
    conn.reply(m.chat, 'Maaf menu sedang error..❗', m)
    throw e
  }
}
handler.help = ['menu']
handler.command = /^(menu|help|\?)$/i
handler.exp = 3
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
const more = String.fromCharCode(1)
const readMore = more.repeat(1)

// Memilih Secara Acak satu Mimetype
function Randompepek() {
const pepek = [
"application/pdf",
"application/msword",
"application/vnd.ms-excel",
"application/vnd.ms-powerpoint",
"application/x-rar-compressed",
"application/vnd.openxmlformats-officedocument.presentationml.      presentation",
"application/vnd.openxmlformats-officedocument.spreadsheetml.      sheet",
"application/vnd.openxmlformats-officedocument.wordprocessingml.   document"
];
const randomIndex = Math.floor(Math.random() * pepek.length);
return pepek[randomIndex];
}
//Hitung Mundur 
       const HBD = new Date('December 09, 2024 06:00:00').getTime();
        const sekarang = new Date().getTime();
        const Selisih = HBD - sekarang;
        const jhari = Math.floor(Selisih / (1000 * 60 * 60 * 24));
        const menuju = `${jhari} hari`
        
        const puasa = new Date('Maret 10, 2024 06:00:00').getTime();
        const sekarang1 = new Date().getTime();
        const Selisih1 = puasa - sekarang;
        const jhari1 = Math.floor(Selisih1 / (1000 * 60 * 60 * 24));
        const menuju1 = `${jhari1} hari`
        
        const TahunBaru = new Date('Januari 01, 2025 00:01:00').getTime();
        const sekarang2 = new Date().getTime();
        const Selisih2 = TahunBaru - sekarang;
        const jhari2 = Math.floor(Selisih2 / (1000 * 60 * 60 * 24));
        const menuju2 = `${jhari2} hari`


function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function emot() {
const time = moment.tz('Asia/Jakarta').format('HH')
let res = "💤"
if (time >= 4) {
res = "🍟"
}
if (time >= 10) {
res = "👋"
}
if (time >= 16) {
res = "🍭"
}
if (time >= 18) {
res = "🚬"
}
if (time >= 19) {
res = "☕"
}
return res
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = 'Selamat Begadang 😴'
  if (time >= 5) {
    res = 'Selamat Pagi'
  }
  if (time > 10) {
    res = 'Selamat Siang'
  }
  if (time >= 15) {
    res = 'Selamat Sore'
  }
  if (time >= 18) {
    res = 'Selamat Malam'
  }
  return res
}
function wayah() {
const time = moment.tz('Asia/Jakarta').format('HH')
let res = "Jangan Lupa Istirahat 😴"
if (time >= 5) {
res = "Selamat Pagi 🌄"
}
if (time >= 10) {
res = "Selamat Siang ☀️"
}
if (time >= 16) {
res = "Selamat Sore 🌇"
}
if (time >= 18) {
res = "Selamat Petang 🌆"
}
if (time >= 19) {
res = "Selamat Malam 🌙"
}
return res
}
function timeimg() {
const time = moment.tz('Asia/Jakarta').format('HH')
let imgloc = "https://telegra.ph/file/d583359be5da4e798404d.jpg"
if (time >= 0) {
imgloc = "https://telegra.ph/file/d583359be5da4e798404d.jpg"
}
if (time >= 4) {
imgloc = "https://telegra.ph/file/ff3308f4ab2b542476bf7.jpg"
}
if (time >= 6) {
imgloc = "https://telegra.ph/file/ba737caaa440c096d2e47.jpg"
}
if (time >= 10) {
imgloc = "https://telegra.ph/file/d2fca4f27401b26c64fa7.jpg"
}
if (time >= 16) {
imgloc = "https://telegra.ph/file/281e8666e6ab061833687.jpg"
}
if (time >= 18) {
imgloc = "https://telegra.ph/file/e849f002d556deae13876.jpg"
}
if (time >= 20) {
imgloc = "https://telegra.ph/file/fc4f1ad2ced2d15f31ef4.jpg"
}
return imgloc
}