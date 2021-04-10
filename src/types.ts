export interface RepoInfo {
 owner: string;
 name: string;
 token?: string;
}

export interface Library {
 owner: string;
 name: string;
 description: string;
 link: string;
 license?: {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
 };
}

export interface LibraryInfo {
 library: Library;
 numberOfStars: number;
 dateOfLastIssue: string;
 dateOfLastPullRequest: string;
 dateOfLastRelease: string;
 numberOfClosedPullRequestsLastYear: number;
 numberOfContributors: number;
 numberOfOpenedIssuesLastSixMonths: number;
 licenseType?: string;
 numberOfForks: number;
}

export interface LibrariesArraysObj {
 [LibraryInfoFields.NUMBER_OF_STARS]: number[];
 [LibraryInfoFields.DATE_OF_LAST_ISSUE]: string[];
 [LibraryInfoFields.DATE_OF_LAST_PULL_REQUEST]: string[];
 [LibraryInfoFields.DATE_OF_LAST_RELEASE]: string[];
 [LibraryInfoFields.NUMBER_OF_CLOSED_PR_LAST_YEAR]: number[];
 [LibraryInfoFields.NUMBER_OF_CONTRIBUTORS]: number[];
 [LibraryInfoFields.NUMBER_OF_OPENED_ISSUES_LAST_SIX_MONTHS]: number[];
 [LibraryInfoFields.NUMBER_OF_FORKS]: number[];
}

export enum LibraryInfoFields {
 NUMBER_OF_STARS = 'numberOfStars',
 DATE_OF_LAST_ISSUE = 'dateOfLastIssue',
 DATE_OF_LAST_PULL_REQUEST = 'dateOfLastPullRequest',
 DATE_OF_LAST_RELEASE = 'dateOfLastRelease',
 NUMBER_OF_CLOSED_PR_LAST_YEAR = 'numberOfClosedPullRequestsLastYear',
 NUMBER_OF_CONTRIBUTORS = 'numberOfContributors',
 NUMBER_OF_OPENED_ISSUES_LAST_SIX_MONTHS = 'numberOfOpenedIssuesLastSixMonths',
 LICENSE_TYPE = 'licenseType',
 NUMBER_OF_FORKS = 'numberOfForks',
}

export interface AdditionalInfo {
 issues: any[];
 pullRequests: any[];
 releases: any[];
 contributors: any[];
}

export interface LibraryPrintObj {
 awesomenessScore: number;
 description: string;
 license: string;
 link: string;
}
