import yargs from 'yargs';
import { startProgram } from './startProgram';
import { RepoInfo } from './types';

const { owner, name, token } = yargs.argv;

let repoInfo: RepoInfo = { owner, name, token };

startProgram(repoInfo);
