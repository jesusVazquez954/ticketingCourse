import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const signUp = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { doRequest, errors } = useRequest({
        url: "/api/users/signup",
        method: "post",
        body: { username, email, password },
        onSuccess: () => Router.push("/")
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up :D</h1>
            <div>
                <label>Username</label>
                <input value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="form-control">
                </input>
            </div>
            <div>
                <label>Email</label>
                <input value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control">
                </input>
            </div>
            <div>
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    className="form-control">
                </input>
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );

};

export default signUp;