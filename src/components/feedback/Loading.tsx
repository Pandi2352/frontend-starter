import { Spinner } from '@/components/ui/spinner';

interface LoadingProps {
  label?: string;
  fullScreen?: boolean;
}

export function Loading({ label = 'Loading…', fullScreen = false }: LoadingProps) {
  return (
    <div
      className={
        fullScreen
          ? 'flex min-h-dvh flex-col items-center justify-center gap-3 bg-background'
          : 'flex flex-col items-center justify-center gap-3 p-10'
      }
    >
      <Spinner size="lg" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
