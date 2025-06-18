import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeInfo } from './employee';
import { Observable } from 'rxjs';
import { stream } from 'ndjson-rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  protected employeeList: EmployeeInfo[] = [{
    id: '1',
    name: 'John Doe',
    salary: 50000,
  },
  {
    id: '2',
    name: 'Jane Smith',
    salary: 60000,
  },
  {
    id: '3',
    name: 'Alice Johnson',
    salary: 70000,
  },
  {
    id: '4',
    name: 'Bob Brown',
    salary: 80000,
  }];

  getEmployees(): Observable<EmployeeInfo> {
    return stream(this.url);
  }

  getEmployeeById(id: string): Observable<EmployeeInfo>{
    return stream(`${this.url}/${id}`);
  }

  headers = new HttpHeaders()
  .set('Content-Type', 'application/json, application/x-ndjson')
  .set('Accept', 'application/json, application/x-ndjson');

  httpOptions = {
    headers: this.headers,
  };

  createEmployee(name: string, salary: number) {
    console.log(`Creating employee with name: ${name} and salary: ${salary}`);
    this.http.post<EmployeeInfo>(`${this.url}/create`, { name, salary }, this.httpOptions).subscribe({
      next: (employee) => {
        console.log('Employee:', employee);
      }
    });
  }
}
