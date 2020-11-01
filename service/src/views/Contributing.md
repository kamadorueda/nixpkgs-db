This site is run by the effort of the community,
you can be part of it!

We genuinely appreciate people who are trying to improve this database.

**Contributing examples**

There are many ways to contribute, not necessarily technical:

- Tell other people of the work being done here.
- [Sponsor](https://patreon.com/kamadorueda) the project.
- Star or fork the [repository](https://github.com/kamadorueda/nixpkgs-db) so other people can find us easier.
- The search engine is naive (currently a `String.contains`).
  It would be awesome to use a modern algorithm.
- Expanding the database size:

  There are currently 280k+ commits in the nixpkgs repository,
  we've only processed ~10k.

  Expanding it is simple, though it consumes a little bit of machine resources:

  - Clone the nixpkgs-db repository.
  - Execute: `./build/sync.sh`
  - Commit your `nixpkgs-db/data/` folder and create a PR.

  The process is differential, once a commit is processed it's ignored in future
  executions.
- Help us improve the user interface.
- Fire up an issue! we welcome ideas, feature requests and problems.
