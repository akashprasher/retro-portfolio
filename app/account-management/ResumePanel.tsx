"use client";

import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { ExternalLink } from "lucide-react";

export function ResumePanel() {
  const { permissions } = useAuth();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const ref = doc(db, "settings", "resume");
        const snap = await getDoc(ref);
        const data = (snap.exists() ? (snap.data() as any) : null) || {};
        if (!active) return;
        setUrl(data.url || "");
      } catch (e: any) {
        if (!active) return;
        setError(e?.message || "Failed to load resume link");
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const disabled = useMemo(() => !url.trim() || loading, [url, loading]);

  const save = async () => {
    setLoading(true);
    setError("");
    try {
      const ref = doc(db, "settings", "resume");
      await setDoc(
        ref,
        {
          url: url.trim(),
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (e: any) {
      setError(e?.message || "Failed to save resume link");
    } finally {
      setLoading(false);
    }
  };

  if (!permissions.canEditContent) return null;

  return (
    <div className="border border-green-600 rounded-md p-4 mt-6">
      <h2 className="text-lg mb-3">Resume Link</h2>
      {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
      <div className="flex gap-3">
        <Input
          placeholder="https://... (Google Drive/Docs, PDF, etc.)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {url && (
          <a
            className="underline flex items-center"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink height={20} width={20} />
          </a>
        )}
        <Button onClick={save} disabled={disabled}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
