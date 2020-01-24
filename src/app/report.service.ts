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
      'Authorization': 'Bearer  kLDL5WP-3Qmz6tnPZy2tiMy9ch9KkWPhhuQLGrRrPvl2YIHdYdkeRwNG60I7lcwLjw61fxneS_9IbYBm1-uxLO04Q3TY0WWzIGxa9gRh-K4SeYFYZYHNjiGDlm4YK5m_weGgF_wwdORN7uN7E4oIgR55uAZHrRFKsOpXm3wrSxhYdvgQO1276UKXNbd0HK22aefL8lngtZ__NfAl5la1AeAxkUqE0DCLmX0I2qxEdnXtlsFiw3DplPj2BErHWVZxrTrvcpGVsIg6HPaL2kdyIHGoVMVPSwWcS-hTUVH_HZjQa3lY4h9gKLqBh5oNd570'
    })
  }; 

  constructor(private http: HttpClient) { 
  }

  getToken(query: Object): void {
    // parameters = {
    //         { "grant_type", "password" },
    //         { "username", "super_admin@mail.com" },
    //         { "password", "Miami123." }
    //     };

    // this.sent_query = JSON.stringify(query);
    // const url = "https://ignatius.io/token";
    // this.http.post(url, query, this.httpOptions).subscribe();
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
