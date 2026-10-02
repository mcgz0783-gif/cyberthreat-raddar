import { Component, type ErrorInfo, type ReactNode } from "react";
import { HeroGlobeFallback } from "./HeroGlobeFallback";

type Props = { children: ReactNode };
type State = { failed: boolean };

export class HeroSceneBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // The accessible page remains fully usable through the lightweight fallback.
  }

  render() {
    return this.state.failed ? <HeroGlobeFallback /> : this.props.children;
  }
}
