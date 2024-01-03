import { test as setup, expect } from '@playwright/test';

import { routes, user } from '../config';

const userFile = routes.filePath.userFile;

setup('authenticate as user', async ({ page, request }) => {
  await page.goto(routes.urls.base);
  await page.getByRole('link', { name: 'Login' }).click();

  await page.waitForURL(routes.segments.login);
  await page.getByPlaceholder('Email').fill(user.email);
  await page.getByRole('button', { name: 'Login with Email' }).click();

  await page.waitForURL(routes.segments.authConfirm);
  await expect(page.getByRole('heading')).toContainText('Request Successfully Submitted');

  const emails = await request.get(routes.api.emails);
  const res = JSON.parse(await emails.text());
  const lastEmail = res.slice(-1)[0];
  const redirectUrl = lastEmail.text;

  await page.goto(redirectUrl);
  await page.waitForURL(routes.segments.dash);

  // End of authentication steps.
  await page.context().storageState({ path: userFile });
});
