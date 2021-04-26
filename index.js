const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./comm4nd/help')
const apikeyimgbb = '04b9e9337ecb1ceb0250f81549301785'
const banmsgporn = 'Hmmm, ja sabe né...'
const { cv1} = require('./comm4nd')
const { credits } = require('./src/credits')
const { tipo } = require('./src/tipo')
const { about } = require('./src/about')
const { idioma } = require('./src/idioma')
const { music } = require('./src/music')
const { flix } = require('./src/flix')
const { fga } = require('./src/fga')
const { produtos } = require('./src/produtos')
const { entretenimento } = require('./src/entretenimento')
const { maker } = require('./src/maker')
const { adms } = require('./src/adms')
const { consultas } = require('./src/consultas')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const request = require('request')
const imgbb = require('imgbb-uploader')
const FormData = require('form-data')
const imgbbUploader = require('imgbb-uploader')
const imageToBase64 = require('image-to-base64')
const { removeBackgroundFromImageFile } = require('remove.bg')
const lolis = require('lolis.life')
const loli = new lolis()
const double = Math.floor(Math.random() * 2) + 1
const antifake = JSON.parse(fs.readFileSync('./src/antifake.json'))
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
const key = JSON.parse(fs.readFileSync('./src/key.json'))
const antiporn = JSON.parse(fs.readFileSync('./src/antiporn.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
const apilol = 'sua key'
prefix = setting.prefix
apiKey = setting.apiKey
blocked = []
ban = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const thoth = new WAConnection()
	thoth.logger.level = 'warn'
	console.log(banner.string)
	thoth.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./BarBar.json') && thoth.loadAuthInfo('./BarBar.json')
	thoth.on('connecting', () => {
		start('2', 'Connecting...')
	})
	thoth.on('open', () => {
		success('2', 'Connected')
	})
	await thoth.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./BarBar.json', JSON.stringify(thoth.base64EncodedAuthInfo(), null, '\t'))

	thoth.on('group-participants-update', async (anu) => {
		const mdata = await thoth.groupMetadata(anu.jid)
		if(antifake.includes(anu.jid)) {
			if (anu.action == 'add'){
				num = anu.participants[0]
				if(!num.split('@')[0].startsWith(55)) {
					thoth.sendMessage(mdata.id, 'Corre, o travador chegou', MessageType.text)
					setTimeout(async function () {
						thoth.groupRemove(mdata.id, [num])
					}, 1000)
				}
			}
		}
		if (!welkom.includes(anu.jid)) return
		try {
			mem = anu.participants[0]
            try {
                var pp_user = await thoth.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
            } catch (e) {
                var pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add') {
            	num = anu.participants[0]
                anu_img = await getBuffer(`http://api.lolhuman.xyz/api/welcomeimage?apikey=${apilol}&img=${pp_user}&text=May%20Bot`)
                group_info = await thoth.groupMetadata(anu.jid)
                welkam = `Bem Vindo @${num.split('@')[0]}`
                thoth.sendMessage(anu.jid, anu_img, MessageType.image, { caption: welkam })
            } else if (anu.action == 'remove') {
            	num = anu.participants[0]
                anu_img = await getBuffer(`http://api.lolhuman.xyz/api/welcomeimage?apikey=${apilol}&img=${pp_user}&text=May%20Bot`)
                group_info = await thoth.groupMetadata(anu.jid)
                out = `1 minuto de silêncio @${num.split('@')[0]}`
                thoth.sendMessage(anu.jid, anu_img, MessageType.image, { caption: out })
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	thoth.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	thoth.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = setting.apiKey 
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
			const jam = moment.tz('America/Sao_Paulo').format('HH:mm')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
            var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: 'Irei fazer, mas se você esperar um pouquinho a gente volta a conversar.',
				success: '✔️ Sucesso ✔️',			
				error: {
					stick: 'Vish mana, não consegui fazer.',
					Iv: '❌ Link inválido ❌'
				},
				only: {
					group: '❌ Este comando só pode ser usado em grupos! ❌',
					ownerG: '❌ Este comando só pode ser usado pelo dono do grupo! ❌',
					ownerB: 'Que isso mana ? você não é o Thoth',				
					admin: '❌ Você não é adm! ❌',
					Badmin: '❌ Preciso ser adm! ❌'
				}
			}

			const botNumber = thoth.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`]
			const deus = [`${setting.deus}@s.whatsapp.net`]
			const isGroup = from.endsWith('@g.us')
			const tescuk = ["0@s.whatsapp.net"]
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await thoth.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isKey = isGroup ? key.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isAntiFake = isGroup ? antifake.includes(from) : false
			const isAntiPorn = isGroup ? antiporn.includes(from) : false
			const isBanned = ban.includes(sender)
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isDeus = deus.includes(sender)
			pushname = thoth.contacts[sender] != undefined ? thoth.contacts[sender].vname || thoth.contacts[sender].notify : undefined
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				thoth.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				thoth.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? thoth.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : thoth.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
            const costum = (pesan, tipe, target, target2) => {
		     	thoth.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}

			if (messagesC.includes("iniciar")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/purg.mp3');
				thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}
		    
			if (messagesC.includes("#kick")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/ban.mp3');
               thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}			

			if (messagesC.includes("bodia")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/bd.mp3');
				thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}
		    
			if (messagesC.includes("bonoite")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/bn.mp3');
               thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}			
			
			if (messagesC.includes("on.")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/on.mp3');
               thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}		
			
			if (messagesC.includes("May")){
				thoth.updatePresence(from, Presence.composing)
				reply("Fala, krl.")
		}

			if (messagesC.includes("kiss")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/kiss.mp3');
               thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}
			
			if (messagesC.includes("roleta")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/roleta.mp4');
               thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}
	
			 //function antilink 
				if (messagesC.includes("://chat.whatsapp.com/")){
					if (!isGroup) return
					if (isGroupAdmins) return reply('Sua sorte é que você é adm')
					thoth.updatePresence(from, Presence.composing)
					if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
					var kic = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Poxa ${sender.split("@")[0]} não pode link`)
						thoth.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}
			
			//função antiporn
			if ((isAntiPorn && isBotGroupAdmins)) {
				if(!mek.message) return
				if (type === MessageType.image) {
					savedFilename = await thoth.downloadAndSaveMediaMessage (mek)
					imgbbUploader(apikeyimgbb, savedFilename).then(async function(response) {
						anu = await fetchJson(`sua api`)

						if(anu[0].className === 'Porn' && isGroupAdmins)  {
							await thoth.sendMessage(from,adminmsgporn, MessageType.text, {quoted: mek})
							return
							
						} else if(anu[0].className === 'Porn' && !isGroupAdmins) {
							await thoth.sendMessage(from,banmsgporn, MessageType.text, {quoted: mek})
							setTimeout(async function () {
								thoth.groupRemove(from, [sender])
							}, 2000)
							return
						}
						
						if(anu[0].className === 'Hentai' && isGroupAdmins) {
							await thoth.sendMessage(from,adminmsgporn, MessageType.text, {quoted: mek})
							return

						}  else if(anu[0].className === 'Hentai' && !isGroupAdmins) {
							await thoth.sendMessage(from,banmsgporn, MessageType.text, {quoted: mek})
							setTimeout(async function () {
								thoth.groupRemove(from, [sender])
							}, 2000)
							return
						}
						
						if(anu[0].className === 'Sexy') return thoth.sendMessage(from,'Cuidado com oq manda em amigo, to com antiporn ativado', MessageType.text, {quoted: mek})
						
						fs.unlinkSync(savedFilename)

					}).catch((error) => console.error(error));
				}
			}
			
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = thoth.contacts[from] != undefined ? thoth.contacts[from].vname || thoth.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
			
			//thoth
			exports.apikeyimgbb = apikeyimgbb
			exports.banmsgporn = banmsgporn
			
			function addMetadata(packname, author) {	
				if (!packname) packname = 'WABot'; if (!author) author = 'MayBot';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	

			}
			switch(command) {
				case 'antifake':
					try {
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isAntiFake) return reply('Ja esta ativo')
						antifake.push(from)
						fs.writeFileSync('./src/antifake.json', JSON.stringify(antifake))
						reply('Ativou com sucesso o recurso de antifake neste grupo✔️')
					} else if (Number(args[0]) === 0) {
						antifake.splice(from, 1)
						fs.writeFileSync('./src/antifake.json', JSON.stringify(antifake))
						reply('Desativou com sucesso o recurso de antifake neste grupo✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					} catch {
						reply('Deu erro, tente novamente :/')
					}
								 break
case 'menu':			 
case 'comandos':
menuimg = fs.readFileSync('./assets/menuimg.jpg')
thoth.sendMessage(from, menuimg, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝐌𝐀𝐘 𝐁𝐎𝐓", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./assets/menuimg.jpg')} } }, caption: cv1.wpp(pushname)})
lima = fs.readFileSync('./assets/menuv.mp3');
thoth.sendMessage(from, lima, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'lista':
case 'help':			 
menuimg = fs.readFileSync('./assets/help.jpg')
thoth.sendMessage(from, menuimg, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝐌𝐀𝐘 𝐁𝐎𝐓", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./assets/menuimg.jpg')} } }, caption: cv1.wpp(pushname)})
lima = fs.readFileSync('./assets/menuv.mp3');
thoth.sendMessage(from, lima, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'idioma':
if (!isGroup) return reply(mess.only.group)
menuimg = fs.readFileSync('./assets/menuimg.jpg')
thoth.sendMessage(from, menuimg, image, {quoted: mek, caption: idioma(prefix), text})
lima = fs.readFileSync('./assets/id.mp3');
thoth.sendMessage(from, lima, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'music':
if (!isGroup) return reply(mess.only.group)
thoth.sendMessage(from, music(prefix, sender), text, { quoted: mek })
break
				case 'produtos':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, produtos(prefix, sender), text, { quoted: mek })
						break
				case 'adms':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, adms(prefix, sender), text, { quoted: mek })
						break
				case 'fga':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, fga(prefix, sender), text, { quoted: mek })
						break
				case 'maker':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, maker(prefix, sender), text, { quoted: mek })
						break
				case 'entretenimento':
				    if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, entretenimento(prefix, sender), text, { quoted: mek })
						break
				case 'about':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, about(prefix, sender), text, { quoted: mek })
						break
				case 'tipografia':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, tipo(prefix, sender), text, { quoted: mek })
						break
				case 'consultas':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, consultas(prefix, sender), text, { quoted: mek })
						break
				case 'credits':
				    if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, credits(prefix, sender), text, { quoted: mek })
						break
				case 'flix':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, flix(prefix, sender), text, { quoted: mek })
						break
				case 'info':
					me = thoth.user
					uptime = process.uptime()
					teks = `*Nome* : ${me.name}\n*Número* : @${me.jid.split('@')[0]}\n*Prefixo* : ${prefix}\n*Total de block* : ${blocked.length}\n*Tempo on* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					thoth.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'blocklist':
					teks = 'Pessoas com block :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					thoth.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 's':
				case 'sticker':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await thoth.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('MayBOT', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									thoth.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
								/*thoth.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await thoth.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Falha no momento da conversão ${tipe} para stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('MayBOT', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									thoth.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
								/*thoth.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await thoth.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = '3b8594f4cb11895f4084291bc655e510'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Falha, ocorreu um erro, tente novamente mais tarde.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ranw} -o ${ranw}`, async (error) => {
									if (error) return reply(mess.error.stick)
									thoth.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
									fs.unlinkSync(ranw)
								})
								//thoth.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await thoth.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								thoth.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`Coloque na legenda da ft ${prefix}sticker ou tente novamente`)
					}
					break
				case 's2':
				case 'fga2':
				case 'sticker2':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        filePath = await thoth.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.png')
                        file_name2 = getRandom('.webp')
                        request({
                            url: `https://api.lolhuman.xyz/api/removebg?apikey=${apilol}`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ffmpeg(`./${file_name}`)
                                .input(file_name)
                                .on('error', function(err) {
                                    console.log(err)
                                    fs.unlinkSync(file_name)
                                })
                                .on('end', function() {
                                    thoth.sendMessage(from, fs.readFileSync(file_name2), sticker, { quoted: mek })
                                    fs.unlinkSync(file_name2)
                                })
                                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                                .toFormat('webp')
                                .save(file_name2)
                        });
                    } else {
                        reply(`Marque a foto ou tente novamente`)
                    }
                    break
                case 'yt':
					if (args.length < 1) return reply('Preciso do link!')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `Estou baixando seu vídeo`
					thumb = await getBuffer(anu.thumb)
					thoth.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					thoth.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}`, quoted: mek})
					break
			    case 'ocr':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        var filePath = await thoth.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        var form = new FormData();
                        var stats = fs.statSync(filePath);
                        var fileSizeInBytes = stats.size;
                        var fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        var options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`https://api.lolhuman.xyz/api/ocr?apikey=${apilol}`, {...options })
                        fs.unlinkSync(filePath)
                        get_result = get_result.result
                        reply(`Resultado : ${get_result}`)
                    } else {
                        reply(`Marque a foto ou tente novamente`)
                    }
                    break
