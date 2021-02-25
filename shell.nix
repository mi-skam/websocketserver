{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-14_x
    python3Packages.python
    # keep this line if you use bash
    bashInteractive
  ];

  shellHook = ''
    export PATH="/home/plumps/.npm-packages/bin:$PATH"
  '';

  NPM_CONFIG_PREFIX = "/home/plumps/.npm-packages";
}
