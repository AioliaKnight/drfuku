// PostCSS 配置文件
// 使用 ES Modules 格式以符合 Next.js 15 的最佳實踐
const config = {
  plugins: {
    // 處理 Tailwind CSS v4 - 使用新的 @tailwindcss/postcss 插件
    '@tailwindcss/postcss': {},
    // 自動添加瀏覽器前綴
    'autoprefixer': {}
  }
}

export default config
