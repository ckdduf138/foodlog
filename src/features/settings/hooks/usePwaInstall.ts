import { useEffect, useState, useCallback } from "react";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const usePwaInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const evt = e as BeforeInstallPromptEvent;
      evt.preventDefault?.();
      setDeferredPrompt(evt);
      setSupported(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as EventListener);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return false;
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return choice.outcome === "accepted";
    } catch {
      return false;
    }
  }, [deferredPrompt]);

  return { supported, install, promptAvailable: !!deferredPrompt } as const;
};

export default usePwaInstall;
