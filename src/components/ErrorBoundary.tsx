import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  declare props: Readonly<Props>;

  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center gap-1.5 text-rose-500/80 bg-rose-500/10 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider">
          <span>ERROR LOADING INDICES</span>
        </div>
      );
    }

    return (this as unknown as { props: Props }).props.children;
  }
}
