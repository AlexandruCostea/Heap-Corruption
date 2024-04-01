// @ts-check

const { test, expect } = require('@playwright/test');

test('main page has title', async ({ page }) => {
  await page.goto('localhost:5173/posts');
  await expect(page).toHaveTitle(/Heap Corruption/);
});

test('main page renders title', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');

  await expect(page.getByText('This is a better version of Stack Overflow')).toBeVisible();
});

test('main page renders create new post button', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');

  await expect(page.getByRole('button', { name: 'Create a new post' })).toBeVisible();
});

test('main page renders table', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');

  await expect(page.getByRole('table')).toBeVisible();
});

test('main page renders all posts', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');

  const posts = await page.$$('.tableRow');
  expect(posts.length).toBe(5);
  const titles = ['Syntax Error on line 600 but my code is only 40 lines long',
                  'I\'m getting a segfault in Python',
                  'I forgot to save a backup of the Facebook database',
                  'How do I create a cryptocurrency?',
                  'Heap memory corruption at 0x0000000000000000 in Javascript'];
  for (let i = 0; i < posts.length; i++) {
    const title = await posts[i].textContent();
    expect(title).toContain(titles[i]);
  }

  //check if each table row has a delete and an update button besides the post button
  const buttons = await page.$$('.tableRow button');
  expect(buttons.length).toBe(15);
});

test('main page renders table pagination row', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');
  await expect(page.$$('tr')).resolves.toHaveLength(6);
});

test('main page renders bar chart title', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');

  await expect(page.getByText('Users with the most upvotes')).toBeVisible();
});

test('main page renders bar chart', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');

  await expect(page.getByRole('img')).toBeVisible();
});

test('clicking on create new post button takes you to the create new post page', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');
  await page.click('button:has-text("Create a new post")');

  await expect(page).toHaveURL('http://localhost:5173/add/post');
});


test('clicking on delete button removes the post', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');

  //set the confirm function to return true
  await page.evaluate(() => {
    window.confirm = () => true;
  });

  const deleteButton = await page.$('.tableRow button:has-text("Delete")');
  if (deleteButton) {
    await deleteButton.click();
    const posts = await page.$$('.tableRow');
    expect(posts.length).toBe(4);
  }
});

test('clicking on update button takes you to the update post page', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');

  const updateButton = await page.$('.tableRow button:has-text("Update")');
  if (updateButton) {
    await updateButton.click();
    await expect(page).toHaveURL('http://localhost:5173/update/post/1');
  }
});

test('clicking on a post takes you to the post details page', async ({ page }) => {
  await page.goto('http://localhost:5173/posts');

  const post = await page.$('.tableRow');
  if (post) {
    await post.click();
    await expect(page).toHaveURL('http://localhost:5173/details/post/1');
  }
});