"use client";

import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/firebase";
import { redirect } from "next/navigation";

export default async function Resume() {
  const [error, setError] = useState("");
  const debug: Record<string, unknown> = {
    isServer: typeof window === "undefined",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    docPath: "settings/resume",
  };

  try {
    const ref = doc(db as any, "settings", "resume");
    const snap = await getDoc(ref);
    debug.snapExists = snap.exists();
    const data = snap.exists() ? (snap.data() as any) : null;
    debug.dataKeys = data ? Object.keys(data) : [];
    const url = (data?.url ?? null) as string | null;
    debug.url = url;
    if (url && typeof url === "string" && url.startsWith("http")) {
      redirect(url);
    }
  } catch (e: any) {
    // Let Next.js handle server redirects
    if (
      e?.digest &&
      typeof e.digest === "string" &&
      e.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw e;
    }
    debug.error = e?.message || String(e);
    setError(`Something went wrong: ${debug.error as string}`);
  }

  return (
    <div style={{ padding: 16 }}>
      <div>{error}</div>
      {/* <pre style={{ marginTop: 12, fontSize: 12 }}>
        {JSON.stringify(debug, null, 2)}
      </pre> */}
    </div>
  );
}
