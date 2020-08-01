const {Builder, By, Key, until} = require('selenium-webdriver');
const sleep = require('sleep');
sleep.sleep(5)//sleep for 5 seconds

async function login(driver, url, user, password) {

    try {
        await driver.get(url);
        await driver.findElement(By.id('txtUsuario')).sendKeys(user, Key.RETURN);
        await driver.findElement(By.id('txtSenha')).sendKeys(password, Key.RETURN);
        await driver.findElement(By.id("lnkLogin")).click();

        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        setTimeout(() => {}, 10000);
        // await driver.quit();
    }
};

async function searchPeriod(driver, initDate, finalDate) {

    try {

        // await driver.findElement(By.id('ctl00_ContentPlaceHolder1_txtPeriodoIni'))
        //     .sendKeys(initDate, Key.RETURN);
        // await driver.findElement(By.id('ctl00_ContentPlaceHolder1_txtPeriodoFim'))
        //     .sendKeys(finalDate, Key.RETURN);


        await driver.findElement(By.id("ctl00_ContentPlaceHolder1_imbCalendarioIni")).click();

        // await driver.findElement(By.id("ctl00_ContentPlaceHolder1_txtPeriodoIni")).click();
        // await driver.executeScript("document.getElementById('ctl00_ContentPlaceHolder1_txtPeriodoIni').setAttribute('value', '01/03/2020')");
        // await driver.findElement(By.id("ctl00_ContentPlaceHolder1_txtPeriodoFim")).click();

        // await driver.executeScript("document.getElementById('ctl00_ContentPlaceHolder1_txtPeriodoIni').setAttribute('value', '01/03/2020')");
        // await driver.executeScript("document.getElementById('ctl00_ContentPlaceHolder1_txtPeriodoFim').setAttribute('value', '02/03/2020')");

        // driver.executeScript("document.getElementById('ctl00_ContentPlaceHolder1_mskPeriodoIni_ClientState').setAttribute('value', '01032020')");
        // driver.executeScript("document.getElementById('ctl00_ContentPlaceHolder1_mskPeriodoFim_ClientState').setAttribute('value', '02032020')");

        // await driver.findElement(By.id("ctl00_ContentPlaceHolder1_lnkAtualizar")).click();

    } finally {
        setTimeout(() => {}, 10000);
        // await driver.quit();
    }
};



async function goDate(driver, date) {

    try {

        const url = `http://10.0.0.87/Ponto4/Paginas/pgAlterarBatidas.aspx?dia=${date}&func=95`;
        // await driver.executeScript(`window.open("${url}");`);
        await driver.get(url);

    } finally {
        setTimeout(() => {}, 10000);
        // await driver.quit();
    }
};


async function justify(driver) {

    try {

        // let ele = await driver.wait(until.elementLocated(By.id('ctl00_ContentPlaceHolder1_txtEntrada1')), 10000);
        // ele.sendKeys('Homeoff', Key.RETURN);

        await driver.findElement(By.id('ctl00_ContentPlaceHolder1_txtEntrada1'))
            .sendKeys('Homeoff', Key.RETURN);

        sleep.msleep(200);

        await driver.findElement(By.id('ctl00_ContentPlaceHolder1_txtSaida1'))
            .sendKeys('Homeoff', Key.RETURN);

        sleep.msleep(200);

        await driver.findElement(By.id('ctl00_ContentPlaceHolder1_txtEntrada2'))
            .sendKeys('Homeoff', Key.RETURN);

        sleep.msleep(200);

        await driver.findElement(By.id('ctl00_ContentPlaceHolder1_txtSaida2'))
            .sendKeys('Homeoff', Key.RETURN);

        sleep.msleep(200);

        await driver.findElement(By.id('ctl00_ContentPlaceHolder1_txtEntrada3'))
            .sendKeys('Homeoff', Key.RETURN);

        sleep.msleep(200);


        await driver.findElement(By.id('ctl00_ContentPlaceHolder1_txtSaida3'))
            .sendKeys('Homeoff', Key.RETURN);

        sleep.msleep(200);

        await driver.findElement(By.id('ctl00_ContentPlaceHolder1_txtObservacao'))
            .sendKeys('Homeoff', Key.RETURN);

        sleep.msleep(200);

        await driver.findElement(By.id("ctl00_ContentPlaceHolder1_lnkSalvar")).click();



    } finally {
        setTimeout(() => {}, 10000);
        // await driver.quit();
    }
};



function feriados(date){

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


async function loopDays(driver, startDateStr, finalDateStr){

    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let startDate = new Date(startDateStr);
    let finalDate = new Date(finalDateStr);

    console.log(`startDate: ${startDate}`);
    console.log(`finalDate: ${startDate}`);


    for (var d = startDate; d <= finalDate; d.setDate(d.getDate() + 1)) {

        let date = new Date(d);

        console.log(`in loop: ${date}`);

        let daysOfWeek = days[date.getDay()];

        if(daysOfWeek !== 'Sunday' && daysOfWeek !== 'Saturday' && !feriados(date)){

            let dayFormat = `${date.getDate()}`;
            dayFormat = dayFormat.length === 1 ? `0${dayFormat}`: dayFormat;

            let monthFormat = `${date.getMonth() + 1}`;
            monthFormat = monthFormat.length === 1 ? `0${monthFormat}`: monthFormat;

            let yearFormat = `${date.getUTCFullYear()}`.slice(2,4);

            let dateFormat = `${dayFormat}/${monthFormat}/${yearFormat}`;

            console.log(`atualizando a data: ${dateFormat}`);

            await goDate(driver, dateFormat);
            sleep.sleep(3);
            await justify(driver);
            sleep.sleep(4);
        }
    }


}


async function main(){

    let driver = await new Builder().forBrowser('chrome').build();

    let loginUrl = 'http://10.0.0.87/Ponto4/Paginas/pgLogin.aspx';

    const user = '';
    const password = '';

    await login(driver, loginUrl, user, password);
    sleep.sleep(3);

    const startDate = '2020/04/18';
    const finalDate = '2020/06/19';

    await loopDays(driver, startDate, finalDate);


    // setTimeout(() => {goDate(driver, date);}, 4000);
    // setTimeout(() => {justify(driver);}, 4000);
}


// async function mainTest(){
//
//     const startDate = '2020/03/16';
//     const finalDate = '2020/04/18';
//
//     await loopDays('driver', startDate, finalDate);
//
// }



main();
