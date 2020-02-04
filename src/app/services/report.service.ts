import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  sent_query: string = "";

  constructor(private http: HttpClient) { 
  }

  putData(query: Object): void {
    this.sent_query = JSON.stringify(query);
    const url = "https://ignatius.io/api/formaction/putdata";
    this.http.put(url, query).subscribe();
  }

  queryReport(query: Object): Observable<Object[]> {
    this.sent_query = JSON.stringify(query);
    const url = "https://ignatius.io/api/report/queryreport";
    return this.http.post<Object[]>(url, query);
  }

  postData(query: Object): void {
    this.sent_query = JSON.stringify(query);
    const url = "https://ignatius.io/api/formaction/postdata";
    this.http.post(url, query).subscribe();
  }

  getDropdownValues(id: String): Observable<Object[]> {
    const url = "https://ignatius.io/api/field/getdropdownvalues?id=" + id;
    return this.http.get<Object[]>(url)
  }
}
