export class DoctorModel{
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string = "";
    department: number = 0;
    departmentData: DepartmentsModel = new DepartmentsModel();
}

export class DepartmentsModel{
    value: Number = 0;
    name: string = "";
}