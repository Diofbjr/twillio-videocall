import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/global";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <GlobalStyle/>
          <Component {...pageProps} />
      </>
    );
  }
}
