

const TelegramApi = require('node-telegram-bot-api')

const token ='7158248847:AAG9Sr2y5NP1AlKisxbYrS5e-q7IwzQknpI'

const bot = new TelegramApi(token, {polling:true})
const{gameOptions,againOptions} = require('./options')

const chats={}


const startGame = async(chatId)=>{
    await bot.sendMessage(chatId, `Now I'm gonna make a number from 0 to 9`)
    const randomNumber = Math.floor(Math.random()*10)
    chats[chatId]=randomNumber;
    await bot.sendMessage(chatId,"guess the number", gameOptions)
}

const start= ()=>{
    bot.setMyCommands([
        {command:'/start', description:'Start bot'},
        {command:'/info', description:'Some info about'},
        {command:'/game', description:'game guess the number'},

    ])
    
    bot.on("message", async msg=>{
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start')
            return bot.sendMessage(chatId, `Welcome to HelperBot`)
        if(text === "/info"){
            return bot.sendMessage(chatId, `Your name is ${msg.from.first_name}`)
        }
        if(text ==='/game'){
           return startGame(chatId);
        }

        return bot.sendMessage(chatId, `No command name:${text}`)

    })

    bot.on('callback_query', msg=>{
        const data = msg.data;
        const chatId = msg.message.chat.id
        if(data==="/again"){
            return startGame(chatId);
        }

        if(data === chats[chatId]){
            return bot.sendMessage(chatId, `You Win!\n It was number ${chats[chatId]}`, againOptions)
        }else{
            return bot.sendMessage(chatId, `You lose!\n It was number ${chats[chatId]}`,againOptions )
        }

    })
}
start()