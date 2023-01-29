import { Octokit } from "octokit";

/**
 * This file is the interface to interact with the GitHub REST API.
 */

export const octokit = new Octokit({
	  auth: process.env.NEXT_PUBLIC_GITHUB_AUTH_KEY,
});

export const getBranches = async (owner: string, repo: string,  ) => {
	  const response = await octokit.request(`GET /repos/${owner}/${repo}/branches`, {
		owner: owner,
		repo: repo,
	  });
	  return response;
}

export const getStars = async (owner: string, repo: string ) => {
	  const response = await octokit.request(`GET /repos/${owner}/${repo}`, {
		owner: owner,
		repo: repo,
	  });
	  return response.data.stargazers_count;
}
