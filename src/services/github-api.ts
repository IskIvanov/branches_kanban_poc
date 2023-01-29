import { Octokit } from "@octokit";
// Get a token from Github
// Connect to the GitHub API
// Add a function to call the github endpoints

export const octokit = new Octokit({
	  auth: process.env.GITHUB_TOKEN,
});