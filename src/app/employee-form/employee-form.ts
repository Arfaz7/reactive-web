import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="employee-creation-form">
        <h2 class="section-heading">Create new employee</h2>
        <form [formGroup]="applyForm" (submit)="submitForm()">
          <label for="name">Name</label>
          <input id="name" type="text" formControlName="name" />

          <label for="salary">Salary</label>
          <input id="salary" type="text" formControlName="salary" />
          <button type="submit" class="primary" [disabled]="applyForm.invalid">Create</button>
        </form>
      </section>
  `,
  styleUrl: `employee-form.css`,
})
export class EmployeeForm {
  employeeService = inject(EmployeeService);
  applyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    salary: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  submitForm() {
      this.employeeService.createEmployee(
        this.applyForm.value.name ?? '',
        Number(this.applyForm.value.salary ?? 0),
      );
  }
}
