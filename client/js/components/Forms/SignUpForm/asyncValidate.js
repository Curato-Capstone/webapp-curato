import request from 'superagent-bluebird-promise';
const baseURL = 'http://ec2-54-186-80-121.us-west-2.compute.amazonaws.com:8000';

const asyncValidate = (values) => {
    return request
        .get(`${baseURL}/user/email`)
        .query({ email: values.get('email') })
        .then((res) => {
            if (res.body.exists) {
                return { email: 'That email already exists!' };
            }
        });
};

export default asyncValidate;
