import type { KeyboardEvent, MouseEvent } from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { CheckIcon, CopyIcon } from './icons';

export interface CopyButtonProps {
  getText: () => string;
  label: string;
  className?: string;
}

export function CopyButton({ getText, label, className }: CopyButtonProps): JSX.Element {
  const [status, copy] = useCopyToClipboard();

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    copy(getText());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    // Prevent the click from bubbling into a parent row's expand/collapse key handler.
    if (event.key === 'Enter' || event.key === ' ') {
      event.stopPropagation();
    }
  };

  return (
    <button
      type="button"
      className={`jv-copy${className ? ` ${className}` : ''}${status === 'copied' ? ' jv-copy-active' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={status === 'copied' ? `Copied ${label}` : `Copy ${label}`}
      title={status === 'copied' ? 'Copied!' : 'Copy to clipboard'}
    >
      {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}
