import { Audit } from '../shared/models/audit';

export interface FolderYear {
  folderId: number;
  yearId: number;
  year: number;
  dateFrom: Date;
  dateTo: Date;
  closingDate: Date;
  creation: Audit;
  lastChange?: Audit;
}
