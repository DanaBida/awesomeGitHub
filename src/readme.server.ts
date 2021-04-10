import { RepoInfo } from './types';
import { GitHubDataAccess } from './githubDA';
import { markdown } from 'markdown';
export class ReadmeServer {
 private readmeData: any;
 private repoInfo: RepoInfo;
 private gitHubDataAccess: GitHubDataAccess;

 constructor(repoInfo: RepoInfo, gitHubDataAccess: GitHubDataAccess) {
  this.repoInfo = repoInfo;
  this.gitHubDataAccess = gitHubDataAccess;
  return this.init() as any;
 }

 async init() {
  const { owner, name } = this.repoInfo;
  const reqUrl = `${owner}/${name}/master/README.md`;
  const readMeTextContent = await this.gitHubDataAccess.apiRequest(reqUrl);
  this.readmeData = markdown.parse(readMeTextContent);
  return this;
 }

 getReadmeLibraries = (): RepoInfo[] => {
  const repos: RepoInfo[] = [];

  this.readmeData.forEach(element => {
   if (Array.isArray(element)) {
    element.forEach(subElem => {
     if (this.isElementGitHubRepoLink(subElem, this.repoInfo.name)) {
      const elemRef = subElem[1].href;
      repos.push(this.getRepoInfoFromLink(elemRef));
     }
    });
   }
  });
  return repos;
 };

 private isElementGitHubRepoLink = (elem, currRepoName) => {
  const elemType = elem[0];
  const elemRef = elem[1] && elem[1].href;
  return (
   elemType == 'link' && elemRef && elemRef.includes('github') && !elemRef.includes(currRepoName)
  );
 };

 private getRepoInfoFromLink = (link): RepoInfo => {
  const linkParts = link.split('/');
  return {
   name: linkParts[3],
   owner: linkParts[4],
  };
 };
}
