import { RepoInfo } from './types';
import fetch from 'node-fetch';
import { config } from '../config';
import { GitHubDataAccess } from './githubDA';

const { githubUrl } = config;

export class ReadmeServer {
 private readmeData: any[];
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
  this.readmeData = await this.gitHubDataAccess.apiRequest(reqUrl);
  console.log('readme Data: ', this.readmeData);
  return this;
 }
}