case 'add':
try {
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('Você quer adicionar um gênio?')
if (args[0].startsWith('08')) return reply('Use o código do país, mas')
try {
num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
thoth.groupAdd(from, [num])
} catch (e) {
console.log('Error :', e)
reply('Falha ao adicionar destino, talvez porque é privado')
}
} catch {
reply(msgerr)
}
break
case 'diario':
if (args.length < 1) return reply(ind.wrongf())
ct = body.slice(7)
ct = await getBuffer(`https://api.zeks.xyz/api/nulis?text=${ct}&apikey=apivinz`)
thoth.sendMessage(from, ct, image, {caption: 'May Bot🐒', quoted: mek})
break
case 'freefire':
if (args.length == 0) return reply(`Exemplo: ${prefix + command} Thoth`)
ini_txt = args.join(" ")
getBuffer(`https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${apilol}&text=${ini_txt}`).then((gambar) => {
thoth.sendMessage(from, gambar, image, { quoted: mek })
})
break
case 'pinterest2':
if (args.length == 0) return reply(`Exemplo: ${prefix + command} loli kawaii`)
query = args.join(" ")
ini_url = await fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=${apilol}&query=${query}`)
ini_url = ini_url.result
ini_buffer = await getBuffer(ini_url)
await thoth.sendMessage(from, ini_buffer, image, { quoted: mek })
break
case 'roletahard':
if(!isGroup) return reply(mess.only.group)
if(!isBotGroupAdmins) return reply(mess.only.Badmin)
if(!isGroupAdmins) return reply(mess.only.admin)
reply('Girando o tambor...🔫\n*Se preparem para as consequências 😈*')
setTimeout(async function() {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
mem = groupMembers[r].jid
if(mem.includes(ownerNumber)) {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
mem = groupMembers[r].jid
}
await thoth.sendMessage(from, `💥O @${mem.split('@')[0]} Não teve sorte💥\n*😈 Agora se prepare para as consequências 😈*`, text, {contextInfo: {"mentionedJid": [mem]}})
await thoth.groupRemove(from, [mem])
await thoth.sendMessage(from, `👻O @${mem.split('@')[0]} teve sua vida ceifada👻`)
}, 10000)
break
case 'antiporn':
try {
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('Hmmmm')
if (Number(args[0]) === 1) {
if (isAntiPorn) return reply('Ja esta ativo')
antiporn.push(from)
fs.writeFileSync('./src/antiporn.json', JSON.stringify(antiporn))
reply('Ativou com sucesso o recurso de antipornô neste grupo✔️')
} else if (Number(args[0]) === 0) {
antiporn.splice(from, 1)
fs.writeFileSync('./src/antiporn.json', JSON.stringify(antiporn))
reply('Desativou com sucesso o recurso de antipornô neste grupo✔️')
} else {
reply('1 para ativar, 0 para desativar')
}
} catch {
reply(msgerr)
}
break
case 'tts':
if (!isGroup) return reply(mess.only.group)
if (args.length < 1) return thoth.sendMessage(from, 'E o id?', text, {quoted: mek})
const gtts = require('./lib/gtts')(args[0])
if (args.length < 2) return thoth.sendMessage(from, 'E o texto?', text, {quoted: mek})
dtt = body.slice(7)
ranm = getRandom('.mp3')
dtt.length > 600
? reply('Texto muito grande')
: gtts.save(ranm, dtt, function() {
thoth.sendMessage(from, fs.readFileSync(ranm), audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
fs.unlinkSync(ranm)
})
break
/*case 'antilink':

if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('digite 1 para ativar ')
if (Number(args[0]) === 1) {
if (isAntiLink) return reply('o antilink está ativo')
antilink.push(from)
fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
reply('Antilink ativado com sucesso')
thoth.sendMessage(from,`Atenção: quem mandar link de grupo vai levar ban`, text)
} else if (Number(args[0]) === 0) {
if (!isantilink) return reply('Antilink desativado com sucesso')
var ini = anti.thothOf(from)
antilink.splice(ini, 1)
fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
reply('Antilink desativado com sucesso')
} else {
reply('1 para ativar, 0 para desativar ')
}
break*/
case 'mp3':
thoth.updatePresence(from, Presence.composing) 
if (!isQuotedVideo) return reply('Marque o video pfv')
reply(mess.wait)
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
media = await thoth.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.mp4')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return reply('❌ Falha ao converter vídeo para mp3 ❌')
buffer = fs.readFileSync(ran)
thoth.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: mek})
fs.unlinkSync(ran)
})
break
case 'setprefix':
if (args.length < 1) return
if (!isOwner) return reply(mess.only.ownerB)
prefix = args[0]
setting.prefix = prefix
fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
reply(`Prefixo mudado para : ${prefix}`)
break
case 'deus':
if (!isGroup) return reply(mess.only.group)
if (!isDeus) return reply(Epa, sai)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Marque a pessoa!')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Removendo:\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(teks, mentioned, true)
thoth.groupRemove(from, mentioned)
} else {
mentions(`Você foi expulso: @${mentioned[0].split('@')[0]}`, mentioned, true)
thoth.groupRemove(from, mentioned)
}
break
case 'membros':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
members_id = []
teks = (args.length > 1) ? body.slice(8).trim() : ''
teks += '\n\n'
for (let mem of groupMembers) {
teks += `*Chamando todos os membros* @${mem.jid.split('@')[0]}\n`
members_id.push(mem.jid)
}
mentions(teks, members_id, true)
break
case 'nsfw':  

if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (args.length < 1) return reply('Hmmmm')
if ((args[0]) === '1') {
if (isNsfw) return reply('O modo NSFW está ativo')
nsfw.push(from)
fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
reply(`\`\`\`✓Modo nsfw ativado com sucesso\`\`\` *${groupMetadata.subject}*`)
} else if ((args[0]) === '0') {
if (!isNsfw) return reply('Mode Nsfw Off')
nsfw.splice(from, 1)
fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
reply(`\`\`\`✓Modo nsfw desativado com sucesso\`\`\` *${groupMetadata.subject}*`)
} else {
reply('1 para ligar, 0 para desligar')
}
break
case 'xhamster':
if (!isGroup) return reply(mess.only.group)
if (!isNsfw) return reply('Ligue o nsfw')
if (args.length == 0) return reply(`*Exemplo : ${prefix + command} Japanese*`)
query = args.join(" ")
get_result = await fetchJson(`http://lolhuman.herokuapp.com/api/xhamstersearch?apikey=${apilol}&query=${query}`)
get_result = get_result.result
ini_txt = ""
for (var x of get_result) {
ini_txt += `Título : ${x.title}\n`
ini_txt += `Views : ${x.views}\n`
ini_txt += `Duração : ${x.duration}\n`
ini_txt += `Link : ${x.link}\n\n`
}
reply(ini_txt)
break
case 'stickerwa':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (args.length == 0) return reply(`*Exemplo : ${prefix + command} monkey*`)
query = args.join(" ")
get_result = await fetchJson(`http://lolhuman.herokuapp.com/api/stickerwa?apikey=${apilol}&query=${query}`)
get_result = get_result.result[0].stickers
for (var x of get_result) {
ini_buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/convert/towebp?apikey=${apilol}&img=${x}`)
thoth.sendMessage(from, ini_buffer, sticker)
}
break
case 'dado':
if (!isGroup) return reply(mess.only.group)
ranp = getRandom('.png')
rano = getRandom('.webp')
random = `${Math.floor(Math.random() * 6)}`
hasil = 'https://www.random.org/dice/dice' + random + '.png'
exec(`wget ${hasil} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
fs.unlinkSync(ranp)
if (err) return reply(mess.error.stick)
buffer = fs.readFileSync(rano)
thoth.sendMessage(from, buffer, sticker, {quoted: mek})
fs.unlinkSync(rano)
})
break
		case 'semoji':
			        if (!isGroup) return reply(mess.only.group)
                    if (args.length == 0) return reply(`*Exemplo: ${prefix + command} 😭*`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/smoji/${emoji}?apikey=${apilol}`)
                    thoth.sendMessage(from, ini_buffer, sticker, { quoted: mek})
                    break
		case 'hentai':
			        if (!isGroup) return reply(mess.only.group)
			        if (!isNsfw) return reply('Ligue o nsfw')
                    ranp = getRandom('.gif')
                    rano = getRandom('.webp')
                    ini_buffer = `http://lolhuman.herokuapp.com/api/random2/${command}?apikey=${apilol}`
                    exec(`wget ${ini_buffer} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                        fs.unlinkSync(ranp)
                        buff = fs.readFileSync(rano)
                        thoth.sendMessage(from, buff, sticker, { quoted: mek})
                        fs.unlinkSync(rano)
                    })
                    break
                                case 'tagall2':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
					break
                                case 'tagall3':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					thoth.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
					break
				case 'clearall':
					if (!isOwner) return reply('Você não é o Thoth')
					anu = await thoth.chats.all()
					thoth.setMaxListeners(25)
					for (let _ of anu) {
						thoth.deleteChat(_.jid)
					}
					reply('Chats limpos')
					break
				case 'bc':
					if (!isOwner) return reply('Você não é o Thoth')
					if (args.length < 1) return reply('.......')
					anu = await thoth.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await thoth.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							thoth.sendMessage(_.jid, buff, image, {caption: `[Thoth falando]\n\n${body.slice(4)}`})
						}
						reply('Feito')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ATENÇÃO]\n\n${body.slice(4)}`)
						}
						reply('Feito')
					}
					break
					case 'bc2':
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					anu = await thoth.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await thoth.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							thoth.sendMessage(_.jid, buff, image, {caption: `[Thoth falando]\n\n${body.slice(4)}`})
						}
						reply('Feito')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `「THOTH FALANDO」\n\n${body.slice(4)}`)
						}
						reply('Feito')
					}
					break
