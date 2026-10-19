import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Nusantara Game Engine Error caught by boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0e0805] text-amber-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-stone-900/95 border-2 border-amber-600/70 rounded-3xl p-6 text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950/80 border border-amber-500/60 flex items-center justify-center shadow-inner">
              <ShieldAlert className="w-8 h-8 text-amber-400" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-serif font-black text-amber-200">
                Takhta Mengalami Pemulihan Siasat
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                Terjadi ketidakselarasan data pada putaran permainan. Sistem keamanan kraton telah mengamankan catatan sejarah Anda.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 text-stone-950 font-serif font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Pulihkan & Lanjutkan Permainan</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
