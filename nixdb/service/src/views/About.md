One of the advantages of **Nix** is the ability to install / use packages in
**isolated environments** from the host system:

```bash
# Version installed in my host system
$ python3 --version

  Python 3.8.5

# Launch a Nix Shell with a different version of the package
$ nix-shell -p python39

  # Version installed in the Nix shell
  nix-shell $ python3 --version

              Python 3.9.0
```

Sometime ago while migrating an old **Kubernetes** cluster
I found in the need of having two different versions of **Kubernetes Helm**
to deal with different kind of deployments.

**Nix** allows us to install / use different versions of a package side-by-side
in the host system.

So let's search the versions that Nix offers to us out-of-the-box:

```bash
# Query the <nixpkgs> set in the host system
$ nix-env -q --available --description | grep helm

  helm-3.3.4  A package manager for kubernetes
```

Problem is that **nix-channels** usually offer a single version of a package,
so... What to do?

Sadly,
there is no native way of searching the Nix history for all versions of a package.

The good thing is that you are currently at the Nixpkgs Database!
We index every piece of the Nixpkgs history in order to provide versions lookups:

```text
Attribute        Description                       Versions  License
kubernetes-helm  A package manager for kubernetes  30        Apache License 2.0

  https://kamadorueda.github.io/nixpkgs-db/#/pkg/kubernetes-helm/3.4.0
  https://kamadorueda.github.io/nixpkgs-db/#/pkg/kubernetes-helm/3.3.4
  https://kamadorueda.github.io/nixpkgs-db/#/pkg/kubernetes-helm/3.3.1
  ...
```

And cool badges that you can add to your project:

[![](https://img.shields.io/endpoint?color=brightgreen&label=Kubernetes+Helm&labelColor=grey&logo=NixOS&logoColor=white&style=flat&url=https%3A%2F%2Fraw.githubusercontent.com%2Fkamadorueda%2Fnixpkgs-db%2Flatest%2Fdata%2Fbadges%2Fkubernetes-helm.json)](https://kamadorueda.github.io/nixpkgs-db/#/pkg/kubernetes-helm)

We even give you the command to install the version you want in your system!

```bash
# Launch a Nix Shell with version 3.4.0 found in Nixpkgs Database
$ nix-shell -p kubernetes-helm -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/0126c86672b7d14843225df16ddfefd7091eabe7.tar.gz

  # Version installed in the Nix shell
  nix-shell $ helm version

              version.BuildInfo{Version:"v3.4.0", GitCommit:"", GitTreeState:"", GoVersion:"go1.15.3"}
```

And these commands are also available for all versions that ever existed for this package:

```bash
# Launch a Nix Shell with version 2.6.1 found in Nixpkgs Database
$ nix-shell -p kubernetes-helm -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/01a664e7793158b434fefac9217ec48313b2dd45.tar.gz

  # Version installed in the Nix shell
  nix-shell $ helm version

              Client: &version.Version{SemVer:"v2.6.1", GitCommit:"bbc1f71dc03afc5f00c6ac84b9308f8ecb4f39ac", GitTreeState:"clean"}
```

This project is entirely [Free and Open Source Software](https://en.wikipedia.org/wiki/FOSS)!

You can read more about the technical details [here](https://www.patreon.com/posts/creating-zero-43586691).

And by the way, we welcome [contributions](/nixpkgs-db/#/contributing) :)
