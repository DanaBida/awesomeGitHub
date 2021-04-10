import { LibraryInfo, Library, AdditionalInfo } from './types';
import { GitHubDataAccess } from './apiRequest';
import { config } from '../config';

const { githubApiBaseUrl } = config;

export class LibraryServer {
 private gitHubDataAccess: GitHubDataAccess;

 constructor(gitHubDataAccess: GitHubDataAccess) {
  this.gitHubDataAccess = gitHubDataAccess;
 }

 getLibrariesInfo = async (libraries: Library[]): Promise<LibraryInfo[]> => {
  const librariesGeneralInfo = await this.getLibrariesGeneralInfo(libraries);
  const librariesAdditionalInfo: AdditionalInfo = await this.getAdditionalInfo(
   librariesGeneralInfo,
  );
  const { issues, pullRequests, releases, contributors } = librariesAdditionalInfo;
  return librariesGeneralInfo.map((libraryGeneralInfo, index) => {
   const { stargazers_count, license, forks } = libraryGeneralInfo;
   return {
    numberOfStars: stargazers_count,
    dateOfLastIssue: this.getDateOfLastAdditionalInfo(issues, index), //TODO: createdAt of issues[length-1]
    dateOfLastPullRequest: this.getDateOfLastAdditionalInfo(pullRequests, index), //TODO: createdAt of pulls[length-1]
    dateOfLastRelease: this.getDateOfLastAdditionalInfo(releases, index), //TODO: createdAt of releases[length-1]
    numberOfClosedPullRequestsLastYear: 1, //TODO: filter on closed_at == lastYear
    numberOfContributors: contributors[index].length, //TODO: contributors.length
    numberOfOpenedIssuesLastSixMonths: 1, //TODO: state of issue is open and createdAt = last 6 month
    licenseType: license ? license.spdx_id : 'NONE',
    numberOfForks: forks,
   };
  });
 };

 private getDateOfLastAdditionalInfo = (arr, indexOfLibrary) => {
  if (!arr.length) return 'NONE';
  const libraryAdditionalInfos = arr[indexOfLibrary];
  const libraryAdditionalInfo = libraryAdditionalInfos[libraryAdditionalInfos.length - 1];
  return libraryAdditionalInfo ? libraryAdditionalInfo.createdAt : 'NONE';
 };

 private getLibrariesGeneralInfo = async (libraries: Library[]): Promise<any[]> => {
  const librariesInfoPromises = [];
  libraries.forEach(library => {
   const { owner, name } = library;
   const reqUrl = `${githubApiBaseUrl}/repos/${owner}/${name}`;
   librariesInfoPromises.push(this.gitHubDataAccess.apiRequest(reqUrl));
  });
  return await Promise.all(librariesInfoPromises);
 };

 private getLibraryPromiseOfType = (libraryGeneralInfo, type) => {
  const reqUrl = `${githubApiBaseUrl}/repos/${libraryGeneralInfo.owner.login}/${libraryGeneralInfo.name}`;
  return this.gitHubDataAccess.apiRequest(`${reqUrl}/${type}`);
 };

 private getAdditionalInfo = async (librariesGeneralInfo): Promise<AdditionalInfo> => {
  const libraryIssuesPromises = [];
  const libraryPullRequestsPromises = [];
  const libraryReleasesPromises = [];
  const libraryContributorsPromises = [];
  librariesGeneralInfo.forEach(libraryGeneralInfo => {
   libraryIssuesPromises.push(this.getLibraryPromiseOfType(libraryGeneralInfo, 'issues'));
   libraryPullRequestsPromises.push(this.getLibraryPromiseOfType(libraryGeneralInfo, 'pulls'));
   libraryReleasesPromises.push(this.getLibraryPromiseOfType(libraryGeneralInfo, 'releases'));
   libraryContributorsPromises.push(
    this.getLibraryPromiseOfType(libraryGeneralInfo, 'contributors'),
   );
  });
  const issues = await Promise.all(libraryIssuesPromises);
  const pullRequests = await Promise.all(libraryPullRequestsPromises);
  const releases = await Promise.all(libraryReleasesPromises);
  const contributors = await Promise.all(libraryContributorsPromises);
  return { issues, pullRequests, releases, contributors };
 };
}
