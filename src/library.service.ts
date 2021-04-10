import { LibraryInfo, Library, AdditionalInfo } from './types';
import { GitHubDataAccess } from './apiRequest';
import { config } from '../config';
import moment from 'moment';

const { githubApiBaseUrl } = config;

export class LibraryService {
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
  /*const librariesInfoPromises = [];
  libraries.forEach(library => {
   const { owner, name } = library;
   const reqUrl = `${githubApiBaseUrl}/repos/${owner}/${name}`;
   librariesInfoPromises.push(this.gitHubDataAccess.apiRequest(reqUrl));
  });
  return await Promise.all(librariesInfoPromises);
  */
  return [
   {
    id: 21289110,
    node_id: 'MDEwOlJlcG9zaXRvcnkyMTI4OTExMA==',
    name: 'awesome-python',
    full_name: 'vinta/awesome-python',
    private: false,
    owner: {
     login: 'vinta',
     id: 652070,
     node_id: 'MDQ6VXNlcjY1MjA3MA==',
     avatar_url: 'https://avatars.githubusercontent.com/u/652070?v=4',
     gravatar_id: '',
     url: 'https://api.github.com/users/vinta',
     html_url: 'https://github.com/vinta',
     followers_url: 'https://api.github.com/users/vinta/followers',
     following_url: 'https://api.github.com/users/vinta/following{/other_user}',
     gists_url: 'https://api.github.com/users/vinta/gists{/gist_id}',
     starred_url: 'https://api.github.com/users/vinta/starred{/owner}{/repo}',
     subscriptions_url: 'https://api.github.com/users/vinta/subscriptions',
     organizations_url: 'https://api.github.com/users/vinta/orgs',
     repos_url: 'https://api.github.com/users/vinta/repos',
     events_url: 'https://api.github.com/users/vinta/events{/privacy}',
     received_events_url: 'https://api.github.com/users/vinta/received_events',
     type: 'User',
     site_admin: false,
    },
    html_url: 'https://github.com/vinta/awesome-python',
    description: 'A curated list of awesome Python frameworks, libraries, software and resources',
    fork: false,
    url: 'https://api.github.com/repos/vinta/awesome-python',
    forks_url: 'https://api.github.com/repos/vinta/awesome-python/forks',
    keys_url: 'https://api.github.com/repos/vinta/awesome-python/keys{/key_id}',
    collaborators_url:
     'https://api.github.com/repos/vinta/awesome-python/collaborators{/collaborator}',
    teams_url: 'https://api.github.com/repos/vinta/awesome-python/teams',
    hooks_url: 'https://api.github.com/repos/vinta/awesome-python/hooks',
    issue_events_url: 'https://api.github.com/repos/vinta/awesome-python/issues/events{/number}',
    events_url: 'https://api.github.com/repos/vinta/awesome-python/events',
    assignees_url: 'https://api.github.com/repos/vinta/awesome-python/assignees{/user}',
    branches_url: 'https://api.github.com/repos/vinta/awesome-python/branches{/branch}',
    tags_url: 'https://api.github.com/repos/vinta/awesome-python/tags',
    blobs_url: 'https://api.github.com/repos/vinta/awesome-python/git/blobs{/sha}',
    git_tags_url: 'https://api.github.com/repos/vinta/awesome-python/git/tags{/sha}',
    git_refs_url: 'https://api.github.com/repos/vinta/awesome-python/git/refs{/sha}',
    trees_url: 'https://api.github.com/repos/vinta/awesome-python/git/trees{/sha}',
    statuses_url: 'https://api.github.com/repos/vinta/awesome-python/statuses/{sha}',
    languages_url: 'https://api.github.com/repos/vinta/awesome-python/languages',
    stargazers_url: 'https://api.github.com/repos/vinta/awesome-python/stargazers',
    contributors_url: 'https://api.github.com/repos/vinta/awesome-python/contributors',
    subscribers_url: 'https://api.github.com/repos/vinta/awesome-python/subscribers',
    subscription_url: 'https://api.github.com/repos/vinta/awesome-python/subscription',
    commits_url: 'https://api.github.com/repos/vinta/awesome-python/commits{/sha}',
    git_commits_url: 'https://api.github.com/repos/vinta/awesome-python/git/commits{/sha}',
    comments_url: 'https://api.github.com/repos/vinta/awesome-python/comments{/number}',
    issue_comment_url: 'https://api.github.com/repos/vinta/awesome-python/issues/comments{/number}',
    contents_url: 'https://api.github.com/repos/vinta/awesome-python/contents/{+path}',
    compare_url: 'https://api.github.com/repos/vinta/awesome-python/compare/{base}...{head}',
    merges_url: 'https://api.github.com/repos/vinta/awesome-python/merges',
    archive_url: 'https://api.github.com/repos/vinta/awesome-python/{archive_format}{/ref}',
    downloads_url: 'https://api.github.com/repos/vinta/awesome-python/downloads',
    issues_url: 'https://api.github.com/repos/vinta/awesome-python/issues{/number}',
    pulls_url: 'https://api.github.com/repos/vinta/awesome-python/pulls{/number}',
    milestones_url: 'https://api.github.com/repos/vinta/awesome-python/milestones{/number}',
    notifications_url:
     'https://api.github.com/repos/vinta/awesome-python/notifications{?since,all,participating}',
    labels_url: 'https://api.github.com/repos/vinta/awesome-python/labels{/name}',
    releases_url: 'https://api.github.com/repos/vinta/awesome-python/releases{/id}',
    deployments_url: 'https://api.github.com/repos/vinta/awesome-python/deployments',
    created_at: '2014-06-27T21:00:06Z',
    updated_at: '2021-04-10T14:12:06Z',
    pushed_at: '2021-04-08T12:14:34Z',
    git_url: 'git://github.com/vinta/awesome-python.git',
    ssh_url: 'git@github.com:vinta/awesome-python.git',
    clone_url: 'https://github.com/vinta/awesome-python.git',
    svn_url: 'https://github.com/vinta/awesome-python',
    homepage: 'https://awesome-python.com/',
    size: 6596,
    stargazers_count: 95733,
    watchers_count: 95733,
    language: 'Python',
    has_issues: true,
    has_projects: false,
    has_downloads: true,
    has_wiki: false,
    has_pages: true,
    forks_count: 18712,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 147,
    license: {
     key: 'other',
     name: 'Other',
     spdx_id: 'NOASSERTION',
     url: null,
     node_id: 'MDc6TGljZW5zZTA=',
    },
    forks: 18712,
    open_issues: 147,
    watchers: 95733,
    default_branch: 'master',
    permissions: {
     admin: false,
     push: false,
     pull: true,
    },
    temp_clone_token: '',
    network_count: 18712,
    subscribers_count: 5574,
   },
  ];
 };

 private getLibraryPromiseOfType = (libraryGeneralInfo, type) => {
  const reqUrl = `${githubApiBaseUrl}/repos/${libraryGeneralInfo.owner.login}/${libraryGeneralInfo.name}`;
  return this.gitHubDataAccess.apiRequest(`${reqUrl}/${type}?direction=desc`);
 };

 private getAdditionalInfo = async (librariesGeneralInfo): Promise<AdditionalInfo> => {
  /*
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
  */
  const issues = [
   [
    {
     url: 'https://api.github.com/repos/vinta/awesome-python/issues/1741',
     repository_url: 'https://api.github.com/repos/vinta/awesome-python',
     labels_url: 'https://api.github.com/repos/vinta/awesome-python/issues/1741/labels{/name}',
     comments_url: 'https://api.github.com/repos/vinta/awesome-python/issues/1741/comments',
     events_url: 'https://api.github.com/repos/vinta/awesome-python/issues/1741/events',
     html_url: 'https://github.com/vinta/awesome-python/pull/1741',
     id: 828985378,
     node_id: 'MDExOlB1bGxSZXF1ZXN0NTkwNzI0NzIx',
     number: 1741,
     title: 'new file added',
     user: {
      login: 'hasan225',
      id: 78193119,
      node_id: 'MDQ6VXNlcjc4MTkzMTE5',
      avatar_url: 'https://avatars.githubusercontent.com/u/78193119?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/hasan225',
      html_url: 'https://github.com/hasan225',
      followers_url: 'https://api.github.com/users/hasan225/followers',
      following_url: 'https://api.github.com/users/hasan225/following{/other_user}',
      gists_url: 'https://api.github.com/users/hasan225/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/hasan225/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/hasan225/subscriptions',
      organizations_url: 'https://api.github.com/users/hasan225/orgs',
      repos_url: 'https://api.github.com/users/hasan225/repos',
      events_url: 'https://api.github.com/users/hasan225/events{/privacy}',
      received_events_url: 'https://api.github.com/users/hasan225/received_events',
      type: 'User',
      site_admin: false,
     },
     labels: [],
     state: 'open',
     locked: false,
     assignee: null,
     assignees: [],
     milestone: null,
     comments: 0,
     created_at: '2021-04-11T09:53:31Z',
     updated_at: '2021-03-11T10:26:42Z',
     closed_at: '2021-03-11T10:26:42Z',
     author_association: 'NONE',
     active_lock_reason: null,
     pull_request: {
      url: 'https://api.github.com/repos/vinta/awesome-python/pulls/1741',
      html_url: 'https://github.com/vinta/awesome-python/pull/1741',
      diff_url: 'https://github.com/vinta/awesome-python/pull/1741.diff',
      patch_url: 'https://github.com/vinta/awesome-python/pull/1741.patch',
     },
     body:
      "## What is this Python project?\r\n\r\nDescribe features.\r\n\r\n## What's the difference between this Python project and similar ones?\r\n\r\nEnumerate comparisons.\r\n\r\n--\r\n\r\nAnyone who agrees with this pull request could submit an *Approve* review to it.\r\n",
     performed_via_github_app: null,
    },
   ],
  ];
  const pullRequests = [
   [
    {
     url: 'https://api.github.com/repos/vinta/awesome-python/pulls/1751',
     id: 611504322,
     node_id: 'MDExOlB1bGxSZXF1ZXN0NjExNTA0MzIy',
     html_url: 'https://github.com/vinta/awesome-python/pull/1751',
     diff_url: 'https://github.com/vinta/awesome-python/pull/1751.diff',
     patch_url: 'https://github.com/vinta/awesome-python/pull/1751.patch',
     issue_url: 'https://api.github.com/repos/vinta/awesome-python/issues/1751',
     number: 1751,
     state: 'open',
     locked: false,
     title: 'freecodecamp python article section',
     user: {
      login: 'tiagomonteiro0715',
      id: 68009234,
      node_id: 'MDQ6VXNlcjY4MDA5MjM0',
      avatar_url: 'https://avatars.githubusercontent.com/u/68009234?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/tiagomonteiro0715',
      html_url: 'https://github.com/tiagomonteiro0715',
      followers_url: 'https://api.github.com/users/tiagomonteiro0715/followers',
      following_url: 'https://api.github.com/users/tiagomonteiro0715/following{/other_user}',
      gists_url: 'https://api.github.com/users/tiagomonteiro0715/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/tiagomonteiro0715/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/tiagomonteiro0715/subscriptions',
      organizations_url: 'https://api.github.com/users/tiagomonteiro0715/orgs',
      repos_url: 'https://api.github.com/users/tiagomonteiro0715/repos',
      events_url: 'https://api.github.com/users/tiagomonteiro0715/events{/privacy}',
      received_events_url: 'https://api.github.com/users/tiagomonteiro0715/received_events',
      type: 'User',
      site_admin: false,
     },
     body: 'section newsletters - add freecodecamp python articles collection',
     created_at: '2021-04-08T12:14:33Z',
     updated_at: '2021-04-08T12:14:33Z',
     closed_at: null,
     merged_at: null,
     merge_commit_sha: '96ff7c3fa98b3bcd5f9fcece109cd331265a9971',
     assignee: null,
     assignees: [],
     requested_reviewers: [],
     requested_teams: [],
     labels: [],
     milestone: null,
     draft: false,
     commits_url: 'https://api.github.com/repos/vinta/awesome-python/pulls/1751/commits',
     review_comments_url: 'https://api.github.com/repos/vinta/awesome-python/pulls/1751/comments',
     review_comment_url:
      'https://api.github.com/repos/vinta/awesome-python/pulls/comments{/number}',
     comments_url: 'https://api.github.com/repos/vinta/awesome-python/issues/1751/comments',
     statuses_url:
      'https://api.github.com/repos/vinta/awesome-python/statuses/bb9e98b03b0e857605dab147463f13f6e2b8a7e4',
     head: {
      label: 'tiagomonteiro0715:master',
      ref: 'master',
      sha: 'bb9e98b03b0e857605dab147463f13f6e2b8a7e4',
      user: {
       login: 'tiagomonteiro0715',
       id: 68009234,
       node_id: 'MDQ6VXNlcjY4MDA5MjM0',
       avatar_url: 'https://avatars.githubusercontent.com/u/68009234?v=4',
       gravatar_id: '',
       url: 'https://api.github.com/users/tiagomonteiro0715',
       html_url: 'https://github.com/tiagomonteiro0715',
       followers_url: 'https://api.github.com/users/tiagomonteiro0715/followers',
       following_url: 'https://api.github.com/users/tiagomonteiro0715/following{/other_user}',
       gists_url: 'https://api.github.com/users/tiagomonteiro0715/gists{/gist_id}',
       starred_url: 'https://api.github.com/users/tiagomonteiro0715/starred{/owner}{/repo}',
       subscriptions_url: 'https://api.github.com/users/tiagomonteiro0715/subscriptions',
       organizations_url: 'https://api.github.com/users/tiagomonteiro0715/orgs',
       repos_url: 'https://api.github.com/users/tiagomonteiro0715/repos',
       events_url: 'https://api.github.com/users/tiagomonteiro0715/events{/privacy}',
       received_events_url: 'https://api.github.com/users/tiagomonteiro0715/received_events',
       type: 'User',
       site_admin: false,
      },
      repo: {
       id: 355891046,
       node_id: 'MDEwOlJlcG9zaXRvcnkzNTU4OTEwNDY=',
       name: 'awesome-python',
       full_name: 'tiagomonteiro0715/awesome-python',
       private: false,
       owner: {
        login: 'tiagomonteiro0715',
        id: 68009234,
        node_id: 'MDQ6VXNlcjY4MDA5MjM0',
        avatar_url: 'https://avatars.githubusercontent.com/u/68009234?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/tiagomonteiro0715',
        html_url: 'https://github.com/tiagomonteiro0715',
        followers_url: 'https://api.github.com/users/tiagomonteiro0715/followers',
        following_url: 'https://api.github.com/users/tiagomonteiro0715/following{/other_user}',
        gists_url: 'https://api.github.com/users/tiagomonteiro0715/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/tiagomonteiro0715/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/tiagomonteiro0715/subscriptions',
        organizations_url: 'https://api.github.com/users/tiagomonteiro0715/orgs',
        repos_url: 'https://api.github.com/users/tiagomonteiro0715/repos',
        events_url: 'https://api.github.com/users/tiagomonteiro0715/events{/privacy}',
        received_events_url: 'https://api.github.com/users/tiagomonteiro0715/received_events',
        type: 'User',
        site_admin: false,
       },
       html_url: 'https://github.com/tiagomonteiro0715/awesome-python',
       description:
        'A curated list of awesome Python frameworks, libraries, software and resources',
       fork: true,
       url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python',
       forks_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/forks',
       keys_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/keys{/key_id}',
       collaborators_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/collaborators{/collaborator}',
       teams_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/teams',
       hooks_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/hooks',
       issue_events_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/issues/events{/number}',
       events_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/events',
       assignees_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/assignees{/user}',
       branches_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/branches{/branch}',
       tags_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/tags',
       blobs_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/git/blobs{/sha}',
       git_tags_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/git/tags{/sha}',
       git_refs_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/git/refs{/sha}',
       trees_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/git/trees{/sha}',
       statuses_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/statuses/{sha}',
       languages_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/languages',
       stargazers_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/stargazers',
       contributors_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/contributors',
       subscribers_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/subscribers',
       subscription_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/subscription',
       commits_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/commits{/sha}',
       git_commits_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/git/commits{/sha}',
       comments_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/comments{/number}',
       issue_comment_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/issues/comments{/number}',
       contents_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/contents/{+path}',
       compare_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/compare/{base}...{head}',
       merges_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/merges',
       archive_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/{archive_format}{/ref}',
       downloads_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/downloads',
       issues_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/issues{/number}',
       pulls_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/pulls{/number}',
       milestones_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/milestones{/number}',
       notifications_url:
        'https://api.github.com/repos/tiagomonteiro0715/awesome-python/notifications{?since,all,participating}',
       labels_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/labels{/name}',
       releases_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/releases{/id}',
       deployments_url: 'https://api.github.com/repos/tiagomonteiro0715/awesome-python/deployments',
       created_at: '2021-04-08T12:05:38Z',
       updated_at: '2021-04-08T12:09:06Z',
       pushed_at: '2021-04-08T12:08:59Z',
       git_url: 'git://github.com/tiagomonteiro0715/awesome-python.git',
       ssh_url: 'git@github.com:tiagomonteiro0715/awesome-python.git',
       clone_url: 'https://github.com/tiagomonteiro0715/awesome-python.git',
       svn_url: 'https://github.com/tiagomonteiro0715/awesome-python',
       homepage: 'https://awesome-python.com/',
       size: 6684,
       stargazers_count: 0,
       watchers_count: 0,
       language: 'Python',
       has_issues: false,
       has_projects: true,
       has_downloads: true,
       has_wiki: false,
       has_pages: false,
       forks_count: 0,
       mirror_url: null,
       archived: false,
       disabled: false,
       open_issues_count: 0,
       license: {
        key: 'other',
        name: 'Other',
        spdx_id: 'NOASSERTION',
        url: null,
        node_id: 'MDc6TGljZW5zZTA=',
       },
       forks: 0,
       open_issues: 0,
       watchers: 0,
       default_branch: 'master',
      },
     },
     base: {
      label: 'vinta:master',
      ref: 'master',
      sha: '545b0535a9ba82da7e6f3be3d73bd2e4eb2acb63',
      user: {
       login: 'vinta',
       id: 652070,
       node_id: 'MDQ6VXNlcjY1MjA3MA==',
       avatar_url: 'https://avatars.githubusercontent.com/u/652070?v=4',
       gravatar_id: '',
       url: 'https://api.github.com/users/vinta',
       html_url: 'https://github.com/vinta',
       followers_url: 'https://api.github.com/users/vinta/followers',
       following_url: 'https://api.github.com/users/vinta/following{/other_user}',
       gists_url: 'https://api.github.com/users/vinta/gists{/gist_id}',
       starred_url: 'https://api.github.com/users/vinta/starred{/owner}{/repo}',
       subscriptions_url: 'https://api.github.com/users/vinta/subscriptions',
       organizations_url: 'https://api.github.com/users/vinta/orgs',
       repos_url: 'https://api.github.com/users/vinta/repos',
       events_url: 'https://api.github.com/users/vinta/events{/privacy}',
       received_events_url: 'https://api.github.com/users/vinta/received_events',
       type: 'User',
       site_admin: false,
      },
      repo: {
       id: 21289110,
       node_id: 'MDEwOlJlcG9zaXRvcnkyMTI4OTExMA==',
       name: 'awesome-python',
       full_name: 'vinta/awesome-python',
       private: false,
       owner: {
        login: 'vinta',
        id: 652070,
        node_id: 'MDQ6VXNlcjY1MjA3MA==',
        avatar_url: 'https://avatars.githubusercontent.com/u/652070?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/vinta',
        html_url: 'https://github.com/vinta',
        followers_url: 'https://api.github.com/users/vinta/followers',
        following_url: 'https://api.github.com/users/vinta/following{/other_user}',
        gists_url: 'https://api.github.com/users/vinta/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/vinta/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/vinta/subscriptions',
        organizations_url: 'https://api.github.com/users/vinta/orgs',
        repos_url: 'https://api.github.com/users/vinta/repos',
        events_url: 'https://api.github.com/users/vinta/events{/privacy}',
        received_events_url: 'https://api.github.com/users/vinta/received_events',
        type: 'User',
        site_admin: false,
       },
       html_url: 'https://github.com/vinta/awesome-python',
       description:
        'A curated list of awesome Python frameworks, libraries, software and resources',
       fork: false,
       url: 'https://api.github.com/repos/vinta/awesome-python',
       forks_url: 'https://api.github.com/repos/vinta/awesome-python/forks',
       keys_url: 'https://api.github.com/repos/vinta/awesome-python/keys{/key_id}',
       collaborators_url:
        'https://api.github.com/repos/vinta/awesome-python/collaborators{/collaborator}',
       teams_url: 'https://api.github.com/repos/vinta/awesome-python/teams',
       hooks_url: 'https://api.github.com/repos/vinta/awesome-python/hooks',
       issue_events_url: 'https://api.github.com/repos/vinta/awesome-python/issues/events{/number}',
       events_url: 'https://api.github.com/repos/vinta/awesome-python/events',
       assignees_url: 'https://api.github.com/repos/vinta/awesome-python/assignees{/user}',
       branches_url: 'https://api.github.com/repos/vinta/awesome-python/branches{/branch}',
       tags_url: 'https://api.github.com/repos/vinta/awesome-python/tags',
       blobs_url: 'https://api.github.com/repos/vinta/awesome-python/git/blobs{/sha}',
       git_tags_url: 'https://api.github.com/repos/vinta/awesome-python/git/tags{/sha}',
       git_refs_url: 'https://api.github.com/repos/vinta/awesome-python/git/refs{/sha}',
       trees_url: 'https://api.github.com/repos/vinta/awesome-python/git/trees{/sha}',
       statuses_url: 'https://api.github.com/repos/vinta/awesome-python/statuses/{sha}',
       languages_url: 'https://api.github.com/repos/vinta/awesome-python/languages',
       stargazers_url: 'https://api.github.com/repos/vinta/awesome-python/stargazers',
       contributors_url: 'https://api.github.com/repos/vinta/awesome-python/contributors',
       subscribers_url: 'https://api.github.com/repos/vinta/awesome-python/subscribers',
       subscription_url: 'https://api.github.com/repos/vinta/awesome-python/subscription',
       commits_url: 'https://api.github.com/repos/vinta/awesome-python/commits{/sha}',
       git_commits_url: 'https://api.github.com/repos/vinta/awesome-python/git/commits{/sha}',
       comments_url: 'https://api.github.com/repos/vinta/awesome-python/comments{/number}',
       issue_comment_url:
        'https://api.github.com/repos/vinta/awesome-python/issues/comments{/number}',
       contents_url: 'https://api.github.com/repos/vinta/awesome-python/contents/{+path}',
       compare_url: 'https://api.github.com/repos/vinta/awesome-python/compare/{base}...{head}',
       merges_url: 'https://api.github.com/repos/vinta/awesome-python/merges',
       archive_url: 'https://api.github.com/repos/vinta/awesome-python/{archive_format}{/ref}',
       downloads_url: 'https://api.github.com/repos/vinta/awesome-python/downloads',
       issues_url: 'https://api.github.com/repos/vinta/awesome-python/issues{/number}',
       pulls_url: 'https://api.github.com/repos/vinta/awesome-python/pulls{/number}',
       milestones_url: 'https://api.github.com/repos/vinta/awesome-python/milestones{/number}',
       notifications_url:
        'https://api.github.com/repos/vinta/awesome-python/notifications{?since,all,participating}',
       labels_url: 'https://api.github.com/repos/vinta/awesome-python/labels{/name}',
       releases_url: 'https://api.github.com/repos/vinta/awesome-python/releases{/id}',
       deployments_url: 'https://api.github.com/repos/vinta/awesome-python/deployments',
       created_at: '2014-06-27T21:00:06Z',
       updated_at: '2021-04-10T16:05:56Z',
       pushed_at: '2021-04-08T12:14:34Z',
       git_url: 'git://github.com/vinta/awesome-python.git',
       ssh_url: 'git@github.com:vinta/awesome-python.git',
       clone_url: 'https://github.com/vinta/awesome-python.git',
       svn_url: 'https://github.com/vinta/awesome-python',
       homepage: 'https://awesome-python.com/',
       size: 6596,
       stargazers_count: 95738,
       watchers_count: 95738,
       language: 'Python',
       has_issues: true,
       has_projects: false,
       has_downloads: true,
       has_wiki: false,
       has_pages: true,
       forks_count: 18714,
       mirror_url: null,
       archived: false,
       disabled: false,
       open_issues_count: 147,
       license: {
        key: 'other',
        name: 'Other',
        spdx_id: 'NOASSERTION',
        url: null,
        node_id: 'MDc6TGljZW5zZTA=',
       },
       forks: 18714,
       open_issues: 147,
       watchers: 95738,
       default_branch: 'master',
      },
     },
     _links: {
      self: {
       href: 'https://api.github.com/repos/vinta/awesome-python/pulls/1751',
      },
      html: {
       href: 'https://github.com/vinta/awesome-python/pull/1751',
      },
      issue: {
       href: 'https://api.github.com/repos/vinta/awesome-python/issues/1751',
      },
      comments: {
       href: 'https://api.github.com/repos/vinta/awesome-python/issues/1751/comments',
      },
      review_comments: {
       href: 'https://api.github.com/repos/vinta/awesome-python/pulls/1751/comments',
      },
      review_comment: {
       href: 'https://api.github.com/repos/vinta/awesome-python/pulls/comments{/number}',
      },
      commits: {
       href: 'https://api.github.com/repos/vinta/awesome-python/pulls/1751/commits',
      },
      statuses: {
       href:
        'https://api.github.com/repos/vinta/awesome-python/statuses/bb9e98b03b0e857605dab147463f13f6e2b8a7e4',
      },
     },
     author_association: 'NONE',
     auto_merge: null,
     active_lock_reason: null,
    },
   ],
  ];
  const releases = [];
  const contributors = [
   [
    {
     login: 'vinta',
     id: 652070,
     node_id: 'MDQ6VXNlcjY1MjA3MA==',
     avatar_url: 'https://avatars.githubusercontent.com/u/652070?v=4',
     gravatar_id: '',
     url: 'https://api.github.com/users/vinta',
     html_url: 'https://github.com/vinta',
     followers_url: 'https://api.github.com/users/vinta/followers',
     following_url: 'https://api.github.com/users/vinta/following{/other_user}',
     gists_url: 'https://api.github.com/users/vinta/gists{/gist_id}',
     starred_url: 'https://api.github.com/users/vinta/starred{/owner}{/repo}',
     subscriptions_url: 'https://api.github.com/users/vinta/subscriptions',
     organizations_url: 'https://api.github.com/users/vinta/orgs',
     repos_url: 'https://api.github.com/users/vinta/repos',
     events_url: 'https://api.github.com/users/vinta/events{/privacy}',
     received_events_url: 'https://api.github.com/users/vinta/received_events',
     type: 'User',
     site_admin: false,
     contributions: 939,
    },
   ],
  ];
  return { issues, pullRequests, releases, contributors };
 };
}
