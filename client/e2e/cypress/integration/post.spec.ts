/// <reference types="cypress"/>

import {ArticleData} from "../../../src/components/Article";

describe('e2e-cypress', () => {
    const randomId = () => `uuid-${Cypress._.random(0, 1e6)}`;

    let unimportantArticle: ArticleData;
    let importantArticle: ArticleData;

    Cypress.Commands.overwrite('request', (orig, method, url, body) => {
        return orig({
            method: method,
            url: url,
            body: body,
            headers: {
                'Authorization': `basic ${btoa(`system:admin`)}`
            }
        });
    });

    before(() => {
        cy.request('POST', 'http://89.179.122.237:8000/articles/', {
            title: randomId(),
            text: randomId(),
            important: false
        }).then(response => unimportantArticle = response.body);
        cy.request('POST', 'http://89.179.122.237:8000/articles/', {
            title: randomId(),
            text: randomId(),
            important: true
        }).then(response => importantArticle = response.body);
    });

    after(() => {
        cy.request('DELETE', `http://89.179.122.237:8000/articles/${unimportantArticle.id}`);
        cy.request('DELETE', `http://89.179.122.237:8000/articles/${importantArticle.id}`);
    });

    beforeEach(() => {
        cy.visit('http://89.179.122.237:3000/');
        window.localStorage.setItem('REACT_USER', JSON.stringify({
            authdata: window.btoa('system:admin'),
            id: 0
        }));
        cy.reload();
    });

    it('unimportant articles display only when important is unchecked', () => {
        cy.get('[data-test-id=only_important_input]').uncheck();
        cy.contains(unimportantArticle.title);
        cy.get('[data-test-id=only_important_input]').check();
        cy.contains(unimportantArticle.title).should('not.exist');
    });

    it('important articles always display', () => {
        cy.get('[data-test-id=only_important_input]').uncheck();
        cy.contains(importantArticle.title);
        cy.get('[data-test-id=only_important_input]').check();
        cy.contains(importantArticle.title);
    });

    it('post an article', () => {
        const title = randomId();
        const text = randomId();

        cy.visit('http://89.179.122.237:3000/post');
        cy.get('[data-test-id=title_input]').type(title);
        cy.get('[data-test-id=text_input]').type(text);
        cy.get('[data-test-id=submit_input]').click();
        cy.location('pathname').should('eq', '/');
        cy.get('[data-test-id=only_important_input]').uncheck();
        cy.contains(title);
        cy.contains(text);
        cy.get('[data-test-id=only_important_input]').check();
        cy.contains(title).should('not.exist');
        cy.contains(text).should('not.exist');

        cy.get('[data-test-id=only_important_input]').uncheck();
        cy.contains(title).parent('article').then((article) => {
            cy.request('DELETE', `http://89.179.122.237:8000/articles/${article.data('id')}`);
        });
    });

    it('post an important article', () => {
        const title = randomId();
        const text = randomId();

        cy.visit('http://89.179.122.237:3000/post');
        cy.get('[data-test-id=title_input]').type(title);
        cy.get('[data-test-id=text_input]').type(text);
        cy.get('[data-test-id=important_input]').check();
        cy.get('[data-test-id=submit_input]').click();
        cy.location('pathname').should('eq', '/');
        cy.get('[data-test-id=only_important_input]').uncheck();
        cy.contains(title);
        cy.contains(text);
        cy.get('[data-test-id=only_important_input]').check();
        cy.contains(title);
        cy.contains(text);

        cy.get('[data-test-id=only_important_input]').check();
        cy.contains(title).parent('[data-test-id=article]').then((article) => {
            cy.request('DELETE', `http://89.179.122.237:8000/articles/${article.data('id')}`);
        });
    });

    it('delete an article', () => {
        const title = randomId();
        const text = randomId();

        cy.request('POST', 'http://89.179.122.237:8000/articles/', {
            title: title,
            text: text,
            important: false
        });

        cy.visit('http://89.179.122.237:3000');
        cy.get('[data-test-id=only_important_input]').uncheck();
        cy.contains(title).parent('[data-test-id=article]').children('[data-test-id=article_delete-button]').click();
        cy.contains(title).should('not.exist');
    });
});
