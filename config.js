/** enter owner number */
global.owner = ['62882007855266']

/** global gc link */
global.gcl = 'https://chat.whatsapp.com/HnoKcpzYsKE5y0thEM060h',
global.saluran = 'https://whatsapp.com/channel/0029VaBB5zLF1YlNMoA6YD0b',
global.maxwarn = '3',

//INI WAJIB DI ISI!//
global.btc = 'YOUR_APIKEY_HERE',
//Daftar terlebih dahulu https://api.botcahx.eu.org
global.lann = 'YOUR_APIKEY_HERE',
//https://api.betabotz.eu.org
global.APIs = {
  alya: 'https://api.alyachan.pro',
   lann: 'https://api.betabotz.eu.org',
   btc: 'https://api.botcahx.eu.org',
}
global.APIKeys = {
  'https://api.alyachan.pro': '_',
  'https://api.lolhuman.xyz': '_',
  'https://api.betabotz.eu.org': '_',
  'https://api.botcahx.eu.org',
}

/** option setting */
global.set = {
  wm: `YOSHIDA-MD`,
  version: `V ${require('./package.json').version}`,
  footer: 'ʟɪɢʜᴛᴡᴇɪɢʜᴛ ᴡᴀ ʙᴏᴛ ʙʏ ʙᴀɴɢ ᴀᴅɪ',
  packname: 'ʏᴏsʜɪᴅᴀ-ᴍᴅ𐂃',
  author: '@ʙᴀɴɢ_ᴀᴅɪ'
}
/** enter your bot number to login using the code */
global.pairingNumber = 263788891104

/** enter your replit link, so it's active 24/7 */
global.replit_url = ''

/** other */
global.multiplier = 1000 // The bigger it gets the harder it is to level up
global.max_upload = 70 // Maximum limit to send files
global.intervalmsg = 1800 // To avoid spam on first login
global.ram_usage = 2100000000 // Maximum 2GB ram, do the math yourself

/** function and scraper to make it more practical */
global.Func = new (require('./lib/functions'))
global.scrap = new (require('./lib/scrape'))

/** status message */
global.status = {
  wait: 'Processing. . .',
  invalid: 'Url invalid!',
  wrong: 'Format salah!',
  error: 'Lagi eror cuyy🙏',
  premium: 'Fitur khusus anggota premium.',
  admin: 'Fitur khusus admin.',
  botAdmin: 'Bot harus menjadi admin untuk menggunakan fitur ini.',
  owner: 'Fitur khusus owner.',
  mod: 'Fitur khusus moderator.',
  group: 'Fitur khusus digunakan didalam grup.',
  private: 'Fitur khusus private chat.',
  register: 'Mohon daftar terlebih dahulu untuk menggunakan fitur ini.',
  game: 'Fitur game belum di aktifkan.',
  rpg: 'Fitur RPG belum di aktifkan saat ini.',
  restrict: 'Udah off cuyy'
}

/** rpg emoticon */
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '⚔️',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈',
      dog: '🐕',
      fox: '🦊',
      petFood: '🍖',
      iron: '⛓️',
      gold: '👑',
      emerald: '💚',
    }
    let results = Object.keys(emot).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  },
}

/** reload file */
const fs = require('fs')
const chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})