case 'promover':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
teks = 'Membro promovido\n'
for (let _ of mentioned) {
teks += `@${_.split('@')[0]}\n`
}
mentions(from, mentioned, true)
thoth.groupRemove(from, mentioned)
} else {
mentions(`Sucesso: @${mentioned[0].split('@')[0]} Promovido para adm!`, mentioned, true)
thoth.groupMakeAdmin(from, mentioned)
}
break
case 'adtip':
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isQuotedVideo) return reply('Marque um vídeo')
svst = body.slice(6)
if (!svst) return reply('Nome do vídeo?')
boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
delb = await thoth.downloadMediaMessage(boij)
fs.writeFileSync(`./banco/tipo/${svst}.mp4`, delb)
thoth.sendMessage(from, `Tipografia salva!`, MessageType.text, { quoted: mek })
break
case 'lyric':
						  
fs.readdir('./banco/tipo/', async (err, files) => {
let imagens = files.filter(f => f.split('.').pop() == 'mp4')
let imagem = imagens[Math.floor(Math.random() * imagens.length)]
						
dua = await fs.readFileSync(`./banco/tipo/${imagem}`)
thoth.sendMessage(from, dua, video, {quoted: mek, caption: 'DJ May'})
await limitAdd(sender)
})
break
case 'livro':
  
