"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/src/firebase";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorsPanel } from "./EditorsPanel";
import Image from "next/image";
import { GlitchImage } from "@/components/retro-portfolio";
import { ResumePanel } from "./ResumePanel";
import { House } from "lucide-react";

type Site = {
  id: string;
  name: string;
  url: string;
  createdAt?: unknown;
  ownerUid: string;
};

export default function AccountManagementPage() {
  const router = useRouter();
  const { user, initializing, logout, permissions } = useAuth();
  const [sites, setSites] = useState<Site[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!initializing && !user) {
      router.replace("/login");
    }
  }, [initializing, user, router]);

  useEffect(() => {
    if (!user || !permissions.canEditContent) return;
    const sitesRef = collection(db, "sites");
    const q = query(
      sitesRef,
      where("ownerUid", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const next: Site[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Site, "id">),
      }));
      setSites(next);
    });
    return () => unsub();
  }, [user, permissions.canEditContent]);

  const disabled = useMemo(() => !name.trim() || !url.trim(), [name, url]);

  const addSite = async () => {
    if (!user || !permissions.canEditContent) return;
    const sitesRef = collection(db, "sites");
    await addDoc(sitesRef, {
      name: name.trim(),
      url: url.trim(),
      ownerUid: user.uid,
      createdAt: serverTimestamp(),
    });
    setName("");
    setUrl("");
  };

  const removeSite = async (id: string) => {
    await deleteDoc(doc(db, "sites", id));
  };

  if (!user && initializing) {
    return null;
  }

  if (user && !permissions.canEditContent && !initializing) {
    return (
      <div className="min-h-screen bg-[#0B1113] text-green-400 flex items-center justify-center">
        <div className="p-6 border border-green-600 rounded-md max-w-sm w-full text-center">
          <h1 className="text-xl mb-2">Not authorized</h1>
          <p className="opacity-80 mb-4">
            Your account is not permitted to edit this site.
          </p>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1113] text-green-400">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <a
            className="underline flex items-center flex-1"
            href="/"
            rel="noreferrer"
          >
            <House />
          </a>
          <h1 className="text-2xl flex-1">Account Management</h1>
          <div className="flex flex-1 gap-2 items-center justify-end">
            {user?.photoURL && (
              <Image
                src={user?.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full"
                width={8}
                height={8}
              />
            )}
            <span
              className="text-sm opacity-80 font-bold cursor-pointer"
              title={user?.email ?? ""}
            >
              {user?.displayName}
            </span>
          </div>
        </div>

        <ResumePanel />
        <EditorsPanel />
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={logout} className="w-full">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
