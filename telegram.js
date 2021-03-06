//for clarifications or doubts, please contact me on Discord @rdvdr#2205 :)

const { Telegraf, Telegram, Context } = require('telegraf');

const bot = new Telegraf('Enter Bot Token');

const fetch = require('node-fetch');

const weather = require('weather-js');

const flip = require('flip-text');

bot.start((ctx) => {
    console.log('User has pressed start.')
    ctx.reply('Hey there, My name is xyz! \nUse /help to gain access to all commands :)');
});

bot.help((ctx) => {
    ctx.reply('I can perform the following cmds: \n1. /catto \n2. /doggo \n3. /hi \n4. /dice \n5. /poll \n6. /weather or /w \n7. /textflip or /tp \n8. /aniquote or /aq\n9. /anime \n10. /anipic \n11. /rps \n12. /bye');
});

bot.command('hi', (ctx) => {
    ctx.reply('hello there ' + ctx.from.first_name + '!');
})

bot.command('catto', (ctx) => {
    let status; 
        fetch('https://api.thecatapi.com/v1/images/search')
            .then((res) => { 
                status = res.status; 
                return res.json()
            })
            .then((jsonData) => {
                console.log(jsonData);
                console.log(status);
                var imageUrl = jsonData['0']['url'];
                ctx.replyWithPhoto(imageUrl);
            })
});

bot.command('doggo', (ctx) => {
    let status; 
        fetch('https://dog.ceo/api/breeds/image/random')
            .then((res) => { 
                status = res.status; 
                return res.json() 
            })
            .then((jsonData) => {
                console.log(jsonData);
                console.log(status);
                var imageUrl = jsonData.message;
                ctx.replyWithPhoto(imageUrl);
            })
});

bot.command('dice', (ctx) => {
    ctx.replyWithDice();
});

bot.command('poll', (ctx) => {
    let opt = ['yes', 'no'];
    ctx.replyWithPoll('are you happy?', opt);
});

bot.command('weather', (ctx) => {
    let args=ctx.message.text.toLowerCase();
    let convert = Array.from(args).toString().split(',').join('');// /weather 
    let x = convert.length;
    var i;
    for(i=0; i<9; i++){
        if(convert[i] == ' '){
            console.log('the space is located at position ' + i);
            var newconvert = convert.substr((i+1), (x-i));
        }
    }

    if(newconvert==undefined||!newconvert){ 
        ctx.reply('please mention a location'); 
    }
    else{
        weather.find({search: newconvert, degreeType: `C`}, function (error, result) {
            var current = result[0].current;
            var location = result[0].location;

            if(result === undefined || result.length == '0' || !result){
                ctx.reply('invalid location!');
            }

            ctx.reply(
                `Weather Forecast for ${current.observationpoint} \n` +
                `Time Zone: UTC ${location.timezone} \n` +
                `Temperature: ${current.temperature}??C \n` +
                `Wind: ${current.winddisplay} \n` +
                `Humidity: ${current.humidity}%` 
            );
        });
    }
});

bot.command('w', (ctx) => {
    let args=ctx.message.text.toLowerCase();
    let convert = Array.from(args).toString().split(',').join('');
    let x = convert.length;
    var i;
    for(i=0; i<4; i++){
        if(convert[i] == ' '){
            console.log('the space is located at position ' + i);
            var newconvert = convert.substr((i+1), (x-i));
        }
    }

    if(newconvert==undefined||!newconvert){ 
        ctx.reply('please mention a location!'); 
    }
    else{
        weather.find({search: newconvert, degreeType: `C`}, function (error, result) {
            var current = result[0].current;
            var location = result[0].location;

            if(result === undefined || result.length == '0' || !result){
                ctx.reply('invalid location!');
            }

            ctx.reply(
                `Weather Forecast for ${current.observationpoint} \n` +
                `Time Zone: UTC ${location.timezone} \n` +
                `Temperature: ${current.temperature}??C \n` +
                `Wind: ${current.winddisplay} \n` +
                `Humidity: ${current.humidity}%` 
            );
        });
    }
});

