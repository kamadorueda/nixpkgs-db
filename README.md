# Nixpkgs Database

A database with packages at all versions, from all channels.

The service is hosted at: https://kamadorueda.github.io/nixpkgs-db/

## Repository structure

- **build/** bash and nix scripts to wrap common operations over the repository.
- **data/** JSON documents that constitute the database, used by the website.
- **docs/** auto-generated folder with artifacts to deploy the website on GitHub pages.
- **nix/** auto-generated folder by [niv](https://github.com/nmattia/niv).
- **service/** source-code of the website deployed at GitHub pages,
  written in **React** and **Javascript**.

## Developing the website

All commands require you to be on the **service** folder

Check out the documentation there: [service/README.md](./service/README.md).
