import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private httpClient: HttpClient) { }
    public getUser() {
        var token = localStorage.getItem('token')
        // console.log("test" + JSON.parse(token))
        // return this.httpClient.get(`http://localhost:5000/users/`, { headers: { "x-access-token": localStorage.getItem("token") + "" } });
    }
    public newUser(body: any) {
        console.log(body)
        return this.httpClient.post('http://localhost:5000/users/', body, { headers: { 'Content-Type': "application/json" } });
    }
    public login(email: string, password: string) {
        const encoded = btoa(email.toLowerCase() + ":" + password.toLowerCase());
        return this.httpClient.get('http://127.0.0.1:5000/users/login', { headers: { Authorization: 'Basic ' + encoded } })
    }
    public modifyUser(email: any, id: number) {
        return this.httpClient.put('url', { id, email })
    }
    public deleteUser(id: number) {
        return this.httpClient.delete('url' + id.toString())
    }
}