fs.readdir('./livros/', async (err, files) => {
let imagens = files.filter(f => f.split('.').pop() == 'pdf')
let imagem = imagens[Math.floor(Math.random() * imagens.length)]
						
dua = await fs.readFileSync(`./livros/${imagem}`)
thoth.sendMessage(from, dua, document, {quoted: mek})
await limitAdd(sender)
})
break
case 'macaco':
  
fs.readdir('./banco/macaco/', async (err, files) => {
let imagens = files.filter(f => f.split('.').pop() == 'webp')
let imagem = imagens[Math.floor(Math.random() * imagens.length)]
						
dua = await fs.readFileSync(`./banco/macaco/${imagem}`)
thoth.sendMessage(from, dua, sticker, {quoted: mek})
await limitAdd(sender)
})
break
case 'random':
						  
fs.readdir('./banco/random/', async (err, files) => {
let imagens = files.filter(f => f.split('.').pop() == 'webp')
let imagem = imagens[Math.floor(Math.random() * imagens.length)]
						
dua = await fs.readFileSync(`./banco/random/${imagem}`)
thoth.sendMessage(from, dua, sticker, {quoted: mek})
await limitAdd(sender)
})
break
case 'notif':
thoth.updatePresence(from, Presence.composing)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
teks = body.slice(6)
group = await thoth.groupMetadata(from);
member = group['participants']
jids = [];
member.map(async adm => {
jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
})
options = {
text: teks,
contextInfo: { mentionedJid: jids },
quoted: mek
}
await thoth.sendMessage(from, options, text)
break
case 'pedra':
let pedra = Math.floor(Math.random() * 3) + 1
if(pedra == '1'){
thoth.sendMessage(from, `Papel, ganhei.`, text, {quoted: mek})
}
else if (pedra == '2') {
thoth.sendMessage(from, `Tesoura;-; af, perdi`, text, {quoted: mek})
}
else{
thoth.sendMessage(from, `Pedra tbm, oporra`, text, {quoted: mek})
}                   
						
						
break
case 'papel':
let papel = Math.floor(Math.random() * 3) + 1
if(papel == '1'){
thoth.sendMessage(from, `Tesoura, ganhei.`, text, {quoted: mek})
}
else if (papel == '2') {
thoth.sendMessage(from, `Pedra;-; af, perdi`, text, {quoted: mek})
}
else{
thoth.sendMessage(from, `Papel tbm, oporra`, text, {quoted: mek})
}                   
						
						
break
case 'tesoura':
let tesoura = Math.floor(Math.random() * 3) + 1
if(tesoura == '1'){
thoth.sendMessage(from, `Pedra, ganhei.`, text, {quoted: mek})
}
else if (tesoura == '2') {
thoth.sendMessage(from, `Papel;-; af, perdi`, text, {quoted: mek})
}
else{
thoth.sendMessage(from, `Tesoura tbm, oporra`, text, {quoted: mek})
}                   
						
						
break
case 'cassino':
if (!isGroup) return reply(mess.only.group)
let cassinao = ['🍉', '🍎','🍇']
let resposta1 = cassinao[Math.floor(Math.random() * cassinao.length)]
let resposta2 = cassinao[Math.floor(Math.random() * cassinao.length)]
let resposta3 = cassinao[Math.floor(Math.random() * cassinao.length)]
if(resposta1==resposta2&&resposta2==resposta3){
thoth.sendMessage(from, `*JOGO DO CASSINO*:\n\n(((((((((((${resposta1}${resposta2}${resposta3})))))))))))))\n\n*Parabéns, _${pushname}_ VOCÊ GANHOU*!!!!!`, text, {quoted: mek})
}
else if(resposta1==resposta2||resposta2==resposta3){
thoth.sendMessage(from, `*JOGO DO CASSINO*:\n\n(((((((((((${resposta1}${resposta2}${resposta3})))))))))))))\n\n*Puts, passou perto, _${pushname}_ Quase foi...*`, text, {quoted: mek})
}
else{
thoth.sendMessage(from, `*JOGO DO CASSINO*:\n\n(((((((((((${resposta1}${resposta2}${resposta3})))))))))))))\n\n*kkkkk se fodeu, _${pushname}_ Tente na próxima...*`, text, {quoted: mek})
}
break                
case 'addsticker':
if (!isOwner) return reply(mess.only.ownerB)
if (!isQuotedSticker) return reply('Marca um sticker')
svst = body.slice(12)
if (!svst) return reply('Nome do sticker?')
boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
delb = await thoth.downloadMediaMessage(boij)
fs.writeFileSync(`./banco/macaco/${svst}.webp`, delb)
thoth.sendMessage(from, `Sticker salvo!`, MessageType.text, { quoted: mek })
break
case 'pinterest':
if (!isGroup) return reply(mess.only.group)
tels = body.slice(11)
thoth.updatePresence(from, Presence.composing) 
data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {method: 'get'})
reply(mess.wait)
n = JSON.parse(JSON.stringify(data));
nimek =  n[Math.floor(Math.random() * n.length)];
pok = await getBuffer(nimek)
thoth.sendMessage(from, pok, image, { quoted: mek, caption: `*May 📌*\n\*Resultado da pesquisa* : *${tels}*`})
await limitAdd(sender)
break
                 case 'trigger':
					
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
					ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
					reply(mess.wait)
					owgi = await  thoth.downloadAndSaveMediaMessage(ger)
					anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
					teks = `${anu.display_url}`
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
					exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
					fs.unlinkSync(ranp)
					if (err) return reply(mess.error.stick)
					exec(`webpmux -set exif ${addMetadata('May', 'Bot')} ${rano} -o ${rano}`, async (error) => {
					if (error) return reply(mess.error.stick)
					thoth.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
					fs.unlinkSync(rano)
					})
					})
					} else {
					reply('1 foto!')
					}
					await limitAdd(sender) 
					break 
				case 'wasted':
					
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
					ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
					reply(mess.wait)
					owgi = await  thoth.downloadAndSaveMediaMessage(ger)
					anu = await imgbb("3b8594f4cb11895f4084291bc655e510", owgi)
					teks = `${anu.display_url}`
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu2 = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`
					exec(`wget ${anu2} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
					fs.unlinkSync(ranp)
					if (err) return reply(mess.error.stick)
					exec(`webpmux -set exif ${addMetadata('May', 'Bot')} ${rano} -o ${rano}`, async (error) => {
					if (error) return reply(mess.error.stick)
					thoth.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
					fs.unlinkSync(rano)
					})
					})
					} else {
					reply('1 foto!')
					}
					await limitAdd(sender) 
				break
					case 'rankgay':
						try{
						if(!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
						d = []
						teks = '🏳️‍🌈 Rank dos mais gays\n'
						for(i = 0; i < 5; i++) {
						r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
						teks += `🏳️‍🌈❧ @${groupMembers[r].jid.split('@')[0]}\n`
						d.push(groupMembers[r].jid)
						}
						mentions(teks, d, true)
						} catch (e) {
						console.log(e)
						reply('Deu erro, tente novamente :/')
						}
						break
					case 'rankcaco':
						try{
						if(!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
						d = []
						teks = '🐒 Rank dos camacos\n'
						for(i = 0; i < 5; i++) {
						r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
						teks += `️‍🐒❧ @${groupMembers[r].jid.split('@')[0]}\n`
						d.push(groupMembers[r].jid)
						}
						mentions(teks, d, true)
						} catch (e) {
						console.log(e)
						reply('Deu erro, tente novamente :/')
						}
						break
					case 'drip':
						try{
						if(!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
						d = []
						teks = '🥶 O verdadeiro molho 🥶\n'
						for(i = 0; i < 5; i++) {
						r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
						teks += `️‍🥶❧ @${groupMembers[r].jid.split('@')[0]}\n`
						d.push(groupMembers[r].jid)
						}
						mentions(teks, d, true)
						} catch (e) {
						console.log(e)
						reply('Deu erro, tente novamente :/')
						}
						break
					case 'gostosa':
						try{
						if(!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
						d = []
						teks = '🚨GOSTOSA DETECTADA🚨\n'
						for(i = 0; i < 1; i++) {
						r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
						teks += `❧ @${groupMembers[r].jid.split('@')[0]}\n`
						d.push(groupMembers[r].jid)
						}
						mentions(teks, d, true)
						} catch (e) {
						console.log(e)
						reply('Deu erro, tente novamente :/')
						}
						break
					case 'game':
						try{
						if(!isGroup) return reply(mess.only.group)
						if (!isGroupAdmins) return reply(mess.only.admin)
						d = []
						teks = '🚨RIVAIS🚨\n'
						for(i = 0; i < 2; i++) {
						r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
						teks += `❧ @${groupMembers[r].jid.split('@')[0]}\n`
						d.push(groupMembers[r].jid)
						}
						mentions(teks, d, true)
						} catch (e) {
						console.log(e)
						reply('Deu erro, tente novamente :/')
						}
						break
				case 'gay':		
	            	if (args.length < 1) return reply('marque seus amigos!')
					rate = body.slice(1)
					const ti =['4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
					const kl = ti[Math.floor(Math.random() * ti.length)]
					thoth.sendMessage(from, 'O quão gay você é: *'+rate+'*\n\nSua porcentagem gay : '+ kl+'%', text, { quoted: mek })
					break
             case 'addrandom':
				if (!isOwner) return reply(mess.only.ownerB)
			    if (!isQuotedSticker) return reply('Marca um sticker')
				svst = body.slice(11)
				if (!svst) return reply('Nome do sticker?')
				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await thoth.downloadMediaMessage(boij)
				fs.writeFileSync(`./banco/random/${svst}.webp`, delb)
				thoth.sendMessage(from, `Sticker salvo!`, MessageType.text, { quoted: mek })
				break
					
case 'cnpj':

lxrd = body.slice(6)
data = await fetchJson(`sua api`, {method: 'get'})
if (data.error) return reply(data.error)
kinycnpj = `*🔍CONSULTA REALIZADA🔍* \n\n ➸ *ATIVIDADE PRINCIPAL:* ${data.atividade_principal[0].text} \n\n ➸ *DATA SITUAÇÃO:* ${data.data_situacao}\n\n ➸ *TIPO:* ${data.tipo} \n\n ➸ *NOME:* ${data.nome} \n\n ➸ *UF:* ${data.uf} \n\n ➸ *TELEFONE:* ${data.telefone}\n\n ➸ *SITUAÇÃO:* ${data.situacao} \n\n ➸ *BAIRRO:* ${data.bairro} \n\n ➸ *RUA:* ${data.logradouro} \n\n ➸ *NÚMERO :* ${data.numero} \n\n ➸ *CEP :* ${data.cep} \n\n ➸ *MUNICÍPIO:* ${data.municipio} \n\n ➸ *PORTE:* ${data.porte}\n\n ➸ *ABERTURA:* ${data.abertura}\n\n ➸ *NATUREZA JURÍDICA:* ${data.natureza_juridica} \n\n ➸ *FANTASIA:* ${data.fantasia}\n\n ➸ *CNPJ:* ${data.cnpj}\n\n ➸ *ÚLTIMA ATUALIZAÇÃO:* ${data.ultima_atualizacao}\n\n ➸ *STATUS:* ${data.status}\n\n ➸ *COMPLEMENTO:* ${data.complemento}\n\n ➸ *EMAIL:* ${data.email}\n\n MAY BOT 📌`
thoth.sendMessage(from, kinycnpj, text, {quoted: mek})
await limitAdd(sender)
break
					
case 'ip':

lxrd = body.slice(4)
 data = await fetchJson(`sua api`, {method: 'get'})
if (data.error) return reply(data.error)
kinycnpj = `*🔍CONSULTA REALIZADA🔍* \n\n ➸ *IP:* ${data.ip} \n\n ➸ *CIDADE:* ${data.city}\n\n ➸ *ESTADO:* ${data.region_name} \n\n ➸ *PAÍS:* ${data.country_name} \n\n ➸ *TIPO:* ${data.type} \n\n MAY BOT 📌`
thoth.sendMessage(from, kinycnpj, text, {quoted: mek})
 await limitAdd(sender)
break
					
case 'cpf':

boxx = await fetchJson(`sua api`)
box =  `*🔍CPF GERADO🔍* \n\n➸ CPF: ${boxx.data.number}\n➸ FORMATO CPF: ${boxx.data.number_formatted}\n➸ STATUS: ${boxx.data.message} \n\n MAY BOT 📌`
thoth.sendMessage(from, box, text, {quoted: mek})
break
					
case 'amongus':

if (args.length == 0) return reply(`Uso: ${prefix + command} nome\nExemplo: ${prefix + command} Thoth`)
buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/amongus?apikey=${apilol}&text=${body.slice(9)}`)
thoth.sendMessage(from, buffer, sticker, { quoted: mek})
break
					
case 'gta':

if (!isGroup) return reply(mess.only.group)
daddy = `${body.slice(4)}`
texto1 = daddy.split("/")[0];
texto2 = daddy.split("/")[1];
reply('Macaco, aguarde...')
buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/gtapassed?apikey=${apilol}&text=&text1=${texto1}&text2=${texto2}`)
thoth.sendMessage(from, buffer, image, {quoted: mek})
break
	
case 'tkmusic':
if (args.length == 0) return reply(`Exemplo: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/h`)
ini_link = args[0]
get_audio = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=${apilol}&url=${ini_link}`)
await thoth.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, quoted: mek })
break

case '8bits':

if (!isGroup) return reply(mess.only.group)
daddy = `${body.slice(6)}`
texto1 = daddy.split("/")[0];
texto2 = daddy.split("/")[1];
reply('Macaco, aguarde...')
buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/photooxy2/arcade8bit?apikey=${apilol}&text1=${texto1}&text2=${texto2}`)
thoth.sendMessage(from, buffer, image, {quoted: mek})
break
					
case 'trump':
if (!isGroup) return reply(mess.only.group)
daddy = `${body.slice(6)}`
texto1 = daddy.split("/")[0];
reply('Macaco, aguarde...')
buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/tweettrump?apikey=${apilol}&text=${texto1}`)
thoth.sendMessage(from, buffer, image, {quoted: mek})
break

case 'hacker':
if (!isGroup) return reply(mess.only.group)
daddy = `${body.slice(7)}`
texto1 = daddy.split("/")[0];
reply('Macaco, aguarde...')
buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/ephoto1/anonymhacker?apikey=${apilol}&text=${texto1}`)
thoth.sendMessage(from, buffer, image, {quoted: mek})
break													

case 'cobrar':
					
reply('Pode deixar...') 
fs.readdir('./banco/gif/loli/', async (err, files) => {
let imagens = files.filter(f => f.split('.').pop() == 'mp4')
let imagem = imagens[Math.floor(Math.random() * imagens.length)]

dua = fs.readFileSync(`./banco/gif/loli/${imagem}`)
var mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if(!mentioned||mentioned.length < 1||mentioned.length > 1) return thoth.sendMessage(from, 'Você precisa marcar alguém para esse comando', text, {quoted: mek})
thoth.sendMessage(from, dua, video, {mimetype: Mimetype.gif, caption: `${pushname} ESTÁ TE AMEAÇANDO "o cú ou a vida?" ${body.split(' ').slice(1).join(' ')}`,quoted: mek, contextInfo: {"mentionedJid": mentioned}})                   
})
break
					
case 'kill':
					
reply('EITA😳...') 
fs.readdir('./banco/gif/kill/', async (err, files) => {
let imagens = files.filter(f => f.split('.').pop() == 'mp4')
let imagem = imagens[Math.floor(Math.random() * imagens.length)]

dua = fs.readFileSync(`./banco/gif/kill/${imagem}`)
var mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if(!mentioned||mentioned.length < 1||mentioned.length > 1) return thoth.sendMessage(from, 'Você precisa marcar alguém para esse comando', text, {quoted: mek})
thoth.sendMessage(from, dua, video, {mimetype: Mimetype.gif, caption: `${pushname} DEU UM TIRO NO(A) ${body.split(' ').slice(1).join(' ')}`,quoted: mek, contextInfo: {"mentionedJid": mentioned}})                   
})
break					

case 'tapa':
					
reply('EITA😳...') 
fs.readdir('./banco/gif/tapa/', async (err, files) => {
let imagens = files.filter(f => f.split('.').pop() == 'mp4')
let imagem = imagens[Math.floor(Math.random() * imagens.length)]

dua = fs.readFileSync(`./banco/gif/tapa/${imagem}`)
var mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if(!mentioned||mentioned.length < 1||mentioned.length > 1) return thoth.sendMessage(from, 'Você precisa marcar alguém para esse comando', text, {quoted: mek})
thoth.sendMessage(from, dua, video, {mimetype: Mimetype.gif, caption: `KKKKK ${pushname} DEU MÓ TAPÃO NO(A) ${body.split(' ').slice(1).join(' ')}`,quoted: mek, contextInfo: {"mentionedJid": mentioned}})                   
})
break					
					
case 'hp':				
if (!isGroup) return reply(mess.only.group)
daddy = `${body.slice(3)}`
texto1 = daddy.split("/")[0];
reply('Macaco, aguarde...')
buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/photooxy1/harrypotter?apikey=${apilol}&text=${texto1}`)
thoth.sendMessage(from, buffer, image, {quoted: mek})
break
					
case 'conquista':				
if (body.length > 25) return reply('O LIMITE É 15 CARACTERES')
if(body.length<11) return thoth.sendMessage(from, 'Onde está o texto?\n\n*Exemplo: ${prefix + command} Thoth*', text, {quoted: mek})
thoth.sendMessage(from, ('Estou fazendo Aguarde...'), text, {quoted: mek})
buffer = await getBuffer(`https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement+get%21&t=${body.slice(11)}`)
thoth.sendMessage(from, buffer, image, {quoted:mek})
break				
					
case 'slow':			
low = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
slo = await thoth.downloadAndSaveMediaMessage(low)
ran = getRandom('.mp3')
exec(`ffmpeg -i ${slo} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(slo)
if (err) return reply('Error!')
hah = fs.readFileSync(ran)
thoth.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
fs.unlinkSync(ran)
})
break	

