import { ReadmeService } from './readme.service';
import { GitHubDataAccess } from './apiRequest';
import { LibraryService } from './library.service';
import { ScoreCalculatorServer } from './scoreCalculator.service';

export const startProgram = async repoInfo => {
 const gitHubDataAccess = new GitHubDataAccess(repoInfo.token);
 const readmeServer = await new ReadmeService(repoInfo, gitHubDataAccess);
 const libraryServer = new LibraryService(gitHubDataAccess);
 const libraries = readmeServer.getReadmeRefsLibraries();
 const librariesInfo = await libraryServer.getLibrariesInfo(libraries);
 const calculatorService = new ScoreCalculatorServer(librariesInfo);
 const printObjOfLibraries = calculatorService.getPrintObjectsOfLibraries();
 console.log(printObjOfLibraries);
};
