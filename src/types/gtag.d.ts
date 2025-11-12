declare global {
  interface Window {
    gtag: (
      command: 'event',
      action: string,
      params: {
        name?: string
        value?: number
        event_category?: string
        event_label?: string
        [key: string]: string | number | boolean | undefined
      }
    ) => void
  }
}

export {};
