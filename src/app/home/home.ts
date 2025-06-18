import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Employee } from '../employee/employee';
import { EmployeeInfo } from '../employee';
import { EmployeeService } from '../employee.service';
import { EmployeeForm } from '../employee-form/employee-form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Employee, EmployeeForm],
  template: `
    <section class="home">
      <form class="search-form">
        <input type="text" placeholder="Search by name" (keyup)="filterResults(filter.value)" #filter/>
      </form>
      <br />
      <app-employee-form/>
    </section>
    <section class="results">
      <app-employee *ngFor="let employee of filteredEmployeeList" [employee]="employee"/>
    </section>
  `,
  styleUrl: './home.css',
})
export class Home {
  employeeList: EmployeeInfo[] = [];
  employeeService= inject(EmployeeService);
  filteredEmployeeList: EmployeeInfo[] = [];

  
  constructor() {
    this.employeeService.getEmployees()
    .pipe(takeUntilDestroyed())  
    .subscribe(next => {
        this.employeeList.push(next);
        this.filteredEmployeeList.push(next);
      }
    );
  }

  filterResults(filter: string) {
    if(!filter) {
      this.filteredEmployeeList = this.employeeList;
      return;
    }
    
    this.filteredEmployeeList = this.employeeList.filter(employee => employee.name.toLowerCase().includes(filter.toLowerCase()));
  }
}
