import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  sent_query: string = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer  zBKp0StA8uWPJHGnS1bQ4EChLvR92iYwGhUB3jrm3mjki0pgGKMbhgBfGS32a1V8mgHVhhzvG6z1od9QZjkP0RfteDRhbGBvWxO3VBpUd7GnehN-VwrXSA4cQTdOP_ADCn1arFLkNS6GSltwTFS5kjYaJ5Bq4X14DX8Qd9XDghEIyXPXKXQxqXb4mxXDHcYbWBT9s9oUPjVaPZtjjyvf0-YQZrP2uE5RXuT14w7LAawLZBAs-om1LgWtRMaR0lD8bqmIWviDSeZongCELmNaH1Zlya1VHzPkxRw1HSzHM7_TA0A9571X1h6785qcm_YL'
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

  getToken(): string {
    
    return "";
  }

}
