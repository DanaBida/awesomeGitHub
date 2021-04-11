import { LibraryInfo, Library, AdditionalInfo } from './types';
import { GitHubDataAccess } from './apiRequest';
import { config } from '../config';
import moment from 'moment';
import {
 mockLibrariesGeneralInfo,
 mockContributors,
 mockIssues,
 mockPullRequests,
 mockReleases,
} from '../tests/mockData';

const { githubApiBaseUrl } = config;

export class LibraryService {
 private gitHubDataAccess: GitHubDataAccess;

 constructor(gitHubDataAccess: GitHubDataAccess) {
  this.gitHubDataAccess = gitHubDataAccess;
 }

 getLibrariesInfo = async (libraries: Library[]): Promise<LibraryInfo[]> => {
  // const librariesGeneralInfo = await this.getLibrariesGeneralInfo(libraries);
  const librariesGeneralInfo = mockLibrariesGeneralInfo;
  const librariesAdditionalInfo: AdditionalInfo = await this.getAdditionalInfo(
   librariesGeneralInfo,
  );
  const { issues, pullRequests, releases, contributors } = librariesAdditionalInfo;
  return librariesGeneralInfo.map((libraryGeneralInfo, index) => {
   const { stargazers_count, license, forks } = libraryGeneralInfo;
   return {
    library: libraries[index],
    numberOfStars: stargazers_count,
    dateOfLastIssue: this.getDateOfLastAdditionalInfo(issues, index),
    dateOfLastPullRequest: this.getDateOfLastAdditionalInfo(pullRequests, index),
    dateOfLastRelease: this.getDateOfLastAdditionalInfo(releases, index),
    numberOfClosedPullRequestsLastYear: this.getClosedAtLastYearPullRequests(pullRequests[index]),
    numberOfContributors: contributors[index].length,
    numberOfOpenedIssuesLastSixMonths: this.getOpenedIssuesLastSixMonths(issues[index]),
    licenseType: license ? license.spdx_id : 'NONE',
    numberOfForks: forks,
   };
  });
 };

 private getOpenedIssuesLastSixMonths = issues => {
  const now = moment();
  const startOfYear = moment().subtract(6, 'months');

  return issues.filter(
   ({ state, created_at }) =>
    state === 'open' &&
    moment(created_at).isSameOrAfter(startOfYear, 'year') &&
    moment(created_at).isSameOrBefore(now, 'year'),
  ).length;
 };

 private getClosedAtLastYearPullRequests = pullRequests => {
  const now = moment();
  const startOfYear = moment().subtract(1, 'year');

  return pullRequests.filter(
   ({ created_at }) =>
    moment(created_at).isSameOrAfter(startOfYear, 'year') &&
    moment(created_at).isSameOrBefore(now, 'year'),
  ).length;
 };

 private getDateOfLastAdditionalInfo = (arr, indexOfLibrary) => {
  if (!arr.length) return 'NONE';
  const libraryAdditionalInfos = arr[indexOfLibrary];
  const libraryAdditionalInfo = libraryAdditionalInfos[0];
  return libraryAdditionalInfo ? libraryAdditionalInfo.created_at : 'NONE';
 };

 private getLibrariesGeneralInfo = async (libraries: Library[]): Promise<any[]> => {
  const librariesInfoPromises = [];
  try {
   libraries.forEach(library => {
    const { owner, name } = library;
    const reqUrl = `${githubApiBaseUrl}/repos/${owner}/${name}`;
    librariesInfoPromises.push(this.gitHubDataAccess.apiRequest(reqUrl));
   });
   return await Promise.all(librariesInfoPromises);
  } catch (err) {
   console.error(err);
  }
 };

 private getLibraryPromiseOfType = (libraryGeneralInfo, type) => {
  const reqUrl = `${githubApiBaseUrl}/repos/${libraryGeneralInfo.owner.login}/${libraryGeneralInfo.name}`;
  return this.gitHubDataAccess.apiRequest(`${reqUrl}/${type}?direction=desc`);
 };

 private getAdditionalInfo = async (librariesGeneralInfo): Promise<AdditionalInfo> => {
  try {
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

   return {
    issues: mockIssues,
    pullRequests: mockPullRequests,
    releases: mockReleases,
    contributors: mockContributors,
   };
  } catch (err) {
   console.error(err);
  }
 };
}
