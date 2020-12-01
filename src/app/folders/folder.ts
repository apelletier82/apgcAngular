import { FolderYear } from './folder-year';
import { Address } from '../shared/models/address';

export interface Folder {
    folderId: number;
    folderName: string;
    logo?: string;
    address: Address;
    years: FolderYear[];
    folders: Folder[];
}
