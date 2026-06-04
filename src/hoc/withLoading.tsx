import { useEffect, useState } from "react";

export default function withLoading<
  P extends object
>(
  Component: React.ComponentType<P>
) {
  return function WrappedComponent(
    props: P
  ) {
    const [loading, setLoading] =
      useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () =>
        clearTimeout(timer);
    }, []);

    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h2>Loading...</h2>
        </div>
      );
    }

    return <Component {...props} />;
  };
}