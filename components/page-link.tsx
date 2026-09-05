import type { ComponentPropsWithoutRef } from 'react';

// Full-document navigation avoids the broken dynamic navigation exports in
// vinext beta.5 production chunks. Keep menu and review links usable directly.
export function PageLink({ children, ...props }: ComponentPropsWithoutRef<'a'>) {
  return <a {...props}>{children}</a>;
}
