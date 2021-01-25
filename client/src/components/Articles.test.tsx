import {ArticleData} from "./Article";
import {articleFilter} from "./Home";

describe('Unit tests', () => {
    let id = 0;
    const randomId = () => `uuid-${((new Date()).getTime().toString(16))}${Math.floor(1E7 * Math.random()).toString(16)}`;

    const genArticle = (important: boolean): ArticleData => { return {
        id: ++id,
        title: randomId(),
        text: randomId(),
        important: important
    }}

    const listFilter = (articles: ArticleData[], onlyImportant: boolean) => articles.filter(articleFilter(onlyImportant));

    it('correctly filters empty list', () => {
        expect(listFilter([], true)).toEqual([]);
    });

    it('does not skip any important articles when filtering for important', () => {
        const importantArticles = [genArticle(true), genArticle(true)];
        const articles = importantArticles.concat(genArticle(false), genArticle(false), genArticle(false));

        expect(listFilter(articles, true)).toEqual(importantArticles);
    });

    it('does not skip any articles when filtering for any', () => {
        const importantArticles = [genArticle(true), genArticle(true)];
        const articles = importantArticles.concat(genArticle(false), genArticle(false), genArticle(false));

        expect(listFilter(articles, false)).toEqual(articles);
    });
});
