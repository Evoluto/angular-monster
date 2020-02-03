import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  sent_query: string = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer  ${localStorage.getItem('token')}`
    })
  };

  constructor(private http: HttpClient) { 
  }

  putData(query: Object): void {
    this.sent_query = JSON.stringify(query);
    const url = "https://ignatius.io/api/formaction/putdata";
    this.http.put(url, query, this.httpOptions).subscribe();
  }

  queryReport(query: Object): Observable<Object[]> {
    this.sent_query = JSON.stringify(query);
    const url = "https://ignatius.io/api/report/queryreport";
    return this.http.post<Object[]>(url, query, this.httpOptions);
  }

  postData(query: Object): void {
    this.sent_query = JSON.stringify(query);
    const url = "https://ignatius.io/api/formaction/postdata";
    this.http.post(url, query, this.httpOptions).subscribe();
  }

  getDropdownValues(id: String): Observable<Object[]> {
    const url = "https://ignatius.io/api/field/getdropdownvalues?id=" + id;
    return this.http.get<Object[]>(url, this.httpOptions)
  }

  getToken(username: string, password: string): void {
    const url = 'https://ignatius.io/token';
    let params = new HttpParams();
    params = params.append('grant_type', 'password');
    params = params.append('username', username);
    params = params.append('password', password);
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    this.http.post(url, params, options).toPromise().then(
      response => {
        localStorage.setItem('token', response['access_token']);
      });
  }

}