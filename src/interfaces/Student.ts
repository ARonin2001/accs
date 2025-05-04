export interface Student {
  id: number;
  isDeleted: boolean;
  createdDateTime: Date;
  updatedDateTime: Date;
  deletedDateTime?: Date;
  firstName: string;
  lastName: string;
  secondName?: string;
  phone: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  address: string;
  dateReceipt: string;
  dateTransfer?: string;
  dateDeduction?: string;
  reasonDeduction?: string;
}
