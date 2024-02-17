### MOON-BOT
> This script is 100% free, use Apikey 🔥

### What is needed
- [x] Server
- [x] WhatsApp
- [x] Apikey
- BOTCAHX [`Register`](https://api.botcahx.eu.org)
- Lann [`Register`](https://api.betabotz.eu.org)
- Setelah mendapatkan apikey silahkan paste di config.js pada bagian ```global.btc``` dan ```global.lann```

### Set in config.js
```Javascript
global.owner = ['62882007855266'] // Ganti nomor mu yg mau jadiin owner 

global.APIs = {
  alya: 'https://api.alyachan.pro'
}

global.APIKeys = {
  'https://api.alychan.pro', 'YOURKEY'
}

global.set = {
  link: '_', // link grup mu
  thumbnail: '_', //isi pake link thumbnail mu
  wm: 'YOSHIDA - BLITZ',
  footer: 'ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
  packname: 'Sticker By',
  author: 'Adi'
}

global.pairingNumber = 6285267445570

global.multiplier = 7 
global.max_upload = 70
global.intervalmsg = 1800
```

### Plugins
```Javascript
let handler = async(m, {
  conn,
  usedPrefix,
  command,
  args,
  text,
  users,
  isOwner,
  isPrem
}) => {
  try {
    // di isi sembarang cok 🗿
  } catch {
    console.log(e)
    return conn.reply(m.chat, Func.jsonFormat(e), m)
  }
}
handler.help = ['command'] // comandnya
handler.tags = ['category'] // category
handler.command = /^(command)$/i // command
handler.group = Boolean // for group
handler.limit = Boolean // use limit
handler.game = Boolean // game mode
handler.rpg = Boolean // rpg mode
handler.owner = Boolean // for owner
handler.admin = Boolean // for admin
handler.botAdmin = Boolean // bot harus jadi admin
handler.premium = Boolean // bot must be an admin
handler.private = Boolean // private chat only
```

### Install and run
```
$ npm install
$ npm start
```

## Install & Run use PM2

```
$ npm install pm2 -g
$ npm install
$ pm2 start index.js && pm2 save && pm2 logs
```

### Argument node . [--options]

+ ```node . --pairing``` : For those of you who login using a code, use this command in the terminal
+ ```node . --db 'mongodb uri'``` : If you want to connect the database to mongodb use this command

### Thanks To
> [Nurutomo](https://github.com/Nurutomo)
> [Neoxr](https://github.com/neoxr)
> [Alya](https://github.com/alya-tok)
> [Adi](https://github.com/Adixshnzz)