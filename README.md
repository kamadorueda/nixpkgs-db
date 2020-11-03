# Nixpkgs Database

A database with packages from all versions, all commits and all channels.

The service is hosted at: https://kamadorueda.github.io/nixpkgs-db/

## Repository structure

- **build/** bash and nix scripts to wrap common operations over the repository.
- **data/** JSON documents that constitute the database, used by the website.
- **docs/** auto-generated folder with artifacts to deploy the website on GitHub pages.
- **nix/** auto-generated folder by [niv](https://github.com/nmattia/niv).
- **service/** source-code of the website deployed at GitHub pages,
  written in **React** and **Javascript**.

## Developing the website

```sh
# All commands require you to be on the service folder
cd nixpkgs-db/service

# Before everything you'll need to install dependencies
nixpkgs-db/service $ npm install

# Start a development server at http://localhost:3000/nixpkgs-db/
nixpkgs-db/service $ npm run start

# Build the website artifacts
# PR the docs/ and service/ folders once you feel happy with your changes!
nixpkgs-db/service $ npm run build
```
