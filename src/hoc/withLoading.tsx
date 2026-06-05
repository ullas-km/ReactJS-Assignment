import React from "react";

type WithLoadingProps = {
  loading: boolean;
};

export default function withLoading<P extends object>(
  Component: React.ComponentType<P>,
) {
  return function WrappedComponent(props: P & WithLoadingProps) {
    const { loading, ...rest } = props;

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

    return <Component {...(rest as P)} />;
  };
}
