import React, {useContext} from 'react';
import AuthContext from "../helpers/auth-context";

export interface ArticleData {
    id: number;
    title: string;
    text: string;
    important: boolean;
}

export default function Article({article}: {
    article: ArticleData
}) {
    const authContext = useContext(AuthContext);

    const onClick = () => fetch(`http://89.179.122.237:8000/articles/${article.id}`, {
        method: 'DELETE',
        headers: authContext.authHeader()
    }).then(() => {
        window.location.reload();
    }).catch(alert);

    return (
        <article className="article" id={`article-${article.id}`}
                 data-test-id="article" data-id={article.id}>
            <h2 className="article_title" id={`article-${article.id}_title`}>{article.title}</h2>
            <p className="article_text" id={`article-${article.id}_text`}>{article.text}</p>
            <button className="article_delete-button" id={`article-${article.id}_delete-button`}
                    data-test-id="article_delete-button"
                    onClick={onClick}>Delete
            </button>
        </article>
    )
}
