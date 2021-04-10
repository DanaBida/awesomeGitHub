import { ReadmeService } from './readme.service';
import { GitHubDataAccess } from './apiRequest';
import { LibraryService } from './library.service';
import { ScoreCalculatorServer } from './scoreCalculator.service';

export const startProgram = async repoInfo => {
 const gitHubDataAccess = new GitHubDataAccess(repoInfo.token);
 const readmeServer = await new ReadmeService(repoInfo, gitHubDataAccess);
 const libraryServer = new LibraryService(gitHubDataAccess);
 //  const libraries = readmeServer.getReadmeRefsLibraries();
 const libraries = [
  {
   description: 'not implemented',
   link: 'https://github.com/ziadoz/awesome-php',
   name: 'awesome-php',
   owner: 'ziadoz',
  },
  {
   description: 'not implemented',
   link: 'https://github.com/sindresorhus/awesome',
   name: 'awesome',
   owner: 'sindresorhus',
  },
 ];
 console.log('libraries: ', libraries);
 const librariesInfo = await libraryServer.getLibrariesInfo(libraries);
 console.log('librariesInfo: ', librariesInfo);
 const calculatorService = new ScoreCalculatorServer(librariesInfo);
 const scoresOfLibraries = calculatorService.getPrintObjectsOfLibraries();
 console.log('scoresOfLibraries: ', scoresOfLibraries);
};
