import 'isomorphic-fetch';
import {chromium, Browser, Page} from 'playwright'
import {ArticleData} from "../../src/components/Article";

describe('e2e-playwright', () => {
    const randomId = () => `uuid-${((new Date()).getTime().toString(16))}${Math.floor(1E7 * Math.random()).toString(16)}`;

    let unimportantArticle: ArticleData;
    let importantArticle: ArticleData;

    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await chromium.launch();
        await fetch('http://89.179.122.237:8000/articles/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                title: randomId(),
                text: randomId(),
                important: false
            })
        }).then(response => response.json()).then(article => unimportantArticle = article);
        await fetch('http://89.179.122.237:8000/articles/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                title: randomId(),
                text: randomId(),
                important: true
            })
        }).then(response => response.json()).then(article => importantArticle = article);
    });
    afterAll(async () => {
        await fetch(`http://89.179.122.237:8000/articles/${unimportantArticle.id}`, {
            method: 'DELETE'
        });
        await fetch(`http://89.179.122.237:8000/articles/${importantArticle.id}`, {
            method: 'DELETE'
        });
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    it('unimportant articles display only when important is unchecked', async () => {
        await page.goto('http://localhost:3000');
        await page.uncheck('data-test-id=only_important_input');
        await page.waitForLoadState();
        await expect(page.content()).resolves.toContain(unimportantArticle.title);
        await page.check('data-test-id=only_important_input');
        await page.waitForLoadState();
        await expect(page.content()).resolves.not.toContain(unimportantArticle.title);
    });

    it('important articles always display', async () => {
        await page.goto('http://localhost:3000');
        await page.uncheck('data-test-id=only_important_input');
        await page.waitForLoadState();
        await expect(page.content()).resolves.toContain(importantArticle.title);
        await page.check('data-test-id=only_important_input');
        await page.waitForLoadState();
        await expect(page.content()).resolves.toContain(importantArticle.title);
    });

    it('post an article', async () => {
        const title = randomId();
        const text = randomId();

        await page.goto('http://localhost:3000/post');
        await page.fill('data-test-id=title_input', title);
        await page.fill('data-test-id=text_input', text);
        await page.click('data-test-id=submit_input');
        await page.waitForNavigation();
        await page.waitForLoadState();
        await page.uncheck('data-test-id=only_important_input');
        await page.waitForLoadState();
        await expect(page.content()).resolves.toContain(title);
        await expect(page.content()).resolves.toContain(text);
        await page.check('data-test-id=only_important_input');
        await page.waitForLoadState();
        await expect(page.content()).resolves.not.toContain(title);
        await expect(page.content()).resolves.not.toContain(text);

        await page.uncheck('data-test-id=only_important_input');
        await page.waitForLoadState();
        const id = await page.$(`text=${title}`)
            .then(titleElement => titleElement?.$('xpath=..'))
            .then(articleElement => articleElement?.getAttribute('data-id'));
        await fetch(`http://89.179.122.237:8000/articles/${id}`, {
            method: 'DELETE'
        });
    });

    it('post an important article', async () => {
        const title = randomId();
        const text = randomId();

        await page.goto('http://localhost:3000/post');
        await page.fill('data-test-id=title_input', title);
        await page.fill('data-test-id=text_input', text);
        await page.check('data-test-id=important_input');
        await page.click('data-test-id=submit_input');
        await page.waitForLoadState();
        await page.uncheck('data-test-id=only_important_input');
        await page.waitForLoadState();
        await expect(page.content()).resolves.toContain(title);
        await expect(page.content()).resolves.toContain(text);
        await page.check('data-test-id=only_important_input');
        await page.waitForLoadState();
        await expect(page.content()).resolves.toContain(title);
        await expect(page.content()).resolves.toContain(text);

        await page.uncheck('data-test-id=only_important_input');
        await page.waitForLoadState();
        const id = await page.$(`text=${title}`)
            .then(titleElement => titleElement?.$('xpath=..'))
            .then(articleElement => articleElement?.getAttribute('data-id'));
        await fetch(`http://89.179.122.237:8000/articles/${id}`, {
            method: 'DELETE'
        });
    });

    it('delete an article', async () => {
        const title = randomId();
        const text = randomId();

        await fetch('http://89.179.122.237:8000/articles/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                title: title,
                text: text,
                important: false
            })
        });

        await page.goto('http://localhost:3000');
        await page.uncheck('data-test-id=only_important_input');
        await page.waitForLoadState();
        await page.$(`text=${title}`)
            .then(titleElement => titleElement?.$('xpath=..'))
            .then(articleElement => articleElement?.$('data-test-id=article_delete-button'))
            .then(deleteButtonElement => deleteButtonElement?.click());
        await page.waitForNavigation();
        await page.waitForLoadState();
        await expect(page.content()).resolves.not.toContain(title);
    });
})
