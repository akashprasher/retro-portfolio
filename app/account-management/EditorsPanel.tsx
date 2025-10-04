"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/src/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";

type Editor = {
  id: string; // email as id for display, backing doc id not necessarily email
  email: string;
  isSuperAdmin?: boolean;
  isAdmin?: boolean;
};

export function EditorsPanel() {
  const { permissions } = useAuth();
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [editors, setEditors] = useState<Editor[]>([]);

  useEffect(() => {
    if (!permissions.canManageEditors) return;
    const ref = collection(db, "editors");
    const q = query(ref, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setEditors(
        snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            email: data?.email || d.id,
            isAdmin: Boolean(data?.isAdmin),
            isSuperAdmin: Boolean(data?.isSuperAdmin),
          };
        })
      );
    });
    return () => unsub();
  }, [permissions.canManageEditors]);

  const disabled = useMemo(() => !email.trim(), [email]);

  const addEditor = async () => {
    const e = email.trim().toLowerCase();
    if (!e) return;
    await setDoc(
      doc(db, "editors", e),
      {
        email: e,
        isAdmin,
        isSuperAdmin: false,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
    setEmail("");
    setIsAdmin(true);
  };

  const removeEditor = async (id: string, isSuperAdmin?: boolean) => {
    if (isSuperAdmin) return; // cannot remove super admin via app
    await deleteDoc(doc(db, "editors", id));
  };

  if (!permissions.canManageEditors) return null;

  return (
    <div className="border border-green-600 rounded-md p-4 mt-6">
      <h2 className="text-lg mb-3">Editors</h2>
      <div className="flex gap-3 mb-3">
        <Input
          placeholder="editor@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={addEditor} disabled={disabled}>
          Add Editor
        </Button>
      </div>

      <ul className="space-y-2">
        {editors.map((ed) => (
          <li
            key={ed.id}
            className="flex items-center justify-between border border-green-700 rounded p-2"
          >
            <div>
              <div className="font-semibold">{ed.email}</div>
              <div className="text-xs opacity-80">
                {ed.isSuperAdmin
                  ? "Super Admin"
                  : ed.isAdmin
                  ? "Admin"
                  : "Viewer"}
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={() => removeEditor(ed.id, ed.isSuperAdmin)}
              disabled={ed.isSuperAdmin}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
