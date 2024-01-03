import { test, expect } from '@playwright/test';
import { routes, todo } from '../config';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Todo Tests', () => {
  test.beforeAll(async ({ page }) => {
    //go to todos
    await page.goto(routes.urls.dashboard);
    await page.getByRole('link', { name: 'Todos' }).click();

    //create Todo
    await page.getByLabel('Title').click();
    await page.getByLabel('Title').fill(todo.todoTitle);
    await page.getByLabel('Description').click();
    await page.getByLabel('Description').fill(todo.todoDescription);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByLabel('Title')).toBeEmpty();
    await expect(page.getByLabel('Description')).toBeEmpty();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(routes.urls.dashboard);
    await page.getByRole('link', { name: 'Todos' }).click();
  });

  test('My Todos', async ({ page }) => {
    await page.getByRole('link', { name: 'My Todos' }).click();
    await expect(page.locator('h3')).toContainText('todo1');
    await expect(page.getByRole('main')).toContainText('todo description 1');
  });

  test('List Todos', async ({ page }) => {
    await page.getByRole('link', { name: 'All Todos' }).click();
    await expect(page.locator('h3')).toContainText('todo1');
    await expect(page.getByRole('main')).toContainText('todo description 1');
  });

  test('Edit Todo', async ({ page }) => {
    await page.getByRole('link', { name: 'My Todos' }).click();
    await page.getByRole('link', { name: 'Edit' }).click();
    await page.getByLabel('Title').click();
    await page.getByLabel('Title').fill('todo1 EDIT');
    await page.getByLabel('Description').click();
    await page.getByLabel('Description').fill('todo description 1 EDIT');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('h3')).toContainText('todo1 EDIT');
    await expect(page.getByRole('main')).toContainText('todo description 1 EDIT');
  });

  test('Delete Todo', async ({ page }) => {
    await page.getByRole('link', { name: 'My Todos' }).click();
    await page.getByRole('link', { name: 'My Todos' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByRole('main')).toContainText('No Todos Found');
  });
});
