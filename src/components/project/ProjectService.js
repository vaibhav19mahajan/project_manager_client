import axios from 'axios';

const apiUrl = "http://localhost:4545/api/project";

export default class ProjectService{

    static getAll(){
        return axios.get(apiUrl);
    }

    static add(data){
        return axios.post(apiUrl, data);
    }

    static update(data){
        return axios.put(apiUrl, data);
    }

    static delete(id) {
        return axios.delete(`${apiUrl}/${id}`);
    }
}