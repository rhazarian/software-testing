import React, {useState} from 'react';
import Articles from './Articles';
import {ArticleData} from "./Article";

export const articleFilter = (onlyImportant: boolean) => onlyImportant ? (article: ArticleData) => article.important : () => true;

export default function Home() {
    const [onlyImportant, setOnlyImportant] = useState(false);

    return (
        <div>
            <div>
                <label>Only Important</label>
                <input type="checkbox" data-test-id="only_important_input"
                       checked={onlyImportant}
                       onChange={() => setOnlyImportant(!onlyImportant)}
                />
            </div>
            <Articles filter={articleFilter(onlyImportant)}/>
        </div>
    );
}
