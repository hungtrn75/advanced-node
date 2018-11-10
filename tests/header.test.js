const mongoose = require("mongoose");
const Page = require("./helpers/page");

let page;

describe("Test header in client: http://localhost:3000", () => {
  beforeEach(async () => {
    page = await Page.build();
    await page.goto("http://localhost:3000/");
  });

  afterEach(async () => {
    page.close();
  });

  afterAll(() => mongoose.disconnect());

  it("the header had a correct text", async () => {
    const text = await page.getContentOf("a.brand-logo");
    expect(text).toEqual("Blogster");
  });

  it("clicking login starts oauth flow", async () => {
    await page.click(".right a");
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
  });

  it("when signed in, shows logout button", async () => {
    await page.login();
    const result = await page.getContentOf('a[href="/auth/logout"]');
    expect(result).toEqual("Logout");
  });
});
