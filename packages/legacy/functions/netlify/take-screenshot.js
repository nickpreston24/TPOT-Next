// const chromium = require('chrome-aws-lambda');

const playwright = require("playwright-aws-lambda");


function isValidUrl(string) {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }
    return true;
}

exports.handler = async (event, context, callback) => {


    let browser = null;
    let body = event.body
    console.log('body', body)
    try {
        if (body.url && isValidUrl(body.url)) {
            browser = await playwright.launchChromium({ headless: true });
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto(body.url);
            const screenshot = await page.screenshot({ type: "png" });
            // res.setHeader("Content-Type", "image/png");
            // res.status(200).send(screenshot);

            callback(null, {
                statusCode: 200,
                body: screenshot,
            })

        } else throw "Please provide a valid url";

    } catch (error) {

        callback(null, {
            statusCode: 200,
            body: "Failed to screenshot!" + error,
        })
        // res.status(500).send({
        //     status: "Failed",
        //     error
        // });

    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }


    //     const pageToScreenshot = JSON.parse(event.body).pageToScreenshot;

    //     if (!pageToScreenshot) return {
    //         statusCode: 400,
    //         body: JSON.stringify({ message: 'Page URL not defined' })
    //     }

    //     const browser = await chromium.puppeteer.launch({
    //         args: chromium.args,
    //         defaultViewport: chromium.defaultViewport,
    //         executablePath: await chromium.executablePath,
    //         headless: chromium.headless,
    //     });

    //     const page = await browser.newPage();

    //     await page.goto(pageToScreenshot, { waitUntil: 'networkidle2' });

    //     const screenshot = await page.screenshot({ encoding: 'binary' });

    //     await browser.close();

    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify({
    //             message: `Complete screenshot of ${pageToScreenshot}`,
    //             buffer: screenshot
    //         })
    //     }

}