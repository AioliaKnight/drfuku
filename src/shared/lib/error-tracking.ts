type ErrorDetails = {
  message: string
  stack: string | undefined
  componentStack: string | undefined
  context: Record<string, unknown> | undefined
}

// 發送錯誤到分析工具
const sendError = (error: ErrorDetails) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'error', {
      event_category: 'Error',
      event_label: error.message,
      error_details: JSON.stringify({
        stack: error.stack,
        componentStack: error.componentStack,
        context: error.context
      })
    })
  }
}

// 處理未捕獲的錯誤
export const handleUncaughtError = (error: Error) => {
  console.error('Uncaught error:', error)

  sendError({
    message: error.message,
    stack: error.stack,
    componentStack: undefined,
    context: undefined
  })
}

// 處理未處理的 Promise 拒絕
export const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
  console.error('Unhandled promise rejection:', event.reason)

  sendError({
    message: event.reason?.message || 'Promise rejected',
    stack: event.reason?.stack,
    componentStack: undefined,
    context: undefined
  })
}

// 處理組件錯誤
export const handleComponentError = (
  error: Error,
  componentStack: string,
  context?: Record<string, unknown>
) => {
  console.error('Component error:', error)

  sendError({
    message: error.message,
    stack: error.stack,
    componentStack,
    context
  })
}

// 初始化錯誤追蹤
export const initErrorTracking = () => {
  if (typeof window === 'undefined') return

  // 監聽未捕獲的錯誤
  window.addEventListener('error', (event) => {
    handleUncaughtError(event.error)
  })

  // 監聽未處理的 Promise 拒絕
  window.addEventListener('unhandledrejection', (event) => {
    handleUnhandledRejection(event)
  })
}

// 創建錯誤邊界的錯誤處理器
export const createErrorBoundaryHandler = (
  componentName: string,
  context?: Record<string, unknown>
) => {
  return (error: Error, componentStack: string) => {
    handleComponentError(error, componentStack, {
      componentName,
      ...context
    })
  }
}
