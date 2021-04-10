import { RepoInfo, Library } from './types';
import { GitHubDataAccess } from './apiRequest';
import { markdown } from 'markdown';
import { config } from '../config';

const { githubReadmeBaseUrl } = config;

export class ReadmeService {
 private readmeData: any;
 private repoInfo: RepoInfo;
 private gitHubDataAccess: GitHubDataAccess;

 constructor(repoInfo: RepoInfo, gitHubDataAccess: GitHubDataAccess) {
  this.repoInfo = repoInfo;
  this.gitHubDataAccess = gitHubDataAccess;
  return this.init() as any;
 }

 private async init() {
  const { owner, name } = this.repoInfo;
  const reqUrl = `${githubReadmeBaseUrl}/${owner}/${name}/master/README.md`;
  const readMeTextContent = await this.gitHubDataAccess.apiRequest(reqUrl, false);
  this.readmeData = markdown.parse(readMeTextContent);
  return this;
 }

 getReadmeRefsLibraries = (): Library[] => {
  const libraries: Library[] = [];

  this.readmeData.forEach(element => {
   if (Array.isArray(element)) {
    element.forEach(subElem => {
     if (this.isElementGitHubRepoLink(subElem, this.repoInfo.name)) {
      libraries.push(this.getLibraryInfoFromLinkElem(subElem));
     }
    });
   }
  });
  return libraries;
 };

 private isElementGitHubRepoLink = (elem, currRepoName) => {
  const elemType = elem[0];
  const elemRef = elem[1] && elem[1].href;
  return (
   elemType == 'link' && elemRef && elemRef.includes('github') && !elemRef.includes(currRepoName)
  );
 };

 private getLibraryInfoFromLinkElem = (linkElem): Library => {
  const link = linkElem[1].href;
  const linkParts = link.split('/');

  return {
   owner: linkParts[3],
   name: linkParts[4],
   link,
   description: 'not implemented',
  };
 };
}
