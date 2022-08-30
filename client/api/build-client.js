import axios from "axios";

const isServer = () => {
    return typeof window === 'undefined';
}

const currentUserUrl = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser';

export default ({ req }) => {
    if (isServer()) {
        return axios.create({
            baseURL: currentUserUrl,
            headers: req.headers
        });
    } else {
        return axios.create({
            baseURL: '/'
        });
    }

};