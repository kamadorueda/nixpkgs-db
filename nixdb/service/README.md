# Developing the website locally

1.  Install dependencies:

    ```sh
    nixpkgs-db/service $ npm install
    ```

1.  Start the development server:

    ```sh
    nixpkgs-db/service $ npm run start
    ```

    This will open a new browser tab
    that will auto-reload on each change you make to the source code

1.  Hack the code! Add your features, bug-fixes, etc

# Creating a Pull Request

This step is only required once you are happy with your changes and you feel ready to make them available to the community:

1.  Build the production website

    ```sh
    nixpkgs-db/service $ npm run build
    ```

    This will output some auto-generated files to [../docs](../docs)

1.  Commit your changes and create a PR!

    Please remember to add the docs and service folder.
    Thanks for your contribution!
