# Git

## Content Delivery

- All features and fixes are developed in a new branch forked from dev branch
- A PR is created to merge the new developments to the main branch
- A merge to main branch must trigger a deployment to dev environment
- After the features have been tested in dev environment we create a PR to staging branch
- A merge to staging branch must trigger a deployment to staging environment
- The creation of a tag triggers a deployment to production environment

## PR

- Rebase your code before creating the PR instead of pulling changes from master
- Description of PR must have
  - a summary of everything that was done
  - the ticket link
  - The type of change (feature/fix)
  - an evidence of the feature working
    - Snapshots/videos of the UI for frontend
    - Snapshots/videos of API documentation
