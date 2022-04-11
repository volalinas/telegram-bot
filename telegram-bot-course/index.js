
const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options')
const token = '5127958545:AAFuP3z5pwD0q1qbXPkly41ATsadlGPUfXM';
const bot = new TelegramApi(token, { polling: true });
const chats = {};


const startGame = async (chatId) => {
  await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен её угадать!`);
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Получить информацию о пользователе' },
    { command: '/game', description: 'Игра угадай цифру' }
  ])

  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendSticker(
        chatId, 'https://cdn.tlgrm.app/stickers/463/343/46334338-7539-4dae-bfb6-29e0bb04dc2d/192/9.webp');
      return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот компании JoyDev!`)
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
    }
    if (text === '/game') {
      return startGame(chatId)
    }
    return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!');
  })

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again') {
      return startGame(chatId)
    }
    if (data === chats[chatId]) {
      await bot.sendMessage(chatId, `Поздраляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
    } else {
      await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
    }
  })
}

start()