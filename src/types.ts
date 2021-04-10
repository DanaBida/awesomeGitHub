export interface RepoInfo {
 owner: string;
 name: string;
 token?: string;
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
