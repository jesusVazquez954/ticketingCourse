import { useState } from 'react';
import axios from 'axios';
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';


const useRequest = ({ url, method, body, onSuccess }) => {

    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null)
            
            const response = await axios[method](url, body);
            setCookies("Set-Cookie",response.data.userJwt);
            
            if (onSuccess) {
                onSuccess();
            }
            
            return response;
        } catch (err) {

            setErrors(
                <div className='alert alert-danger'>
                    <h4>An error has occurred</h4>
                    <ul className='my-0'>
                        {err.response.data.map(err => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    return { doRequest, errors };
};

export default useRequest;