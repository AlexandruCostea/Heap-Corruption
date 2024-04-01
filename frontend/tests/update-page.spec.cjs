// @ts-check

const { test, expect } = require('@playwright/test');

test('update page has title', async ({ page }) => {
    await page.goto('localhost:5173/update/post/1');
    await expect(page).toHaveTitle(/Heap Corruption/);
});

test('update page renders title', async ({ page }) => {
    await page.goto('http://localhost:5173/update/post/1');
    await expect(page.getByText('This is a better version of Stack Overflow')).toBeVisible();
});

test('update page renders back button', async ({ page }) => {
    await page.goto('http://localhost:5173/update/post/1');
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
});

test('update page renders form', async ({ page }) => {
    await page.goto('http://localhost:5173/update/post/1');
    await page.waitForSelector('form', { timeout: 5000 });
    const formElement = await page.$('form');
    expect(formElement).not.toBeNull();
});

test('update page renders submit button', async ({ page }) => {
    await page.goto('http://localhost:5173/update/post/1');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
});

test('clicking on back button takes you to the main page', async ({ page }) => {
    await page.goto('http://localhost:5173/update/post/1');
    await page.click('button:has-text("Back")');

    await expect(page).toHaveURL('http://localhost:5173/posts');
});

test('update page renders form fields with corresponding data inside', async ({ page }) => {
    await page.goto('http://localhost:5173/update/post/1');
    await page.waitForSelector('form', { timeout: 5000 });
    const formElement = await page.$('form');
    if (!formElement) {
        throw new Error('Form not found');
    }
    const formFields = await formElement.$$('input');
    expect(formFields.length).toBe(5);

    //check default values of form fields
    const usernameField = await page.$('input[id="username"]');
    if (!usernameField) {
        throw new Error('Username field not found');
    }
    const usernameFieldValue = await usernameField.getAttribute('value');
    expect(usernameFieldValue).toBe('Bobert the Great');

    const titleField = await page.$('input[id="title"]');
    if (!titleField) {
        throw new Error('Title field not found');
    }
    const titleFieldValue = await titleField.getAttribute('Syntax Error on line 600 but my code is only 40 lines long');

    const descriptionField = await page.$('input[id="description"]');
    if (!descriptionField) {
        throw new Error('Description field not found');
    }
    const descriptionFieldValue = await descriptionField.getAttribute('value');
    expect(descriptionFieldValue).toBe('I\'m getting a syntax error on line 600 but my code is only 40 lines long. I\'m not sure what\'s going on. Can someone help me?');

    const upvotesField = await page.$('input[id="upvotes"]');
    if (!upvotesField) {
        throw new Error('Upvotes field not found');
    }
    const upvotesFieldValue = await upvotesField.getAttribute('-500');

    const dateField = await page.$('input[id="date"]');
    if (!dateField) {
        throw new Error('Date field not found');
    }
    const dateFieldValue = await dateField.getAttribute('2020-01-01');
});

test('clicking on submit button with invalid form data does not update post', async ({ page }) => {
    await page.goto('http://localhost:5173/update/post/1');
    await page.fill('input[id="username"]', 'test');
    await page.fill('input[id="title"]', 'test');
    await page.fill('input[id="description"]', 'test');
    await page.fill('input[id="upvotes"]', 'test');
    await page.fill('input[id="date"]', 'test');
    await page.click('button:has-text("Submit")');
    await page.waitForTimeout(500);
    await page.goto('http://localhost:5173/posts');
    const posts = await page.$$('.tableRow');
    expect(posts.length).toBe(5);
    const post = await page.$('tr:has-text("Syntax Error on line 600 but my code is only 40 lines long")');
    expect(post).not.toBeNull();
});

test('clicking on submit button with valid form data updates post', async ({ page }) => {
    await page.goto('http://localhost:5173/update/post/1');

    await page.fill('input[id="username"]', '');
    await page.fill('input[id="title"]', '');
    await page.fill('input[id="description"]', '');
    await page.fill('input[id="upvotes"]', '');
    await page.fill('input[id="date"]', '');

    await page.fill('input[id="username"]', 'test');
    await page.fill('input[id="title"]', 'test');
    await page.fill('input[id="description"]', 'test');
    await page.fill('input[id="upvotes"]', '1');
    await page.fill('input[id="date"]', '2022-01-01');
    await page.click('button:has-text("Submit")');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL('http://localhost:5173/posts');

    const post = await page.$('tr:has-text("test")');
    expect(post).not.toBeNull();

    await page.click('button:has-text("test")');
    await expect(page).toHaveURL('http://localhost:5173/details/post/1');

    
    const tableElement = await page.$('table');
    if (!tableElement) {
        throw new Error('Table not found');
    }
    const tableRows = await tableElement.$$('tr');
    const titleRow = tableRows[0];
    const titleCells = await titleRow.$$('td');
    const title = await titleCells[0].innerText();
    expect(title).toBe('test');

    const usernameRow = tableRows[1];
    const usernameCells = await usernameRow.$$('td');
    const cell1 = await usernameCells[1].innerText();
    expect(cell1).toBe('test');

    const dateRow = tableRows[2];
    const dateCells = await dateRow.$$('td');
    const cell3 = await dateCells[1].innerText();
    expect(cell3).toBe('2022-01-01');

    const descriptionRow = tableRows[4];
    const descriptionCells = await descriptionRow.$$('td');
    const description = await descriptionCells[0].innerText();
    expect(description).toBe('test');

    const upvotesRow = tableRows[5];
    const upvotesCells = await upvotesRow.$$('td');
    const upvotes = await upvotesCells[1].innerText();
    expect(upvotes).toBe('1');
});