bot.command('calc', (ctx) => {
    let args=ctx.message.text;
    let convert = Array.from(args).toString().split(',').join('');
    let x = convert.length;
    var i;
    for(i=0; i<7; i++){
        if(convert[i] == ' '){
            console.log('the space is located at position ' + i);
            var newconvert = convert.substr(i, (x-i));
        }
    }

    if(newconvert==undefined||!newconvert){ 
        ctx.reply('please enter input'); 
    }
    else{
        let answer = eval(newconvert);
        ctx.reply('Your answer is: ' + answer);
    }

});

bot.command('textflip', (ctx) => {
    let args=ctx.message.text;
    let convert = Array.from(args).toString().split(',').join('');
    let x = convert.length;
    var i;
    for(i=0; i<10; i++){
        if(convert[i] == ' '){
            console.log('the space is located at position ' + i);
            var newconvert = convert.substr(i, (x-i));
        }
    }

    if(newconvert==undefined||!newconvert){ 
        ctx.reply('please enter the text you would like me to flip'); 
    }
    else {
        let flippedText = flip(newconvert);
        ctx.reply(flippedText);
    }
});

bot.command('tp', (ctx) => {
    let args=ctx.message.text;
    let convert = Array.from(args).toString().split(',').join('');
    let x = convert.length;
    var i;
    for(i=0; i<5; i++){
        if(convert[i] == ' '){
            console.log('the space is located at position ' + i);
            var newconvert = convert.substr(i, (x-i));
        }
    }

    if(newconvert==undefined||!newconvert){ 
        ctx.reply('please enter the text you would like me to flip'); 
    }
    else {
        let flippedText = flip(newconvert);
        ctx.reply(flippedText);
    }
});

bot.command('aniquote', (ctx) => {
    let status; 
        fetch('https://animechan.vercel.app/api/random/')
        .then((res) => { 
            status = res.status; 
            return res.json() 
        })
        .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
            let chara = jsonData['character'];
            let quote = jsonData['quote'];
            ctx.reply('"' + quote + '"' + '\n- ' + chara)
        })
        .catch((err) => {
            console.error(err);
        });
});

bot.command('aq', (ctx) => {
    let status; 
        fetch('https://animechan.vercel.app/api/random/')
        .then((res) => { 
            status = res.status; 
            return res.json() 
        })
        .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
            let chara = jsonData['character'];
            let quote = jsonData['quote'];
            ctx.reply('"' + quote + '"' + '\n- ' + chara)
        })
        .catch((err) => {
            console.error(err);
        });
});

