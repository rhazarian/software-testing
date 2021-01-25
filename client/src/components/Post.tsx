import React from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {ArticleData} from "./Article";

export default function Post() {
    const {register, errors, handleSubmit} = useForm<ArticleData>();
    const history = useHistory();
    const onSubmit = (data: ArticleData) => fetch('http://89.179.122.237:8000/articles/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }).then(() => {
        history.push('/');
    }).catch(alert);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title</label>
                    <input data-test-id="title_input"
                           name="title" type="text" placeholder="Article Title" id="title"
                           ref={register({required: true, maxLength: 255})}/>
                    {errors.title && errors.title.type === "required" &&
                    <div className="error" role="alert">This field is required</div>}
                    {errors.title && errors.title.type === "maxLength" &&
                    <div className="error" role="alert">Max line length exceeded</div>}
                </div>
                <div>
                    <label>Text</label>
                    <input data-test-id="text_input"
                           name="text" type="text" placeholder="Article Text" id="text"
                           ref={register({required: true})}/>
                    {errors.text && errors.text.type === "required" &&
                    <div className="error" role="alert">This field is required</div>}
                </div>
                <div>
                    <label>Important</label>
                    <input data-test-id="important_input"
                           name="important" type="checkbox" id="important"
                           ref={register()}/>
                </div>
                <input data-test-id="submit_input" type="submit" value="Post"/>
            </form>
        </div>
    );
}
