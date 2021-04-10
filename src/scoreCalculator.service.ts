import { LibraryInfo, LibrariesArraysObj, LibraryInfoFields, LibraryPrintObj } from './types';

export class ScoreCalculatorServer {
 private librariesInfo: LibraryInfo[];
 private librariesInfoSortedArrObj: LibrariesArraysObj = {
  [LibraryInfoFields.NUMBER_OF_STARS]: [],
  [LibraryInfoFields.DATE_OF_LAST_ISSUE]: [],
  [LibraryInfoFields.DATE_OF_LAST_PULL_REQUEST]: [],
  [LibraryInfoFields.DATE_OF_LAST_RELEASE]: [],
  [LibraryInfoFields.NUMBER_OF_CLOSED_PR_LAST_YEAR]: [],
  [LibraryInfoFields.NUMBER_OF_CONTRIBUTORS]: [],
  [LibraryInfoFields.NUMBER_OF_OPENED_ISSUES_LAST_SIX_MONTHS]: [],
  [LibraryInfoFields.NUMBER_OF_FORKS]: [],
 };

 constructor(librariesInfo: LibraryInfo[]) {
  this.librariesInfo = librariesInfo;
  this.initArraysMembers();
  this.sortArraysMembers();
 }

 getPrintObjectsOfLibraries = (): LibraryPrintObj[] => {
  const printObjOfLibraries = [];
  this.librariesInfo.forEach((libraryInfo: LibraryInfo) => {
   const awesomenessScore = this.getAwesomenessScoreOfLibrary(libraryInfo);
   const { description, link } = libraryInfo.library;
   printObjOfLibraries.push({
    awesomenessScore,
    description,
    license: libraryInfo.licenseType,
    link,
   });
  });
  return printObjOfLibraries;
 };

 private getAwesomenessScoreOfLibrary = libraryInfo => {
  let sumOfIndividualScores = 0;
  let scoreParameters = [
   LibraryInfoFields.NUMBER_OF_STARS,
   LibraryInfoFields.DATE_OF_LAST_ISSUE,
   LibraryInfoFields.DATE_OF_LAST_PULL_REQUEST,
   LibraryInfoFields.DATE_OF_LAST_RELEASE,
   LibraryInfoFields.NUMBER_OF_CLOSED_PR_LAST_YEAR,
   LibraryInfoFields.NUMBER_OF_CONTRIBUTORS,
   LibraryInfoFields.NUMBER_OF_OPENED_ISSUES_LAST_SIX_MONTHS,
   LibraryInfoFields.NUMBER_OF_FORKS,
  ];
  scoreParameters.forEach(param => {
   sumOfIndividualScores += this.getScoreByDecileOfNumberInArr(
    this.librariesInfoSortedArrObj[param],
    libraryInfo[param],
   );
  });
  return sumOfIndividualScores;
 };

 private initArraysMembers = () => {
  this.librariesInfo.forEach(li => {
   this.librariesInfoSortedArrObj[LibraryInfoFields.NUMBER_OF_STARS].push(li.numberOfStars);
   this.librariesInfoSortedArrObj[LibraryInfoFields.DATE_OF_LAST_ISSUE].push(li.dateOfLastIssue);
   this.librariesInfoSortedArrObj[LibraryInfoFields.DATE_OF_LAST_PULL_REQUEST].push(
    li.dateOfLastPullRequest,
   );
   this.librariesInfoSortedArrObj[LibraryInfoFields.DATE_OF_LAST_RELEASE].push(
    li.dateOfLastRelease,
   );
   this.librariesInfoSortedArrObj[LibraryInfoFields.NUMBER_OF_CLOSED_PR_LAST_YEAR].push(
    li.numberOfClosedPullRequestsLastYear,
   );
   this.librariesInfoSortedArrObj[LibraryInfoFields.NUMBER_OF_CONTRIBUTORS].push(
    li.numberOfContributors,
   );
   this.librariesInfoSortedArrObj[LibraryInfoFields.NUMBER_OF_OPENED_ISSUES_LAST_SIX_MONTHS].push(
    li.numberOfOpenedIssuesLastSixMonths,
   );
   this.librariesInfoSortedArrObj[LibraryInfoFields.NUMBER_OF_FORKS].push(li.numberOfForks);
  });
 };

 private sortArraysMembers = () => {
  const descSortFunc = (a, b) => b - a;
  this.librariesInfoSortedArrObj[LibraryInfoFields.NUMBER_OF_STARS].sort(descSortFunc); //higher is better
  this.librariesInfoSortedArrObj[LibraryInfoFields.DATE_OF_LAST_ISSUE].sort(descSortFunc); //newer is better
  this.librariesInfoSortedArrObj[LibraryInfoFields.DATE_OF_LAST_PULL_REQUEST].sort(descSortFunc); //newer is better
  this.librariesInfoSortedArrObj[LibraryInfoFields.DATE_OF_LAST_RELEASE].sort(descSortFunc); //newer is better
  this.librariesInfoSortedArrObj[LibraryInfoFields.NUMBER_OF_CLOSED_PR_LAST_YEAR].sort(
   descSortFunc,
  ); //higher is better
  this.librariesInfoSortedArrObj[LibraryInfoFields.NUMBER_OF_CONTRIBUTORS].sort(descSortFunc); //higher is better
  this.librariesInfoSortedArrObj[LibraryInfoFields.NUMBER_OF_OPENED_ISSUES_LAST_SIX_MONTHS].sort(); //lower is better
  this.librariesInfoSortedArrObj[LibraryInfoFields.NUMBER_OF_FORKS].sort(descSortFunc); //higher is better
 };

 private getScoreByDecileOfNumberInArr = (arr, elem) => {
  const len = arr.length;
  const index = arr.indexOf(elem);
  let score = 10;
  let percent = 0.1;
  for (let i = score; i > 0; i--) {
   const indexOf10Decile = Math.floor(len * percent);
   if (index <= indexOf10Decile) {
    return score;
   }
   percent += 0.1;
  }
 };
}