bot.command('anime', (ctx) => {
    let args=ctx.message.text.toLowerCase();
    let convert = Array.from(args).toString().split(',').join('');
    let x = convert.length;
    var i;
    for(i=0; i<8; i++){
        if(convert[i] == ' '){
            console.log('the space is located at position ' + i);
            var newconvert = convert.substr(i, (x-i));
        }
    }

    if(newconvert==undefined||!newconvert){ 
        ctx.reply('please mention an anime you would like me to get info on!'); 
    }
    else {
        let status; 
            fetch('https://kitsu.io/api/edge/anime?filter[text]='+newconvert)
            .then((res) => { 
                status = res.status; 
                return res.json() 
            })
            .then((jsonData) => {
                console.log(jsonData);
                console.log(status);
                if (jsonData['meta']['count'] == 0 || jsonData['meta']['count'] == '0'){
                    ctx.reply("No results were found :(");
                }
                else {
                    ctx.replyWithPhoto(jsonData['data'][0]['attributes']['posterImage']['large']);
                    ctx.reply(
                        'Anime: ' + jsonData['data'][0]['attributes']['titles']['en_jp'] + '\n\n' +
                        'Description: \n' + jsonData['data'][0]['attributes']['synopsis'] + '\n\n' +
                        'Total Episodes: ' + jsonData['data'][0]['attributes']['episodeCount'] + '\n\n' +
                        'Popularity Rank: '+ jsonData['data'][0]['attributes']['popularityRank'] + '\n\n' +
                        'Ratings: ' + jsonData['data'][0]['attributes']['averageRating'] 
                    );
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
});

bot.command('anipic', (ctx) => {
    let randPIC = Math.floor(Math.random()*6);
    console.log(randPIC);
    if(randPIC==0||randPIC==1||randPIC==2||randPIC==3){
        let status; 
            fetch('https://api.waifu.pics/sfw/waifu')
            .then((res) => { 
                status = res.status; 
                return res.json() 
            })
            .then((jsonData) => {
                console.log(jsonData);
                console.log(status);
                let picURL = jsonData['url'];
                ctx.replyWithPhoto(picURL);
            })
            .catch((err) => {
                console.error(err);
            }); 

    } else if(randPIC==4){
        let status; 
            fetch('https://api.waifu.pics/sfw/hug')
            .then((res) => { 
                status = res.status; 
                return res.json() 
            })
            .then((jsonData) => {
                console.log(jsonData);
                console.log(status);
                let picURL = jsonData['url'];
                ctx.replyWithAnimation(picURL);
            })
            .catch((err) => {
                console.error(err);
            }); 

    } else if(randPIC==5){
        let status; 
            fetch('https://api.waifu.pics/sfw/poke')
            .then((res) => { 
                status = res.status; 
                return res.json() 
            })
            .then((jsonData) => {
                console.log(jsonData);
                console.log(status);
                let picURL = jsonData['url'];
                ctx.replyWithAnimation(picURL);
            })
            .catch((err) => {
                console.error(err);
            }); 
            
    } else {
        ctx.reply('sike.');
    }
});

bot.command('rps', (ctx) => {
    let args=ctx.message.text.toLowerCase();
    let convert = Array.from(args).toString().split(',').join('');
    let x = convert.length;
    var i;

    for(i=0; i<5; i++){
        if(convert[i] == ' '){
            console.log('the space is located at position ' + i);
            var newconvert = convert.substr(i, (x-i));
        }
    }
    console.log('Users choice:' + newconvert);

    if(newconvert==undefined||!newconvert){ 
        ctx.reply('please choose rock/paper/scissor!'); 
    }
    
    else {
        let obj1 = ' rock';
        let obj2 = ' paper';
        let obj3 = ' scissor';
        let symbol1 = ' ????';
        let symbol2 = ' ???????';
        let symbol3 = ' ??????';

        let randomChoice = Math.floor(Math.random()*3);
        console.log('number generated: ' + randomChoice);

        var symbol;
        var output;

        switch(randomChoice)
        {
            case 0: output = obj1;
                    symbol = symbol1;
                    break;
            case 1: output = obj2;
                    symbol = symbol2;
                    break;
            case 2: output = obj3;
                    symbol = symbol3;
                    break;

            default: output = 'null';
        };
        console.log('bot:' + output);

        if(newconvert==output){
            ctx.reply(
                'You chose:' + symbol + '\n' +
                'I chose:' + symbol
            );
            ctx.reply('It is a draw!');
        }

        else if((newconvert==obj1)&&(output==obj2)){
            ctx.reply(
                'You chose:' + symbol1 + '\n' +
                'I chose:' + symbol 
            );
            ctx.reply('I win!');
        }

        else if((newconvert==obj1)&&(output==obj3)){
            ctx.reply(
                'You chose:' + symbol1 + '\n' +
                'I chose:' + symbol 
            );
            ctx.reply('You win! Congrats!');
        }

        else if((newconvert==obj2)&&(output==obj3)){
            ctx.reply(
                'You chose:' + symbol2  + '\n' +
                'I chose:' + symbol 
            );
            ctx.reply('I win!');
        }

        else if((newconvert==obj2)&&(output==obj1)){
            ctx.reply(
                'You chose:' + symbol2  + '\n' +
                'I chose:' + symbol 
            );
            ctx.reply('You win! Congrats!');
        }

        else if((newconvert==obj3)&&(output==obj1)){
            ctx.reply(
                'You chose:' + symbol3  + '\n' +
                'I chose:' + symbol 
            );
            ctx.reply('I win!');
        }

        else if((newconvert==obj3)&&(output==obj2)){
            ctx.reply(
                'You chose:' + symbol3  + '\n' +
                'I chose:' + symbol 
            );
            ctx.reply('You win! Congrats!');
        }

        else {
            ctx.reply('invalid input');
        }

    }
});

bot.command('bye', (ctx) => {
    ctx.reply('cya later ' + ctx.from.first_name + '! have a good day :)')
});

bot.launch();