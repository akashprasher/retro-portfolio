// Role and permission helpers (Firestore-only)
import { db } from "@/src/firebase";
import { doc, getDoc } from "firebase/firestore";

export type UserRoles = {
  superUser: boolean;
  admin: boolean;
};

export async function fetchUserRoles(
  email?: string | null
): Promise<UserRoles> {
  if (!email) return { superUser: false, admin: false };
  try {
    const ref = doc(db, "editors", email.toLowerCase());
    const snap = await getDoc(ref);
    if (!snap.exists()) return { superUser: false, admin: false };
    const data = snap.data() as { isSuperAdmin?: boolean; isAdmin?: boolean };
    return {
      superUser: Boolean(data.isSuperAdmin),
      admin: Boolean(data.isAdmin),
    };
  } catch {
    return { superUser: false, admin: false };
  }
}

export function derivePermissions(roles: UserRoles) {
  const isSuperUser = roles.superUser === true;
  const isAdmin = roles.admin === true;
  return {
    isSuperUser,
    isAdmin,
    canEditContent: isSuperUser || isAdmin,
    canManageEditors: isSuperUser,
  } as const;
}
