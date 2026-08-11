import { Terminal } from 'lucide-react';
import { useState } from 'react';

import { Tooltip } from '@/components/ui/tooltip';
import { SystemLogDrawer } from '@/features/system/components/SystemLogDrawer';

export function SystemLogToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip content="System Event Logs" side="bottom">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open System Event Logs Terminal"
          className="relative flex items-center gap-1.5 rounded-md border border-border p-2 text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text"
        >
          <Terminal aria-hidden className="size-4" />
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
        </button>
      </Tooltip>

      <SystemLogDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
