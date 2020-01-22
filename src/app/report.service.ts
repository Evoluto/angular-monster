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
      'Authorization': 'Bearer  6Csvhk6QRwm3aVhL_jZoaCwl-UGhxtWZVSM0iXWr0ugqJ4QlAGMydEoVQhYeodCgGbZcM-ROTck7Y993eStVir1AiKYBJ0rnROKXhZmb8AHu-a0NQyXBuUh9rRqxGVFwcoisfTvotNEHz1jW_wcUed6r-IcPlNgKEJkQUIOQPOnRgp1gUPqTsdMoHvEFdOhlef5Nn-Zou7iRnVVRfNgvFM6TKMtj3pBt1Jsg2ugW5Fsbkd9bDoWOJ3qQOuGXVTjJQV6EIO-MO1jwBPTkhOcnMvsg76bsgf_LFoKkD_fZbgLPan8__P61QTAg8GQgal3Y'
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

}
