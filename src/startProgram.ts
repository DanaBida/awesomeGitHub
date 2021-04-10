import { ReadmeServer } from './readme.server';
import { GitHubDataAccess } from './apiRequest';
import { LibraryServer } from './library.server';

export const startProgram = async repoInfo => {
 const gitHubDataAccess = new GitHubDataAccess(repoInfo.token);
 const readmeServer = await new ReadmeServer(repoInfo, gitHubDataAccess);
 const libraryServer = await new LibraryServer(gitHubDataAccess);

 const libraries = readmeServer.getReadmeRefsLibraries();
 const librariesInfo = await libraryServer.getLibrariesInfo(libraries);
 console.log('librariesInfo: ', librariesInfo);
};
