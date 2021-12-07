export function devWarning(component: string, message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[antd-mobile: ${component}] ${message}`);
  }
}

export function devError(component: string, message: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[antd-mobile: ${component}] ${message}`);
  }
}
