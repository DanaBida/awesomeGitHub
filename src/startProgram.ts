import { ReadmeServer } from './readme.server';
import { GitHubDataAccess } from './githubDA';

export const startProgram = async repoInfo => {
 const gitHubDataAccess = new GitHubDataAccess(repoInfo.token);
 const readmeServer = await new ReadmeServer(repoInfo, gitHubDataAccess);
};
