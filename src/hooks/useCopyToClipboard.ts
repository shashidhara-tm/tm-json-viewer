import { useCallback, useEffect, useRef, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'error';

const RESET_DELAY_MS = 1500;

async function writeToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for environments without the async Clipboard API (older browsers, insecure contexts).
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    const ok = document.execCommand('copy');
    if (!ok) throw new Error('execCommand copy failed');
  } finally {
    document.body.removeChild(textarea);
  }
}

export function useCopyToClipboard(): [CopyStatus, (text: string) => void] {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback((text: string) => {
    writeToClipboard(text)
      .then(() => setStatus('copied'))
      .catch(() => setStatus('error'));

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus('idle'), RESET_DELAY_MS);
  }, []);

  return [status, copy];
}
