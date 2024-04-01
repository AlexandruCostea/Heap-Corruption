// @ts-check

const { test, expect } = require('@playwright/test');

test('details page has title', async ({ page }) => {
    await page.goto('localhost:5173/details/post/1');
    await expect(page).toHaveTitle(/Heap Corruption/);
});

test('details page renders title', async ({ page }) => {
    await page.goto('http://localhost:5173/details/post/1');
    await expect(page.getByText('This is a better version of Stack Overflow')).toBeVisible();
});

test('details page renders back button', async ({ page }) => {
    await page.goto('http://localhost:5173/details/post/1');
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
});

test('details page renders post table', async ({ page }) => {
    await page.goto('http://localhost:5173/details/post/1');
    await page.waitForSelector('table', { timeout: 5000 });
    const tableElement = await page.$('table');
    expect(tableElement).not.toBeNull();
});

test('clicking on back button takes you to the main page', async ({ page }) => {
    await page.goto('http://localhost:5173/details/post/1');
    await page.click('button:has-text("Back")');
    
    await expect(page).toHaveURL('http://localhost:5173/posts');
});

test('details table has the correct data', async ({ page }) => {
    await page.goto('http://localhost:5173/details/post/1');
    await page.waitForSelector('table', { timeout: 5000 });
    const tableElement = await page.$('table');
    if (!tableElement) {
        throw new Error('Table not found');
    }
    const tableRows = await tableElement.$$('tr');
    expect(tableRows.length).toBe(6);

    for (let i = 0; i < tableRows.length; i++) {
        const tableCells = await tableRows[i].$$('td');
        if (i === 0 || i === 3 || i === 4) {
            expect(tableCells.length).toBe(1);
            continue;
        }
        else {
            expect(tableCells.length).toBe(2);
        }
    }

    const titleRow = tableRows[0];
    const titleCells = await titleRow.$$('td');
    const title = await titleCells[0].innerText();
    expect(title).toBe('Syntax Error on line 600 but my code is only 40 lines long');

    const usernameRow = tableRows[1];
    const usernameCells = await usernameRow.$$('td');
    const cell1 = await usernameCells[0].innerText();
    const cell2 = await usernameCells[1].innerText();

    expect(cell1).toBe('User:');
    expect(cell2).toBe('Bobert the Great');

    const dateRow = tableRows[2];
    const dateCells = await dateRow.$$('td');
    const cell3 = await dateCells[0].innerText();
    const cell4 = await dateCells[1].innerText();

    expect(cell3).toBe('Date posted:');
    expect(cell4).toBe('2020-01-01');

    const issueRow = tableRows[3];
    const issueCells = await issueRow.$$('td');
    const issue = await issueCells[0].innerText();
    expect(issue).toBe('Issue:');

    const descriptionRow = tableRows[4];
    const descriptionCells = await descriptionRow.$$('td');
    const description = await descriptionCells[0].innerText();
    expect(description).toBe('I\'m getting a syntax error on line 600 but my code is only 40 lines long. I\'m not sure what\'s going on. Can someone help me?');

    const upvotesRow = tableRows[5];
    const upvotesCells = await upvotesRow.$$('td');
    const cell5 = await upvotesCells[0].innerText();
    const cell6 = await upvotesCells[1].innerText();

    expect(cell5).toBe('Upvotes:');
    expect(cell6).toBe('-500');
});
