import { Employee } from './Employee.class';
import { EmployeeService } from './Employee.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private changeDetector: ChangeDetectorRef) {
    this.employee = new Employee();
  }

  employee: Employee;
  employeeList: Employee[] = [];

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public saveEmployee() {
    this.employeeService.saveEmployee(this.employee).subscribe(() => {
      $('.modal').modal('hide');
      this.getAllEmployees();
    });
  }

  public getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((res: any) => {
      this.employeeList = res;
    });
  }

  public getEmployee() {
    this.employeeService.getEmployee(this.employee.id).subscribe((res: any) => {
      this.employee = res;
    });
  }

  public updateEmployee() {
    this.employeeService.updateEmployee(this.employee).subscribe(() => {
      this.getAllEmployees();
    });
  }

  public deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(() => {
      this.getAllEmployees();
    });
  }

  public add() {
    this.employee = new Employee();
    $('#addEditEmployee').modal();
  }

  public edit(emp) {
    this.employee = emp;
    this.changeDetector.detectChanges();
    $('#addEditEmployee').modal();
  }

  public delete(emp) {
    this.employee = emp;
    const isDelete = confirm('Are you sure you want to delete?')
    if (isDelete) {
      this.deleteEmployee();
    }
  }

}
