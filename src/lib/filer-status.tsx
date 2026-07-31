import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { FilerStatus } from "./taxRates";

const KEY = "ftp-filer-status";

interface Ctx {
  status: FilerStatus;
  setStatus: (s: FilerStatus) => void;
}

const FilerStatusContext = createContext<Ctx>({ status: "non-filer", setStatus: () => {} });

export function FilerStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatusState] = useState<FilerStatus>("non-filer");

  useEffect(() => {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "filer" || saved === "non-filer") setStatusState(saved);
  }, []);

  const setStatus = (s: FilerStatus) => {
    setStatusState(s);
    try {
      window.localStorage.setItem(KEY, s);
    } catch {
      /* storage unavailable — status still works for this session */
    }
  };

  return (
    <FilerStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </FilerStatusContext.Provider>
  );
}

export function useFilerStatus() {
  return useContext(FilerStatusContext);
}
