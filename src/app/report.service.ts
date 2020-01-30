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
<<<<<<< HEAD
      'Authorization': `Bearer  ${localStorage.getItem('token')}`
=======
      'Authorization': 'Bearer  OVf8kvEUPF-wTOmfIDRe0Tq8at4vGzNyee5XKVvAarvDDGWEDMQ-nBfGKa_BPq-tx0GLlRTsDH7l-m8JiIO4hTW4IWR9RmeQmRTzbKmN4ysJLcU1XZS8JqE0n4lIv82XVlBLZgRHI5INBAVXFNrBAP4pSEd5F4uZcx3MjHARwGwNN7Eu775dLOzPOJZlQm4CqsZ9-6n5jpTW0w5q1NRUtekEAfQ_oODvfwEsaITafFgrOu5XVr2wcn5sROPARR4FR0erH9YaOkwIZN60LMDGAil2_zgQ52dVcmnJESXFulzjeVRD30dlAD1qItEZbmBd'
>>>>>>> 2251b426e7d69607b10ffff854376e326e2e2a7e
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
