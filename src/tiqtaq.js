const {Builder, By, Key, until} = require('selenium-webdriver');
const sleep = require('sleep');
// sleep.sleep(5)//sleep for 5 seconds


async function login(driver, url, user, password) {

    await driver.get(url);
    sleep.sleep(3);

    await driver.findElement(By.id('email')).sendKeys(user, Key.RETURN);
    await driver.findElement(By.id('password')).sendKeys(password, Key.RETURN);

    // não precisa clickar pra entrar
    // await driver.findElement(By.className("MuiButtonBase-root MuiButton-root MuiButton-text Button__StyledButton-gFCKw eWgXcw")).click();

};

function holiday(date){

    let feriados = [new Date('2020/04/10').getTime(),
        new Date('2020/04/21').getTime(),
        new Date('2020/04/23').getTime(),
        new Date('2020/05/01').getTime(),
        new Date('2020/06/11').getTime()];

    for (let i = 0; i <= feriados.length; i++){

        if(feriados[i] === date.getTime()){
            return true;
        }
    }

    return false;
}


async function formatDate(date){

    let dayFormat = `${date.getDate()}`;
    dayFormat = dayFormat.length === 1 ? `0${dayFormat}`: dayFormat;

    let monthFormat = `${date.getMonth() + 1}`;
    monthFormat = monthFormat.length === 1 ? `0${monthFormat}`: monthFormat;

    let yearFormat = `${date.getUTCFullYear()}`;

    return `${dayFormat}/${monthFormat}/${yearFormat}`;
}

function weekend(date){

    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let daysOfWeek = days[date.getDay()];

    return daysOfWeek === 'Sunday' || daysOfWeek === 'Saturday';
}

function randomMin(lengthRamdon){
    let random =  Math.floor((Math.random() * lengthRamdon) + 1);
    return random.toString().length === 2 ? random.toString() : `0${random}`
}

async function justify(driver, dateFormat){


    // let timeList = ["10", "12", "13", "19"];
    let timeList = ["10", "12"];
    // let timeList = ["13", "19"];

    for(var i = 0; i < timeList.length; i++){

        let time = `${timeList[i]} : ${randomMin(20)}`;

        await driver.findElement(By.id('btn-add-time-entry')).click();
        sleep.sleep(1);

        await driver.findElement(By.id('date-field')).sendKeys(dateFormat, Key.RETURN);

        sleep.sleep(1);
        await driver.findElement(By.id('time')).sendKeys(time, Key.RETURN);

        sleep.sleep(1);

        await driver.findElement(By.id('btn-add-day-record')).click();

        sleep.sleep(2);
    }

}

async function loopDays(driver, startDateStr, finalDateStr){

    let startDate = new Date(startDateStr);
    let finalDate = new Date(finalDateStr);

    console.log(`startDate: ${startDate}`);
    console.log(`finalDate: ${finalDate}`);

    for (var d = startDate; d <= finalDate; d.setDate(d.getDate() + 1)) {

        let date = new Date(d);

        console.log(`in loop: ${date}`);

        if( !weekend(date) && !holiday(date)){

            let dateFormat = formatDate(date);
            console.log(`atualizando a data: ${dateFormat}`);

            await justify(driver, dateFormat);
        }
    }
}


async function main(){

    let driver = await new Builder().forBrowser('chrome').build();

    let loginUrl = 'https://www.tiquetaque.app/painel';

    const user = '';
    const password = '';

    console.log('start login');
    await login(driver, loginUrl, user, password);

    sleep.sleep(3);

    const startDate = '2020/07/04';
    const finalDate = '2020/07/08';

    await loopDays(driver, startDate, finalDate);
}

main();

// console.log(randomMin(20));


