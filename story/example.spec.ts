import { test, expect } from "@playwright/test";
import { setTimeout } from "node:timers/promises";

test("1", async ({ page }) => {
  test.setTimeout(100000);
  await page.goto("https://bot.storymapper.io/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/StoryBot_app/);

  const locTemp =
    '//*[@id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]';
  await page.locator(locTemp).click();

  await page.waitForTimeout(500);

  const str =
    "Budgeting/Finance App\nWe want to create a new feature where users can set monthly spending limits.The app should let them choose categories like <Groceries> or <Entertainment>\nand set a dollar limit for each. When they get close to the limit, they should get a notification. If they go over, it should warn them with a message. Also, we'll need to display a summary showing how much they've spent so far in each category. ";

  //await page.getByPlaceholder('Input here').fill(str);
  await page.locator('//*[@id="user_text"]').fill(str);
  await page.waitForTimeout(1000);

  await page.getByRole("button", { name: "transform" }).click({ force: true });
  await page.locator("#transform_id").click();
  let bannerIsClose = false;
  for (let index = 0; index < 40n; index++) {
    var scope = await page.locator("#estimate");
    try {
      await expect(scope).toContainText("0");
      console.log("processed:" + index);
      //console.log(scope.innerText.toString());
    } catch (error) {
      console.log("end:" + index);
      //console.log(index);
      break;
    }

    if (!bannerIsClose) {
      let banner = await page.locator(
        "#RequestIntegrationModal_id > div > div > div.modal-header > button"
      );
      if ((await banner.count()) > 0) {
        await banner.click();
        console.log("close banner");
        bannerIsClose = true;
      }
    }

    await page.waitForTimeout(1000);
  }

  var scope = await page.locator("#estimate");
  //console.log(scope);
  //console.log(scope.textContent.toString());

  //await sleep(5000);
  //await page.screenshot({ path: 'screenshot.png', fullPage: true });
  scope = await page.locator("#estimate");
  //console.log(scope);

  await expect.soft(scope).toContainText("6");

  //const myTimeout = setTimeout(myGreeting, 5000);
  //await expect(page.getByText('Feature: ', )).toBeVisible();
  //await page.getByText('Allow all', )[0].click();
  //if

  //await page.getByText('Allow all').dispatchEvent('click');
  //await page.getByRole('a', {})
  //await page.click('text= Allow all');
});

module.exports = { helloWorld };
async function helloWorld(page) {
  await page.goto("https://bot.storymapper.io/");

  await expect(page).toHaveTitle(/StoryBot_app/);

  const locTemp =
    '//*[@id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]';
  await page.locator(locTemp).click();

  await page.waitForTimeout(1000);

  const str =
    "Budgeting/Finance App\nWe want to create a new feature where users can set monthly spending limits.The app should let them choose categories like <Groceries> or <Entertainment>\nand set a dollar limit for each. When they get close to the limit, they should get a notification. If they go over, it should warn them with a message. Also, we'll need to display a summary showing how much they've spent so far in each category. ";

  await page.locator('//*[@id="user_text"]').fill(str);
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "transform" }).click({ force: true });
  await page.locator("#transform_id").click();
  let bannerIsClose = false;
  for (let index = 0; index < 18; index++) {
    var scope = await page.locator("#estimate");

    try {
      await expect(scope).toContainText("0");
      console.log("end:" + index);
      //console.log(scope.innerText.toString());
    } catch (error) {
      console.log("test:" + index);
      //console.log(index);
      break;
    }

    if (!bannerIsClose) {
      let banner = await page.locator(
        "#RequestIntegrationModal_id > div > div > div.modal-header > button"
      );
      if (banner.count() > 0) {
        await banner.click();
        bannerIsClose = true;
      }
    }

    //'#RequestIntegrationModal_id > div > div > div.modal-header > button'
    await page.waitForTimeout(1000);
  }

  var scope = await page.locator("#estimate");

  scope = await page.locator("#estimate");
  //console.log(scope);

  await expect.soft(scope).toContainText("6");
}
