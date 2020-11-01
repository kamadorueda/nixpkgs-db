# Searching and installing many versions of Nix packages

One of the advantages of **Nix** is the ability to install / use packages in
**isolated environments** from the host system:

```sh
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
I found in the need of having two different versions of **Helm**
in order to deal with **legacy** and **recent** deployments.

The solution is trivial: Use **Nix** to install the two versions!

So let's search the versions that Nix offers to us:

```sh
$ nix-env -q --available --description | grep helm

  helm-3.3.4  A package manager for kubernetes
```

Problem is that nix-channels usually offer a single version of a package.

¿So what to do?

Sadly,
there is no native way of searching the Nix history for all versions of a package.

So the community has come up with initiatives:

- [Nixpkgs Database](/nixpkgs-db)
- [nix-package-revisions](https://lazamar.github.io/download-specific-package-version-with-nix)

That index the Nixpkgs history in order to provide versions lookups:

```
Attribute        Description                       Versions  License
kubernetes-helm  A package manager for kubernetes  30        Apache License 2.0

  kubernetes-helm v3.4.0
  kubernetes-helm v3.1.1
  kubernetes-helm v3.1.0
  kubernetes-helm v3.0.3
  kubernetes-helm v3.0.1
  kubernetes-helm v2.9.1
  kubernetes-helm v2.6.1
  ...
```

They even give you the commands to install in your system the package!

```sh
# Version installed in my host system
$ helm version

  Command 'helm' not found

# Launch a Nix Shell with a one of the versions found in Nixpkgs Database
$ nix-shell -p kubernetes-helm -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/0126c86672b7d14843225df16ddfefd7091eabe7.tar.gz

  # Version installed in the Nix shell
  nix-shell $ helm version

    version.BuildInfo{Version:"v3.4.0", GitCommit:"", GitTreeState:"", GoVersion:"go1.15.3"}

# Launch a Nix Shell with another of the versions found in Nixpkgs Database
$ nix-shell -p kubernetes-helm -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/01a664e7793158b434fefac9217ec48313b2dd45.tar.gz

  # Version installed in the Nix shell
  nix-shell $ helm version

    Client: &version.Version{SemVer:"v2.6.1", GitCommit:"bbc1f71dc03afc5f00c6ac84b9308f8ecb4f39ac", GitTreeState:"clean"}
```

This project is entirely **Open Source**!

We welcome [contributions](/nixpkgs-db/#/contributing) :)