case 'bass': 					
ass = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo

bas = await thoth.downloadAndSaveMediaMessage(ass)
ran = getRandom('.mp3')
exec(`ffmpeg -i ${bas} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(bas)
if (err) return reply('Error!')
hah = fs.readFileSync(ran)
thoth.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
fs.unlinkSync(ran)
})
break
					
case 'letra':
if (args.length < 1) return reply('Nome da música?')
  
thoth.updatePresence(from, Presence.composing)
tels = body.slice(7)
try {
anu = await fetchJson(`http://scrap.terhambar.com/lirik?word=${tels}`, {
method: 'get'
})
reply(anu.result.lirik)
  
} catch {
reply(mess.ferr)
}
break
 
case 'meme':
if (!isGroup) return reply(mess.only.group)
reply(mess.wait)
anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=MEMESBRASIL`, {method: 'get'})
ri = JSON.parse(JSON.stringify(anu));
ze =  ri[Math.floor(Math.random() * ri.length)];
nye = await getBuffer(ze)
thoth.sendMessage(from, nye, image, { caption: 'kkkkkkkkkkkk', quoted: mek })
break
case 'roleta':
let roleta = Math.floor(Math.random() * 2) + 1
if(roleta == '1'){
thoth.sendMessage(from, 'ATIREI EM VOCÊ', text, {quoted: mek})
}
else{
thoth.sendMessage(from, 'NÂO ATIREI', text, {quoted: mek})
}
					
break
case 'fechar':
thoth.updatePresence(from, Presence.composing)
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
var nomor = mek.participant
const close = {
text: `O adm @${nomor.split("@s.whatsapp.net")[0]}\nfechou o grupo`,
contextInfo: { mentionedJid: [nomor] }
}
thoth.groupSettingChange(from, GroupSettingChange.messageSend, true);
reply(close)
break
case 'tiktok':
if (args.length < 1) return reply('Onde está o url?🍉✨')
anu = await fetchJson(`https://api.zeks.xyz/api/tiktok?url=${body.slice(8)}&apikey=apivinz`, {method: 'get'})
					
