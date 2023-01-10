import AuthGuard from "./auth.guard";

/**
 * Guard collector.
 * Provides a single entry point for all other Guard wrappers.
 * @param {*} props - React props
 * @returns React component wrapped in a guards.
 */
export default function RootGuard(props) {
  const { component, authorised } = props;

  const GuardedComponent = () => {
    let guarded;
    if (authorised && authorised.length > 0) {
      guarded = <AuthGuard component={component} role={authorised} />;
    }
    return guarded;
  };

  return <GuardedComponent />;
}
