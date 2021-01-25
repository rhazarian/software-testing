import React, {useEffect, useState} from 'react';
import Article, {ArticleData} from './Article';

export default function Articles({filter}: {
    filter?: (article: ArticleData) => boolean
}) {
    const [articles, setArticles] = useState<ArticleData[]>([]);

    useEffect(() => {
        fetch('http://89.179.122.237:8000/articles/', {
            method: 'GET'
        }).then(res => res.json()).then(articles => setArticles(articles)).catch(alert)
    }, [])

    return (
        <div>
            {articles.filter(filter || (() => true)).map(article =>
                <Article key={article.id} article={article}/>
            )}
        </div>
    )
}
