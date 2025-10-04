"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const { user, initializing, signInWithGoogle, permissions } = useAuth();

  useEffect(() => {
    if (!initializing && user && permissions.canEditContent) {
      router.replace("/account-management");
    }
  }, [user, permissions.canEditContent, initializing, router]);

  const handleLogin = async () => {
    await signInWithGoogle();
    // Redirect is handled by the effect only for editors
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1113] text-green-400">
      <div className="p-6 border border-green-600 rounded-md max-w-sm w-full text-center">
        <h1 className="text-xl mb-4">Sign in</h1>
        {user && !permissions.canEditContent && (
          <p className="text-sm mb-3 opacity-80">
            You are signed in as {user.email}. You are not authorized to edit.
          </p>
        )}
        <Button onClick={handleLogin} variant="default" className="w-full">
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
