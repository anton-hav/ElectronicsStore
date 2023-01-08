import AuthGuard from "./auth.guard";

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
