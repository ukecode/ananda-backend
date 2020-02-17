const TelegramBot = require('node-telegram-bot-api');
const puppeteer = require('puppeteer');

//const cron = require('node-cron');


// replace the value below with the Telegram token you receive from @BotFather
const token = "{TOKEN}";


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/vagas [whatever]"
bot.onText(/\/vagas (.+)/, (msg, match) => {

  // ---------------   Envie   /vaga  {tecnologia}  e receba uma lista de vagas,
  //                   por hora todos os resultados estão fixados em Minas Gerais


  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  getJob(chatId,resp);  

});

// Listen for any kind of message. There are different kinds of
// messages.
async function getJob(chatId,tech){

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/home/?originalSubdomain=br');
    await page.waitFor(2000);
    await page.click('[class=nav__button-secondary]');
    await page.waitFor(2000);



    //---------  INSERT YOUR LINKEDIN CREDENTIALS --------------

    await page.type('[name=session_key]','{EMAIL LINKEDIN}');
    await page.type('[type=password]','{PASSWORD LINKEDIN}');
    
    //-------------------------------------------------------------- 

    await page.click('[type=submit]');
    await page.waitFor(2000);
    await page.goto(`https://www.linkedin.com/jobs/search/?geoId=100358611&keywords=${tech}%20&location=Minas%20Gerais%2C%20Brasil`);
    const data  =  await page.evaluate(()=>{
    const list = document.querySelectorAll('#ember4 > div.application-outlet > div.authentication-outlet > section.job-search-ext.job-search-ext--two-pane > div.jobs-search-two-pane__wrapper.jobs-search-two-pane__wrapper--two-pane > div > div > div.jobs-search-two-pane__results.display-flex > div.jobs-search-results.jobs-search-results--is-two-pane > div > ul'); 
    const res  = document.location.href;
      return{
        response : res,
        data : list[0].innerText
      }
    });
    console.log(data);
    bot.sendMessage(chatId,data.data)
    await browser.close();

}

async function mandaNude(chatId){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.xvideos.com/');
      
    let url  = await page.evaluate(()=>{
      var images  = document.getElementsByTagName('img')
       return(images[0].src);
    })

    bot.sendPhoto(chatId, url);
    await browser.close();
}


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);


// --------  

if(msg.text == "#mandanude"){

 mandaNude(chatId);
}

if(msg.text  == 'Oi'){
    bot.sendMessage(chatId, 'Oiiii sumido, tudo bem?');
 
}

if(msg.text  == 'Tudo e vc?'){
    bot.sendMessage(chatId, 'Melhor agora ;)');

}
  // send a message to the chat acknowledging receipt of their message
});


//cron.schedule('0 6-7 * * * ', () => {
//    bot.sendMessage('823137937', 'Bom dia flor do dia!');
//  });


