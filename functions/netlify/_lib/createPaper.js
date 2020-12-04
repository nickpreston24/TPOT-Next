const dotenv = require('dotenv')
dotenv.config()
const puppeteer = require('puppeteer');
// const { firefox, chromium, webkit } = require('playwright')
// const playwright = require("playwright-aws-lambda");
const { chromium } = require("playwright-chromium");

const isDev = process.env.NODE_ENV === "development";
let userName = process.env.WPUSER //'michael.n.preston@gmail.com'
let password = process.env.WPPASS //'Mercury2020!!'

let screenshotsDir = '/screenshots'

async function createPaper(pageData) {

    const firefoxOptions = {
        product: 'firefox',
        extraPrefsFirefox: {
            // Enable additional Firefox logging from its protocol implementation
            // 'remote.log.level': 'Trace',
        },
        // Make browser logs visible
        dumpio: true,
    };

    let options = {
        // ...firefoxOptions,
        headless: false
        // , slowMo: 250
    }

    const browser = await puppeteer.launch(options)
    // Give permission to the browser to copy/paste
    await browser.defaultBrowserContext().overridePermissions('https://www.thepathoftruth.com', ['clipboard-read', 'clipboard-write']);

    const page = await browser.newPage();

    await page.setViewport({ width: 1500, height: 764 })
    // await page.goto('https://www.thepathoftruth.com/wp-admin/');
    await page.goto('https://www.thepathoftruth.com/wp-admin/post-new.php?post_type=page') // Go straight to new-page route right after login success.

    await page.screenshot({ path: screenshotsDir + 'wp-admin-load.png' })

    /** Log In as Me */
    // Set credentials:
    await page.evaluate(val => document.querySelector('#user_login').value = val, userName).catch(handleError)
    await page.evaluate(val => document.querySelector('#user_pass').value = val, password).catch(handleError)

    await page.click('input[type="submit"]');

    await page.screenshot({ path: screenshotsDir + 'wp-login.png' })

    /** Paste raw HTML from editor */
    let content = pageData.content || '<h1>This post was created by Puppeteer JS</h1>'
    let pageNum = " " + Math.floor(Math.random() * 50)
    let title = (pageData.title || 'Puppeteer Test Page') + pageNum


    // Click 'Add new Page' menu item:
    // await page.hover('#menu-pages > a > div.wp-menu-name') // hover over pages menu
    // await page.click('#menu-pages > ul > li:nth-child(3) > a') // click on 'add new page' menu item //FIXME: incorrect selector!

    // Toggle Text mode as HTML (not Visual):
    await page.click('#content-html')

    // Paste title and content:
    await page.evaluate(val => document.querySelector('#content').value = val, content).catch(handleError)
    await page.evaluate(val => document.querySelector('#title').value = val, title)

    // Save as Draft:
    await page.click('#save-post')

    await page.screenshot({ path: screenshotsDir + 'wp-paste-contents.png' })

    await browser.close();
}

function handleError(error) {
    console.error(error)
}

async function createPaperViaPlaywright(pageData) {

    // const firefoxOptions = {
    //     product: 'firefox',
    //     extraPrefsFirefox: {
    //         // Enable additional Firefox logging from its protocol implementation
    //         // 'remote.log.level': 'Trace',
    //     },
    //     // Make browser logs visible
    //     dumpio: true,
    // };

    // let options = {
    //     headless: false
    // }

    // const browser = await chromium.launch({
    //     headless: false   
    // });

    // const browser = await playwright.launchChromium({
    //     headless: true
    // });

    const browser = await chromium.launch({ args: ["--no-sandbox"], headless: true, chromiumSandbox: false });
    const context = await browser.newContext();
    const page = await context.newPage();


    // Give permission to the browser to copy/paste
    // await browser.defaultBrowserContext().overridePermissions('https://www.thepathoftruth.com', ['clipboard-read', 'clipboard-write']);

    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    // // const page = await browser.newPage();

    // // await page.setViewport({ width: 1500, height: 764 })
    // // // await page.goto('https://www.thepathoftruth.com/wp-admin/');
    await page.goto('https://www.thepathoftruth.com/wp-admin/post-new.php?post_type=page') // Go straight to new-page route right after login success.

    // // await page.screenshot({ path: screenshotsDir + 'wp-admin-load.png' })

    /** Log In as Me */
    // Set credentials:
    await page.fill('#user_login', userName).catch(handleError)
    await page.fill("#user_pass", password).catch(handleError)
    await page.click('input[type="submit"]');

    console.log(page.url())

    if (isDev) {
        await page.screenshot({ path: 'screenshots/wp-login.png' })
    }

    // /** Paste raw HTML from editor */
    let content = pageData.content || '<h1>This post was created by Puppeteer JS and hosted by Vercel</h1>'

    let pageNum = " " + Math.floor(Math.random() * 50)
    let title = (pageData.title || 'Puppeteer Test Page') + pageNum

    // Click 'Add new Page' menu item:
    // await page.hover('#menu-pages > a > div.wp-menu-name') // hover over pages menu
    // await page.click('#menu-pages > ul > li:nth-child(3) > a') // click on 'add new page' menu item //FIXME: incorrect selector!

    // Toggle Text mode as HTML (not Visual):
    await page.click('#content-html')

    // Paste title and content:
    await page.fill('#content', content).catch(handleError)
    await page.fill('#title', title)

    // Save as Draft:
    await page.click('#save-post')

    if (isDev) {
        await page.screenshot({ path: 'screenshots/wp-paste-contents.png' })
    }

    await browser.close();
}

module.exports = {
    createPaper,
    createPaperViaPlaywright
}