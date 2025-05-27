export function formatPermission(permission: string): string {
  return permission
    .replace(/\//g, " ") // remove slashes
    .replace(/_/g, " ") // replace underscores with space
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
