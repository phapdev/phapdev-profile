import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-base text-accent p-4">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-primary mb-4">
              ⚠️ Đã xảy ra lỗi
            </h1>
            <p className="text-lg mb-4">
              Xin lỗi, đã có lỗi không mong muốn xảy ra.
            </p>
            {this.state.error && (
              <details className="mb-4 text-left bg-base/50 p-4 rounded border border-primary/20">
                <summary className="cursor-pointer text-primary mb-2">
                  Chi tiết lỗi
                </summary>
                <pre className="text-sm text-accent/70 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-3 bg-primary/80 text-base font-bold rounded-md hover:bg-primary hover:shadow-[0_0_15px_rgba(0,255,255,0.7)] transition-all"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

