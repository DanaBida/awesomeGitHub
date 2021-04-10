import fetch from 'node-fetch';
import { config } from '../config';

const { githubUrl } = config;

export class GitHubDataAccess {
 private headers: { Accept: string; Authorization: string };

 constructor(token: string) {
  this.headers = { Accept: 'application/json', Authorization: 'token ' + token };
 }

 apiRequest = async reqUrl => {
  try {
   const response = await fetch(`${githubUrl}/${reqUrl}`, this.headers);
   return response.text();
  } catch (err) {
   console.error(err);
   return [];
  }
 };
}
