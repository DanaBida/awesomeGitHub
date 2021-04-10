import fetch from 'node-fetch';
// import { rateLimitHandler } from 'fetch-rate-limit-util';

export class GitHubDataAccess {
 private headers: { Accept: string; Authorization: string };

 constructor(token: string) {
  this.headers = { Accept: 'application/json', Authorization: 'token ' + token };
 }

 apiRequest = async (reqUrl, isJson = true) => {
  try {
   //    const response = await rateLimitHandler(() => fetch(reqUrl, this.headers));
   const response = await fetch(reqUrl, this.headers);

   return isJson ? response.json() : response.text();
  } catch (err) {
   console.error(err);
   return undefined;
  }
 };
}
