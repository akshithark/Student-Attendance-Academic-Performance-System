
const { Builder, By, until } = require('selenium-webdriver');

(async () => {
    const driver = await new Builder()
        .forBrowser('chrome')
        .build();

    try {
        // Open Attendance application
        await driver.get('http://localhost:3002');

        // Faculty login
        await driver.findElement(By.id('user')).clear();
        await driver.findElement(By.id('user')).sendKeys('faculty');

        await driver.findElement(By.id('pass')).clear();
        await driver.findElement(By.id('pass')).sendKeys('faculty123');

        await driver.findElement(By.id('login')).click();

        // Wait for student registration form
        await driver.wait(
            until.elementLocated(By.id('name')),
            10000
        );

        // Register a student
        await driver.findElement(By.id('name'))
            .sendKeys('Selenium Student');

        await driver.findElement(By.id('roll'))
            .sendKeys('E2E' + Date.now());

        await driver.findElement(By.id('dept'))
            .sendKeys('CSE');

        await driver.findElement(By.id('email'))
            .sendKeys('selenium@test.com');

        await driver.findElement(By.id('addStudent')).click();

        // Verify registration
        await driver.wait(
            until.elementTextContains(
                driver.findElement(By.id('message')),
                'Student added'
            ),
            10000
        );

        console.log(
            'SELENIUM PASS: Faculty login and student registration'
        );

    } finally {
        await driver.quit();
    }
})().catch(error => {
    console.error(error);
    process.exit(1);
});
