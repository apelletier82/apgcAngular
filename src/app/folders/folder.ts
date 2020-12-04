import { Address } from '../shared/models/address';
import { Communication } from '../shared/models/communication';
import { Audit } from '../shared/models/audit';
import { CompanyIdentificationNumber } from '../shared/models/company-identification-number';

export interface Folder {
  folderId: number;
  folderName: string;
  logo?: string;
  address: Address;
  phones: Communication[];
  emails: Communication[];
  webSite?: string;
  identificationNumbers: CompanyIdentificationNumber[];
  parentFolder?: Folder;
  creation: Audit;
  lastChange?: Audit;
}
