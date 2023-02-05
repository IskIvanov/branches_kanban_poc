
# GitHub Repository Kanban
### A proof of concept application for an overview of the active branches on a GitHub repository.

## Features
- Input a GitHub repository URL and view basic repository information
- View and move active branches between three columns: "In Progress", "Ready for Review", and "Ready to Merge"
- State of the kanban is persisted locally in the browser

## Technology Stack
- React
- TypeScript
- GitHub API
- Material UI


---
## Run locally
First, run the development server:

1. Clone the repository: git clone https://github.com/iskivanov/github-repository-kanban.git
2. Change directory: cd github-repository-kanban
3. Install dependencies: `yarn add` or `npm install`
4. Start the application:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

---
### API Reference
GitHub API documentation: https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api

### Contributing
This is a proof of concept project, pull requests are welcome.


### Author
Iskren Ivanov
