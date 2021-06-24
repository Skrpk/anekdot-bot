const { Telegraf } = require('telegraf');
require('dotenv').config()

const { BOT_TOKEN, NODE_ENV } = process.env;
const bot = new Telegraf(BOT_TOKEN);

const PROJECT_ID = 'anekdot-bot-317721';
const REGION = 'europe-west1';

bot.start(ctx => ctx.reply('Sosi'));
bot.hears('hi', ctx => ctx.reply('Hey there'));
bot.on('message', ctx => ctx.reply('Not supported command')); // you need this to handle not supported command. Unless you do this you will get timeouts of function (extra usage)

if (NODE_ENV === 'production') {
	bot.telegram.setWebhook(
		`https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${process.env.FUNCTION_TARGET}`,
	);
	exports.botHook = (req, res) => {
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.body);
		bot.handleUpdate(req.body, res);
	};
} else {
	bot.launch();
}