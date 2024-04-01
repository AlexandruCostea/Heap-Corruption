// @ts-check

const { test, expect } = require('@playwright/test');

test('add page has title', async ({ page }) => {
  await page.goto('localhost:5173/add/post');
  await expect(page).toHaveTitle(/Heap Corruption/);
});

test('add page renders title', async ({ page }) => {
    await page.goto('http://localhost:5173/add/post');
    
    await expect(page.getByText('This is a better version of Stack Overflow')).toBeVisible();
});

test('add page renders back button', async ({ page }) => {
    await page.goto('http://localhost:5173/add/post');
    
    await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();
});

test('add page renders form', async ({ page }) => {
    await page.goto('http://localhost:5173/add/post');
    await page.waitForSelector('form', { timeout: 5000 });
    const formElement = await page.$('form');
    expect(formElement).not.toBeNull();
});

test('add page renders form fields', async ({ page }) => {
    await page.goto('http://localhost:5173/add/post');
    await page.waitForSelector('form', { timeout: 5000 });
    const formElement = await page.$('form');
    if (!formElement) {
        throw new Error('Form not found');
    }
    const formFields = await formElement.$$('input');
    expect(formFields.length).toBe(5);
});

test('add page renders submit button', async ({ page }) => {
    await page.goto('http://localhost:5173/add/post');
    
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
});

test('clicking on back button takes you to the main page', async ({ page }) => {
    await page.goto('http://localhost:5173/add/post');
    await page.click('button:has-text("Back")');
    
    await expect(page).toHaveURL('http://localhost:5173/posts');
});

test('clicking on submit button with invalid form data does not add post', async ({ page }) => {
    await page.goto('http://localhost:5173/add/post');
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
});

test('clicking on submit button with valid form data adds post', async ({ page }) => {
    await page.goto('http://localhost:5173/add/post');
    await page.fill('input[id="username"]', 'test');
    await page.fill('input[id="title"]', 'test');
    await page.fill('input[id="description"]', 'test');
    await page.fill('input[id="upvotes"]', '1');
    await page.fill('input[id="date"]', '2022-01-01');
    await page.click('button:has-text("Submit")');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL('http://localhost:5173/posts');
    const posts = await page.$$('.tableRow');
    expect(posts.length).toBe(6);

    //check if the new post got a correct id
    await page.click('button:has-text("test")');
    await expect(page).toHaveURL('http://localhost:5173/details/post/6');
});
