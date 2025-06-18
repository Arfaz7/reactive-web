import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../employee.service';
import {EmployeeInfo} from '../employee';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  template: `
    <section>
      <h2>{{ employee?.id }} - {{ employee?.name }}</h2>
      <p>Salary: {{ employee?.salary }}</p>
    </section>
  `,
  styles: ``
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(EmployeeService);
  employee: EmployeeInfo | undefined;

  constructor() {
    const employeeId = this.route.snapshot.params['id'];
    this.housingService.getEmployeeById(employeeId).pipe(takeUntilDestroyed()).subscribe((next) => {
      this.employee = next;
    });   
  };
}
