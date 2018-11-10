const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000/");
});

afterEach(async () => {
  await page.close();
});

describe("when logged in", () => {
  beforeEach(async () => {
    await page.login("http://localhost:3000/blogs");
    await page.click("a.btn-floating");
  });

  it("when logged in, can see create form", async () => {
    const label = await page.getContentOf("form label");

    expect(label).toEqual("Blog Title");
  });

  describe("and using invalid inputs", () => {
    beforeEach(async () => {
      await page.click("form button");
    });

    test("the form shows an error message", async () => {
      const titleError = await page.getContentOf(".title .red-text");
      const contentError = await page.getContentOf(".content .red-text");

      expect(titleError).toEqual("You must provide a value");
      expect(contentError).toEqual("You must provide a value");
    });
  });

  describe("and using valid inputs", () => {
    beforeEach(async () => {
      await page.type(".title input", "My title test");
      await page.type(".content input", "My content test");
      await page.click("form button");
    });

    test("submiting takes use to review   screen", async () => {
      const text = await page.getContentOf("h5");

      expect(text).toEqual("Please confirm your entries");
    });

    test("submiting then saving adds blog to index page", async () => {
      await page.click("button.green");
      await page.waitFor(".card");

      const title = await page.getContentOf(".card-content .card-title");
      const content = await page.getContentOf(".card-content p");

      expect(title).toEqual("My title test");
      expect(content).toEqual("My content test");
    });
  });
});

describe("User is not logged in", async () => {
  const actions = [
    {
      method: "get",
      path: "/api/blogs"
    },
    {
      method: "post",
      path: "/api/blogs",
      data: {
        title: "T",
        content: "C"
      }
    }
  ];

  it("Blog related actions are prohibited", async () => {
    const results = await page.execRequest(actions);

    results.map(result => {
      expect(result).toEqual({ error: "You must log in!" });
    });
  });
});
