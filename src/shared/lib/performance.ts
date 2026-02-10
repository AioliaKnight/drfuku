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

// 監控頁面加載性能（Navigation Timing L2）
export const measurePageLoad = () => {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    // 使用 requestIdleCallback 在瀏覽器空閒時執行
    const scheduleMetrics = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback)
      } else {
        setTimeout(callback, 0)
      }
    }

    scheduleMetrics(() => {
      const entries = performance.getEntriesByType('navigation')
      if (!entries.length) return

      const nav = entries[0] as PerformanceNavigationTiming

      // 頁面加載時間
      sendMetric({
        name: 'page_load',
        value: nav.loadEventEnd - nav.startTime,
        category: 'Performance',
        label: 'Total Load Time'
      })

      // DOM 內容加載時間
      sendMetric({
        name: 'dom_content_loaded',
        value: nav.domContentLoadedEventEnd - nav.startTime,
        category: 'Performance',
        label: 'DOM Content Loaded'
      })

      // DOM Interactive 時間
      sendMetric({
        name: 'dom_interactive',
        value: nav.domInteractive - nav.startTime,
        category: 'Performance',
        label: 'DOM Interactive'
      })

      // DNS 解析時間
      sendMetric({
        name: 'dns',
        value: nav.domainLookupEnd - nav.domainLookupStart,
        category: 'Performance',
        label: 'DNS Lookup'
      })

      // TCP 連接時間
      sendMetric({
        name: 'tcp',
        value: nav.connectEnd - nav.connectStart,
        category: 'Performance',
        label: 'TCP Connection'
      })

      // 伺服器響應時間（TTFB）
      sendMetric({
        name: 'ttfb',
        value: nav.responseStart - nav.requestStart,
        category: 'Performance',
        label: 'Time to First Byte'
      })
    })
  })
}

// 監控首次內容繪製(FCP)
export const measurePaintTiming = () => {
  if (typeof window === 'undefined') return

  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
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

// 獲取性能監控腳本（Navigation Timing L2）
export const getPerformanceMonitoringScript = () => `
  // 監控頁面加載性能（Navigation Timing L2）
  window.addEventListener('load', function() {
    setTimeout(function() {
      var entries = performance.getEntriesByType('navigation');
      if (!entries.length) return;
      var nav = entries[0];

      if (window.gtag) {
        gtag('event', 'timing_complete', {
          name: 'load',
          value: Math.round(nav.loadEventEnd - nav.startTime),
          event_category: 'Performance'
        });
        gtag('event', 'timing_complete', {
          name: 'dom_content_loaded',
          value: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
          event_category: 'Performance'
        });
        gtag('event', 'timing_complete', {
          name: 'ttfb',
          value: Math.round(nav.responseStart - nav.requestStart),
          event_category: 'Performance'
        });
      }
    }, 0);
  });

  // 監控首次內容繪製(FCP)
  if ('PerformanceObserver' in window) {
    var observer = new PerformanceObserver(function(list) {
      for (var entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          if (window.gtag) {
            gtag('event', 'timing_complete', {
              name: 'fcp',
              value: Math.round(entry.startTime),
              event_category: 'Performance'
            });
          }
        }
      }
    });
    observer.observe({ entryTypes: ['paint'] });
  }
`
