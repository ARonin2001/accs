export interface BaseEntity {
  isDeleted: boolean;
  createdDateTime: Date;
  updatedDateTime: Date;
  deletedDateTime?: Date;
}
