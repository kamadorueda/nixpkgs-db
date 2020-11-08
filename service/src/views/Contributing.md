This site is run by the effort of the community,
you can be part of it!

We genuinely appreciate people who are trying to improve this database.

**Contributing examples**

There are many ways to contribute, not necessarily technical:

- Tell other people of the work being done here.
- Star or fork the [repository](https://github.com/kamadorueda/nixpkgs-db),
  this help us with funding and popularity.
- ~~The search engine is naive (currently a `String.contains`).
  It would be awesome to use a modern algorithm.~~.

  Now we use a mix of Levenshtein distance with grep behavior!
- Expanding the database size:

  There are currently 280k+ commits in the nixpkgs repository,
  we've only processed ~100k.

  Expanding it is simple, though it consumes a little bit of machine resources:

  - Clone the nixpkgs-db repository.
  - Execute: `nixpkgs-db $ ./build/sync.sh`
  - Commit your data folder and create a PR: `nixpkgs-db $ git add data/`

  The process is differential, once a commit is processed it's ignored in future
  executions.
- Help us improve the user interface.
- Help us write the [CLI](https://github.com/kamadorueda/nixpkgs-db/tree/latest/cli).
- Fire up an issue! we welcome ideas, feature requests and problems.
- [Become a sponsor of the project](/nixpkgs-db/#/sponsor).