thoth.sendMessage(from, mess.wait, text,{quoted : mek})
pyu = `✅ PRONTO! ✅
					
🤖Criador : ${anu.author}
🤖Título do vídeo : ${anu.title}	`
buffer = await getBuffer(anu.no_watermark)
buff = await getBuffer(anu.audio)
thoth.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.no_watermark}.mp4`, quoted: mek, caption: pyu})
thoth.sendMessage(from, buff, audio, {quoted : mek})
break
case 'on':
let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
let online = [...Object.keys(thoth.chats.get(ido).presences), thoth.user.jid]
thoth.sendMessage(from, 'Monkeys Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, { quoted: mek,
contextInfo: { mentionedJid: online }
})
break
						case 'abrir':
							thoth.updatePresence(from, Presence.composing)
							if (!isGroup) return reply(mess.only.group)
							if (!isGroupAdmins) return reply(mess.only.admin)
							if (!isBotGroupAdmins) return reply(mess.only.Badmin)
							open = {
								text: `O adm @${sender.split("@")[0]}\nabriu o grupo`,
								contextInfo: { mentionedJid: [sender] }
							}
							thoth.groupSettingChange(from, GroupSettingChange.messageSend, false)
							thoth.sendMessage(from, open, text, { quoted: mek })
							break
							case 'play':
								if (!isGroup) return reply(mess.only.group)
									if(body.length < 5) return thoth.reply(from, 'Você precisa dizer a música', mek)
				
									res = (await fetchJson(`https://arugaytdl.herokuapp.com/search?q=${body.slice(6)}`, {method: 'get'}))[0]
				
									asize = await fetchJson(`https://st4rz.herokuapp.com/api/yta?url=https://youtu.be/${res.id}`, {method: 'get'})
				
									if(asize.filesize.replace(' MB', '')>=16||asize.filesize.endsWith('GB')){
									thoth.reply(from, `O limite de tamanho é 16 MB. Esse áudio possui ${asize.filesize}`, mek)
									}
									else{
									thumb = await getBuffer(res.thumbnail)
									thoth.sendMessage(from, thumb, image, {quoted: mek, caption: 'Calma ae, tô procurando o CD'})
				
									rest = await fetchJson(`http://st4rz.herokuapp.com/api/yta2?url=http://youtu.be/${res.id}`, {method: 'get'})
									buffer = await getBuffer(rest.result)
				
									thoth.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: mek, ptt: true})
									}
									break
				case 'play2':  
					if (isBanned) return reply(nad.baned())
					reply(mess.wait)
					play = body.slice(5)
					anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
					if (anu.error) return reply(anu.error)
					infomp3 = `*Caso não seja a musica que deseja, tente novamente*\n\n*Musica encontrada!!!*\nTitulo : ${anu.result.title}\nFonte : ${anu.result.source}\nTamanho : ${anu.result.size}\n\n*ESPERE ENVIANDO POR FAVOR, AGUARDE\n\n *MAY NO TOPO*`
					buffer = await getBuffer(anu.result.thumbnail)
					 lagu = await getBuffer(anu.result.url_audio)
				     thoth.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
					thoth.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					  break
				case 'demitir':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Membro demitido\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						thoth.groupRemove(from, mentioned)
					} else {
						mentions(`Sucesso: @${mentioned[0].split('@')[0]} Foi demitido`, mentioned, true)
						thoth.groupDemoteAdmin(from, mentioned)
					}
					break
					case 'delete':
						case 'del':
						if (!isGroup) return reply(mess.only.group)
							if (!isGroupAdmins) return reply(mess.only.admin)
							thoth.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
							break
							case 'hub':
								daddy = `${body.slice(4)}`
								no = daddy.split("/")[0];
								bg = daddy.split("/")[1];
								 reply('Macaco, aguarde...')
								buffer = await getBuffer(`https://api.zeks.xyz/api/phub?apikey=apivinz&img=https://1.bp.blogspot.com/-x8KhcOBG-yw/XiU4pi1yWVI/AAAAAAAADBA/gK8tsLyc1lQ808A348IKzDCjf6fUBKONwCLcBGAsYHQ/s1600/cara%2Bbuat%2Bfoto%2Bprofil%2Bdi%2Bwhatsapp%2Bmenjadi%2Bunik.jpg&username=${no}&msg=${bg}`, {method: 'get'})
								thoth.sendMessage(from, buffer, image, {quoted: mek, caption: 'Pronto camaco'})
								 await limitAdd(sender) 
								break
							
