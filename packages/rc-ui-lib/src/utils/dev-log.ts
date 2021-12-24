export function devWarning(component: string, message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[${component}] ${message}`);
  }
}

export function devError(component: string, message: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${component}] ${message}`);
  }
}
