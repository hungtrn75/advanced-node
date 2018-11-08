describe("Test client: http://localhost:3000", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000/");
  });

  it("the header had a correct text", async () => {
    const text = await page.$eval("a.brand-logo", el => el.innerHTML);
    expect(text).toEqual("Blogster");
  });

  it("clicking login starts oauth flow", async () => {
    await page.click(".right a");
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
  });

  it("when signed in, shows logout button", async () => {
    await page.goto("http://localhost:3000/");

    const { Buffer } = require("safe-buffer");
    const Keygrip = require("keygrip");
    const keys = require("../config/keys");

    const keygrip = new Keygrip([keys.cookieKey]);
    const id = "5be38324f2ee8a2770948a7d";
    const sessionObj = {
      passport: {
        user: id
      }
    };
    const sessionString = Buffer.from(JSON.stringify(sessionObj)).toString(
      "base64"
    );
    const sig = keygrip.sign("session=" + sessionString);

    await page.setCookie({ name: "session", value: sessionString });
    await page.setCookie({ name: "session.sig", value: sig });

    await page.goto("http://localhost:3000/");
    await page.waitFor('a[href="/auth/logout"]');
    const result = await page.$eval(
      'a[href="/auth/logout"]',
      el => el.innerHTML
    );
    expect(result).toEqual("Logout");
  });
});
