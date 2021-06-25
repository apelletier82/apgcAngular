import Folder from '../folders/folder';

// eslint-disable-next-line global-require
export const FOLDERS_MOCK = require('../../tests/mock/folders/folders.json');

export const FOLDER_1_MOCK: Folder = FOLDERS_MOCK.find(
  (folder) => folder.folderId === 1,
);

export const FOLDER_2_MOCK: Folder = FOLDERS_MOCK.find(
  (folder) => folder.folderId === 2,
);
