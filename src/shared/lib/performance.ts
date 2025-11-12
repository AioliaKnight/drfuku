type PerformanceMetric = {
  name: string
  value: number
  category: string
  label?: string | undefined
}

// 發送性能指標到分析工具
const sendMetric = (metric: PerformanceMetric) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'timing_complete', {
      name: metric.name,
      value: Math.round(metric.value),
      event_category: metric.category,
      ...(metric.label && { event_label: metric.label })
    })
  }
}

// 監控頁面加載性能
export const measurePageLoad = () => {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
      // 使用 requestIdleCallback 在瀏覽器空閒時執行
      const scheduleMetrics = (callback: () => void) => {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(callback)
        } else {
          setTimeout(callback, 0)
        }
      }

      scheduleMetrics(() => {
        const timing = window.performance.timing
        const navigationStart = timing.navigationStart

        // 頁面加載時間
        sendMetric({
          name: 'page_load',
          value: timing.loadEventEnd - navigationStart,
          category: 'Performance',
          label: 'Total Load Time'
        })

        // DOM 內容加載時間
        sendMetric({
          name: 'dom_content_loaded',
          value: timing.domContentLoadedEventEnd - navigationStart,
          category: 'Performance',
          label: 'DOM Content Loaded'
        })

        // 首次渲染時間
        sendMetric({
          name: 'first_paint',
          value: timing.domInteractive - navigationStart,
          category: 'Performance',
          label: 'First Paint'
        })

        // DNS 解析時間
        sendMetric({
          name: 'dns',
          value: timing.domainLookupEnd - timing.domainLookupStart,
          category: 'Performance',
          label: 'DNS Lookup'
        })

        // TCP 連接時間
        sendMetric({
          name: 'tcp',
          value: timing.connectEnd - timing.connectStart,
          category: 'Performance',
          label: 'TCP Connection'
        })

        // 伺服器響應時間
        sendMetric({
          name: 'ttfb',
          value: timing.responseStart - timing.requestStart,
          category: 'Performance',
          label: 'Time to First Byte'
        })
      })
    }
  })
}

// 監控首次內容繪製(FCP)
export const measurePaintTiming = () => {
  if (typeof window === 'undefined') return

  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // 確保我們只處理一次每種類型的指標
          const metric = {
            name: entry.name,
            value: entry.startTime,
            category: 'Paint Metrics'
          }

          sendMetric(metric)
        }
      })

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] })
    } catch (e) {
      console.error('Performance Observer error:', e)
    }
  }
}

// 監控長任務
export const measureLongTasks = () => {
  if (typeof window === 'undefined') return

  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          sendMetric({
            name: 'long_task',
            value: entry.duration,
            category: 'Performance',
            label: 'Long Task Duration'
          })
        })
      })

      observer.observe({ entryTypes: ['longtask'] })
    } catch (e) {
      console.error('Long Task Observer error:', e)
    }
  }
}

// 監控資源加載
export const measureResourceTiming = () => {
  if (typeof window === 'undefined') return

  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry instanceof PerformanceResourceTiming) {
            sendMetric({
              name: 'resource_load',
              value: entry.duration,
              category: 'Resource Timing',
              label: entry.name
            })
          }
        })
      })

      observer.observe({ entryTypes: ['resource'] })
    } catch (e) {
      console.error('Resource Timing Observer error:', e)
    }
  }
}

// 初始化所有性能監控
export const initPerformanceMonitoring = () => {
  measurePageLoad()
  measurePaintTiming()
  measureLongTasks()
  measureResourceTiming()
}

// 獲取性能監控腳本
export const getPerformanceMonitoringScript = () => `
  // 監控頁面加載性能
  window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
      setTimeout(function() {
        const timing = window.performance.timing;
        const navigationStart = timing.navigationStart;
        const loadTime = timing.loadEventEnd - navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - navigationStart;

        // 發送性能數據到分析工具
        if (window.gtag) {
          gtag('event', 'timing_complete', {
            name: 'load',
            value: loadTime,
            event_category: 'Performance'
          });
          gtag('event', 'timing_complete', {
            name: 'dom_content_loaded',
            value: domContentLoaded,
            event_category: 'Performance'
          });
        }
      }, 0);
    }
  });

  // 監控首次內容繪製(FCP)
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          if (window.gtag) {
            gtag('event', 'timing_complete', {
              name: 'fcp',
              value: entry.startTime,
              event_category: 'Performance'
            });
          }
        }
      }
    });
    observer.observe({ entryTypes: ['paint'] });
  }
`
