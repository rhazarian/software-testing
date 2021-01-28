import React, {useContext, useEffect, useState} from 'react';
import Article, {ArticleData} from './Article';
import AuthContext from "../helpers/auth-context";

export default function Articles({filter}: {
    filter?: (article: ArticleData) => boolean
}) {
    const [articles, setArticles] = useState<ArticleData[]>([]);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        fetch('http://89.179.122.237:8000/articles/', {
            method: 'GET',
            headers: authContext.authHeader()
        }).then(res => res.json()).then(articles => setArticles(articles)).catch(alert)
    }, [authContext])

    return (
        <div>
            {articles.filter(filter || (() => true)).map(article =>
                <Article key={article.id} article={article}/>
            )}
        </div>
    )
}
