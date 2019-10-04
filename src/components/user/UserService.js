import axios from 'axios';

const apiUrl = "http://localhost:4545/api/user";

export default class UserService{

    static getAllUsers(){
        return axios.get(apiUrl);
    }

    static addUser(data){
        return axios.post(apiUrl, data);
    }

    static updateUser(data){
        return axios.put(apiUrl, data);
    }

    static delete(id) {
        return axios.delete(`${apiUrl}/${id}`);
    }
}