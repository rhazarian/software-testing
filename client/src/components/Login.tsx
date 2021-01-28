import React, {useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import {useHistory, useLocation} from "react-router-dom";
import AuthContext from "../helpers/auth-context";

interface UserData {
    username: string;
    password: string;
}

interface LocationState {
    from: {
        pathname: string;
    };
}

export default function Login() {
    const {register, errors, handleSubmit} = useForm<UserData>();
    const [loginError, setLoginError] = useState<any>();
    const authContext = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation<LocationState>();

    const onSubmit = (data: UserData) => authContext.login(data.username, data.password)
        .then(
            () => {
                const {from} = location.state || {from: {pathname: "/"}};
                history.push(from);
            },
            error => setLoginError(error)
        ).catch(alert);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <input data-test-id="username_input"
                           name="username" type="text" placeholder="Username" id="username"
                           ref={register({required: true, maxLength: 255})}/>
                    {errors.username && errors.username.type === "required" &&
                    <div className="error" role="alert">This field is required</div>}
                    {errors.username && errors.username.type === "maxLength" &&
                    <div className="error" role="alert">Max length exceeded</div>}
                </div>
                <div>
                    <label>Password</label>
                    <input data-test-id="password_input"
                           name="password" type="password" placeholder="Password" id="password"
                           ref={register({required: true, maxLength: 255})}/>
                    {errors.password && errors.password.type === "required" &&
                    <div className="error" role="alert">This field is required</div>}
                    {errors.password && errors.password.type === "maxLength" &&
                    <div className="error" role="alert">Max length exceeded</div>}
                </div>
                {loginError && <div className="error" role="alert">{`${loginError}`}</div>}
                <input data-test-id="submit_input" type="submit" value="Login"/>
            </form>
        </div>
    );
}
