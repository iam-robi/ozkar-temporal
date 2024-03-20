# Custom Search Attributes

add the required custom search attributes to the temporal cluster:

```bash
temporal operator namespace create ozkar-dev && temporal operator search-attribute create --name ResourceId --type Keyword --namespace ozkar-dev && temporal operator search-attribute create --name PublicKey --type Keyword --namespace ozkar-dev
```


## Running the code

Install dependencies with `npm install`.

Run `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation).

UI should be available at http://localhost:8233

The `package.json` file contains scripts for running the client, the Worker, and tests.

1. In a shell, run `npm run start.watch` to start the Worker and reload it when code changes.
1. In another shell, run `npm run workflow` to run the Workflow Client.
1. Run `npm run format` to format your code according to the rules in `.prettierrc`.
1. Run `npm run lint` to lint your code according to the rules in `eslintrc.js`.
1. Run `npm test` to run the tests.
