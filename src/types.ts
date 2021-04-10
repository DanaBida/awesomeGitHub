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
 licence?: {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
 };
}

export interface LibraryInfo {
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

export interface AdditionalInfo {
 issues: any[];
 pullRequests: any[];
 releases: any[];
 contributors: any[];
}