case 'plaquinha':
if (!isGroup) return reply(mess.only.group)
if (args.length < 1) return reply(mess.blank)
teks = body.slice(10)
if (teks.length > 15) return reply('O texto é longo')
reply('Macaco, aguarde...')
buffer = await getBuffer(`https://budenter.sirv.com/Images/plaquinha.jpg?text.0.text=${teks}&text.0.position.gravity=center&text.0.position.y=5%25&text.0.size=19&text.0.color=000000&text.0.opacity=42&text.0.font.family=Passion%20One`)
thoth.sendMessage(from, buffer, image, {quoted: mek, caption: 'Pronto camaco'})
break
							case 'plaquinha2':
							if (!isGroup) return reply(mess.only.group)
								if (args.length < 1) return reply(mess.blank)
								teks = body.slice(11)
								if (teks.length > 15) return reply('O texto é longo')
								reply('Macaco, aguarde...')
								buffer = await getBuffer(`https://budenter.sirv.com/Images/plaquinhas4.jpg?text.0.text=${teks}&text.0.position.gravity=center&text.0.size=27&text.0.opacity=28&text.0.font.family=Patrick%20Hand`)
								thoth.sendMessage(from, buffer, image, {quoted: mek, caption: 'Pronto camaco'})
								break
							case 'googlelogo':
								if (args.length < 1) return reply(mess.blank)
								teks = body.slice(11)
								if (teks.length > 15) return reply('O texto é longo')
								reply('Macaco, aguarde...')
								buffer = await getBuffer(`https://budenter.sirv.com/Images/googlelogo.jpg?w=1099&text.0.text=${teks}&text.0.position.gravity=northwest&text.0.position.x=11%25&text.0.position.y=59%25&text.0.size=1&text.0.color=000000&text.0.opacity=92&text.0.font.family=PT%20Sans`)
								thoth.sendMessage(from, buffer, image, {quoted: mek, caption: 'Pronto camaco'})
								break
							case 'ph':
							if (!isGroup) return reply(mess.only.group)
								daddy = `${body.slice(3)}`
								texto1 = daddy.split("/")[0];
								 texto2 = daddy.split("/")[1];
								 reply('Macaco, aguarde...')
								  buffer = await getBuffer(`https://budenter.sirv.com/Images/hublogo.jpg?w=500&text.0.text=${texto1}&text.0.position.gravity=northwest&text.0.position.x=19%25&text.0.position.y=45%25&text.0.size=38&text.0.color=ffffff&text.0.opacity=94&text.0.font.family=Paytone%20One&text.1.text=${texto2}&text.1.position.gravity=northwest&text.1.position.x=59%25&text.1.position.y=46%25&text.1.size=19&text.1.color=000000&text.1.font.family=Paytone%20One&text.1.background.color=ffbe00&text.1.background.opacity=100`)
								  thoth.sendMessage(from, buffer, image, {quoted: mek, caption: 'Pronto camaco'})
								break
				case 'kick':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Marque a pessoa!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Removendo:\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						thoth.groupRemove(from, mentioned)
					} else {
						mentions(`Você foi expulso: @${mentioned[0].split('@')[0]}`, mentioned, true)
						thoth.groupRemove(from, mentioned)
					}
					break
				case 'listadmin':
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista de adms *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'link':  
				    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    linkgc = await thoth.groupInviteCode(from)
                    reply('https://chat.whatsapp.com/'+linkgc)
                    break
                case 'sair':
                    if (!isGroup) return reply(mess.only.group)
                    if (isGroupAdmins || isOwner) {
                    	thoth.groupLeave(from)
                    } else {
                        reply(mess.only.admin)
                    }
                    break
				case 'img':
					if (!isGroup) return reply(mess.only.group)
					if (!isQuotedSticker) return reply('❌ marque um sticker ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await thoth.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Só sticker sem movimento ❌')
						buffer = fs.readFileSync(ran)
						thoth.sendMessage(from, buffer, image, {quoted: mek, caption: 'kkkkkkkkkkkkkk'})
						fs.unlinkSync(ran)
					})
					break
case 'ia':
lxrd = body.slice(4)
data = await fetchJson(`sua api simi`, {method: 'get'})
if (data.error) return reply(data.error)
kiny = `${data.result}`
thoth.sendMessage(from, kiny, text, {quoted: mek})
await limitAdd(sender)
break
					
case 'simih':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (args.length < 1) return reply('Deseja ativar ou desativar?')
if (Number(args[0]) === 1) {
if (isSimi) return reply('O modo simi já está ativado')
samih.push(from)
fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
reply('O modo simi foi ativado...')
} else if (Number(args[0]) === 0) {
samih.splice(from, 1)
fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
reply('Simi está desativado com sucesso')
} else {
reply('1 para ativar e 0 para desativar')
}
break
case 'welcome':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (args.length < 1) return reply('Hmmmm')
if (Number(args[0]) === 1) {
if (isWelkom) return reply('Já ativo')
welkom.push(from)
fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
reply('Ativado com sucesso ✔️')
} else if (Number(args[0]) === 0) {
welkom.splice(from, 1)
fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
reply('Desativado com sucesso ✔️')
} else {
reply('1 para ativar, 0 para desativar')
}
break
				case 'buscar':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await thoth.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							thoth.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Marque 1 imagem do anime')
					}
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						return //console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
