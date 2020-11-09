export const COLORS = [
  "blue",
  "blueviolet",
  "brightgreen",
  "green",
  "lightgrey",
  "orange",
  "red",
  "yellow",
  "yellowgreen",
];

export const STYLES = [
  "flat",
  "flat-square",
  "plastic",
  "for-the-badge",
];

export const badge = ({
  color = "green",
  label,
  labelColor = "grey",
  logo = "NixOS",
  logoColor = "white",
  pkg,
  style = "flat",
}) => {
  const url = new URL("https://img.shields.io/endpoint");

// https://img.shields.io/endpoint?color=success&logo=NixOS&logoColor=%23FFF&style=for-the-badge&url=https%3A%2F%2Fraw.githubusercontent.com%2Fkamadorueda%2Fnixpkgs-db%2Flatest%2Fdata%2Fbadges%2Ffoo.json

  url.searchParams.set("color", color);
  url.searchParams.set("label", label === undefined ? pkg : label);
  url.searchParams.set("labelColor", labelColor);
  url.searchParams.set("logo", logo);
  url.searchParams.set("logoColor", logoColor);
  url.searchParams.set("style", style);
  url.searchParams.set("url", `https://raw.githubusercontent.com/kamadorueda/nixpkgs-db/latest/data/badges/${pkg}.json`);

  return url.toString();
}
