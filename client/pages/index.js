import axios from "axios";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import buildClient from "../api/build-client";
import currentUser from '../handlers/user';

const indexPage = ({ currentUser }) => { 
    return <h1>Landing page</h1>;
};

indexPage.getInitialProps = async context => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    return currentUser;
}

export default indexPage;