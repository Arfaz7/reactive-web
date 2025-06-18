import { Component, input } from '@angular/core';
import { EmployeeInfo } from '../employee';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [RouterModule],
  template: `
    <section class="employeeDetails">
      <h1 class="employeeDetails-header">{{ employee().name }}</h1>
      <a [routerLink]="['/details', employee().id]">Learn More</a>
    </section>
  `,
  styleUrl: `employee.css`,
})
export class Employee {
  employee = input.required<EmployeeInfo>();
}
