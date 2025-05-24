export type PermissionCategory = Record<string, string[]>;

export interface Role {
  id:string;
  name: string;
  description: string;
  permissions: string[];
}
