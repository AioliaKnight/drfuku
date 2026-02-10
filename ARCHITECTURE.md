# 醫師個人品牌網站 — 專案架構文件

> 本文件為專案架構的完整說明，可作為 **建立不同科別醫師網站** 的模板參考。
> 只需替換 `src/config/constants.ts` 中的醫師/診所/疾病資訊，以及 `src/modules/marketing/data/` 中的行銷資料，即可快速建立新網站。

---

## 目錄

1. [技術棧](#技術棧)
2. [專案結構總覽](#專案結構總覽)
3. [路由架構](#路由架構)
4. [設定層（Config Layer）](#設定層config-layer)
5. [模組層（Modules）](#模組層modules)
6. [共用層（Shared）](#共用層shared)
7. [內容管理（Content）](#內容管理content)
8. [樣式架構（Styling）](#樣式架構styling)
9. [SEO 架構](#seo-架構)
10. [分析追蹤（Analytics）](#分析追蹤analytics)
11. [建立新網站的步驟](#建立新網站的步驟)
12. [常用指令](#常用指令)

---

## 技術棧

| 類別 | 技術 | 版本 | 用途 |
|------|------|------|------|
| 框架 | Next.js (App Router) | 16.x | SSG/SSR、路由、圖片最佳化 |
| UI | React | 19.x | 元件化 UI |
| 語言 | TypeScript | 5.x | 型別安全 |
| 樣式 | Tailwind CSS | 4.x | Utility-first CSS |
| 排版 | @tailwindcss/typography | 0.5.x | 文章內文 prose 排版 |
| 內容 | Velite | 0.2.x | Markdown/MDX → 靜態型別資料 |
| 動畫 | Framer Motion | 12.x | 頁面與元件動畫 |
| UI 套件 | Headless UI | 2.x | 無障礙互動元件 |
| 圖示 | Heroicons / React Icons | — | SVG 圖示庫 |
| PWA | next-pwa | 5.x | Service Worker、離線快取 |
| SEO | next-sitemap | 4.x | Sitemap 生成 |
| 分析 | Google Tag Manager | — | 事件追蹤 |

---

## 專案結構總覽

```
drfuku/
├── content/                    # ① 內容層（Markdown 文章）
│   └── blog/
│       ├── hemorrhoid-types.md
│       └── ...（15 篇文章）
│
├── public/                     # 靜態資源
│   ├── doctor-profile.jpg      # 醫師照片
│   ├── logo.png                # 網站 Logo
│   ├── line-qr.png             # LINE QR Code
│   ├── favicon.ico             # Favicon
│   └── ...
│
├── src/
│   ├── app/                    # ② 路由層（Next.js App Router）
│   │   ├── (marketing)/        #    行銷頁面群組
│   │   │   ├── page.tsx        #    首頁 /
│   │   │   ├── about/          #    關於醫師 /about
│   │   │   ├── services/       #    服務項目 /services
│   │   │   ├── testimonials/   #    患者見證 /testimonials
│   │   │   ├── faq/            #    常見問題 /faq
│   │   │   └── consultation/   #    諮詢預約 /consultation
│   │   ├── blog/               #    部落格
│   │   │   ├── page.tsx        #    文章列表 /blog
│   │   │   └── [...slug]/      #    文章詳情 /blog/{slug}
│   │   ├── layout.tsx          #    根佈局
│   │   ├── globals.css         #    全域樣式
│   │   ├── sitemap.ts          #    Sitemap 生成
│   │   ├── robots.ts           #    Robots.txt
│   │   ├── manifest.ts         #    PWA Manifest
│   │   ├── opengraph-image.tsx #    動態 OG 圖片
│   │   ├── error.tsx           #    全域錯誤頁
│   │   └── not-found.tsx       #    404 頁面
│   │
│   ├── config/                 # ③ 設定層（網站核心設定）
│   │   ├── constants.ts        #    ⭐ 網站/醫師/診所/疾病常數
│   │   ├── metadata.ts         #    SEO metadata 設定
│   │   ├── structured-data.ts  #    Schema.org 結構化資料
│   │   ├── types.ts            #    TypeScript 型別定義
│   │   ├── fonts.ts            #    字體設定
│   │   └── index.ts            #    Barrel export
│   │
│   ├── modules/                # ④ 功能模組層
│   │   ├── marketing/          #    行銷模組
│   │   │   ├── sections/       #    頁面區塊元件
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── BlogSection.tsx
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   ├── FAQSection.tsx
│   │   │   │   └── CTASection.tsx
│   │   │   └── data/           #    ⭐ 行銷資料（可替換）
│   │   │       ├── hero.tsx    #    英雄區塊特色 & 診所地點
│   │   │       ├── services.tsx#    服務項目列表
│   │   │       ├── faq.ts      #    FAQ 問答
│   │   │       └── testimonials.ts  # 患者見證
│   │   │
│   │   └── blog/               #    部落格模組
│   │       ├── components/     #    文章相關元件
│   │       │   ├── ArticleContent.tsx  # 文章內文渲染 + DOM 增強
│   │       │   ├── AuthorInfo.tsx      # 作者資訊
│   │       │   ├── BlogPageContent.tsx # 文章列表（搜尋/篩選/分頁）
│   │       │   ├── PostCard.tsx        # 文章卡片
│   │       │   ├── PostCover.tsx       # 封面圖片
│   │       │   ├── PostHeader.tsx      # 文章標頭
│   │       │   ├── RelatedPosts.tsx    # 相關文章
│   │       │   ├── ScrollProgress.tsx  # 閱讀進度條
│   │       │   ├── ShareButtons.tsx    # 社群分享
│   │       │   └── BackToTop.tsx       # 回到頂部
│   │       └── styles/
│   │           └── prose.ts    #    文章排版樣式（Single Source of Truth）
│   │
│   ├── shared/                 # ⑤ 共用層
│   │   ├── components/
│   │   │   ├── Header/         #    頁首（Server + Client）
│   │   │   ├── Footer/         #    頁尾（Server + Client）
│   │   │   ├── common/         #    通用元件
│   │   │   │   ├── JsonLd.tsx          # JSON-LD 結構化資料
│   │   │   │   ├── LineButton.tsx      # LINE 諮詢按鈕
│   │   │   │   ├── StructuredData.tsx  # 全站結構化資料
│   │   │   │   ├── ErrorFallback.tsx   # 錯誤邊界 UI
│   │   │   │   ├── ErrorMessage.tsx    # 錯誤訊息
│   │   │   │   └── Monitoring.tsx      # 效能監控
│   │   │   └── analytics/
│   │   │       └── GoogleTagManager.tsx
│   │   ├── hooks/              #    自訂 Hooks
│   │   ├── lib/                #    工具函式
│   │   └── ui/                 #    基礎 UI 元件
│   │       ├── layout/         #    Container, Section
│   │       └── primitives/     #    Button
│   │
│   └── types/                  #    全域型別
│       ├── gtag.d.ts
│       └── gtm.d.ts
│
├── tailwind.config.ts          #    Tailwind 設定（typography 變數覆寫）
├── velite.config.ts            #    Velite 內容管理設定
├── next.config.mjs             #    Next.js 設定（PWA、webpack）
├── postcss.config.mjs          #    PostCSS 設定
├── tsconfig.json               #    TypeScript 設定
└── package.json                #    依賴與腳本
```

---

## 路由架構

### 路由表

| 路徑 | 頁面 | 說明 | 渲染方式 |
|------|------|------|----------|
| `/` | `(marketing)/page.tsx` | 首頁（所有行銷區塊） | Static |
| `/about` | `(marketing)/about/page.tsx` | 關於醫師 | Static |
| `/services` | `(marketing)/services/page.tsx` | 服務項目 | Static |
| `/testimonials` | `(marketing)/testimonials/page.tsx` | 患者見證 | Static |
| `/faq` | `(marketing)/faq/page.tsx` | 常見問題 | Static |
| `/consultation` | `(marketing)/consultation/page.tsx` | 諮詢預約 | Static |
| `/blog` | `blog/page.tsx` | 文章列表（搜尋/篩選/分頁） | Static |
| `/blog/{slug}` | `blog/[...slug]/page.tsx` | 文章詳情 | SSG (generateStaticParams) |

### 路由群組說明

```
app/
├── (marketing)/     ← 路由群組（不影響 URL），共享行銷頁面佈局
│   ├── page.tsx     → /
│   ├── about/       → /about
│   └── ...
├── blog/            ← 獨立路由（部落格有自己的版面）
│   ├── page.tsx     → /blog
│   └── [...slug]/   → /blog/any-slug （Catch-all 動態路由）
└── layout.tsx       ← 根佈局（Header + Footer + SEO）
```

### 特殊路由檔案

| 檔案 | 生成路徑 | 用途 |
|------|---------|------|
| `sitemap.ts` | `/sitemap.xml` | 搜尋引擎索引 |
| `robots.ts` | `/robots.txt` | 爬蟲規則 |
| `manifest.ts` | `/manifest.webmanifest` | PWA 配置 |
| `opengraph-image.tsx` | `/opengraph-image` | 社群分享預覽圖 |
| `twitter-image.tsx` | `/twitter-image` | Twitter 卡片圖 |
| `error.tsx` | — | 全域錯誤邊界 |
| `not-found.tsx` | `/404` | 找不到頁面 |

---

## 設定層（Config Layer）

### ⭐ `constants.ts` — 建立新網站時的主要修改檔案

```typescript
// 🔄 建立新網站時需替換以下所有常數

export const SITE = {
  name: '阿福醫師-大腸直腸外科徐彥勳',  // ← 網站名稱
  shortName: '阿福醫師',                  // ← 簡稱
  description: '...',                     // ← 網站描述
  url: 'https://drfuku.com',             // ← 網站域名
  locale: 'zh_TW',
  themeColor: '#0ea5e9',                  // ← 品牌主色
}

export const DOCTOR = {
  name: '徐彥勳',                         // ← 醫師姓名
  alternateName: '阿福醫師',              // ← 別名/暱稱
  title: '大腸直腸外科 專科醫師',          // ← 專科頭銜
  description: '...',                     // ← 醫師簡介
  image: '/doctor-profile.jpg',           // ← 醫師照片路徑
}

export const CLINIC = {
  name: '...',                            // ← 主要診所名
  telephone: '+886-2-2712-0589',          // ← 診所電話
  areaServed: ['台北市', '新北市'],        // ← 服務地區
  services: ['痔瘡微創治療', ...],         // ← 服務項目
}

export const DISEASE = {
  name: '痔瘡',                           // ← 主要疾病/專長
  alternateName: ['hemorrhoids', ...],    // ← 疾病別名
  treatments: ['微創手術', ...],           // ← 治療方式
}

export const KEYWORDS = {
  primary: ['痔瘡', '痔瘡醫生', ...],     // ← 核心 SEO 關鍵字
  symptoms: [...],                        // ← 症狀關鍵字
  treatments: [...],                      // ← 治療關鍵字
  // ...
}
```

### 設定層依賴關係

```
constants.ts ─────┐
                   ├──→ metadata.ts        → Next.js Metadata API
                   ├──→ structured-data.ts  → Schema.org JSON-LD
                   └──→ types.ts            → TypeScript 型別
```

所有頁面的 metadata 和結構化資料都從 `constants.ts` 衍生，**修改一處即可全站更新**。

---

## 模組層（Modules）

### Marketing 模組

首頁由 7 個區塊堆疊組成，每個區塊都是獨立元件：

```
首頁 /
├── Hero              ← 英雄區塊（醫師介紹、CTA、診所地點）
├── AboutSection      ← 關於醫師（學經歷、專長）
├── ServicesSection    ← 服務項目（6 項服務卡片）
├── BlogSection       ← 最新文章（3 篇精選）
├── TestimonialsSection ← 患者見證（6 則評價）
├── FAQSection        ← 常見問題（3 類 15 題手風琴）
└── CTASection        ← 行動呼籲（LINE 預約）
```

### ⭐ 行銷資料檔案（建立新網站時的次要修改）

| 檔案 | 內容 | 說明 |
|------|------|------|
| `data/hero.tsx` | 特色標語 + 診所地點 | 首頁英雄區塊資料 |
| `data/services.tsx` | 6 項服務 | 每項有圖示、標題、描述 |
| `data/faq.ts` | 3 類 × 5 題 FAQ | 分類問答 |
| `data/testimonials.ts` | 6 則見證 | 患者名、評分、評論 |

### Blog 模組

文章列表功能：
- **搜尋**：即時文字搜尋（標題、摘要、標籤）
- **篩選**：依分類 / 標籤篩選
- **排序**：日期、標題、閱讀時間
- **分頁**：每頁 9 篇

文章詳情功能：
- **DOM 增強**（`ArticleContent.tsx`）：
  - 表格自動包裝（響應式水平捲動 + 斑馬紋）
  - 外部連結自動新分頁開啟 + 圖示標記
  - 標題自動生成錨點連結
  - 圖片懶載入 + figure/figcaption
  - FAQ 區塊自動轉換為手風琴互動
- **相關文章**推薦演算法（分類、標籤、精選權重計分）
- **社群分享**按鈕
- **閱讀進度條**
- **作者資訊**側欄

---

## 共用層（Shared）

### 元件

| 元件 | 類型 | 用途 |
|------|------|------|
| `Header` | Server + Client | 網站導覽列（響應式、滾動變化） |
| `Footer` | Server + Client | 頁尾（聯絡資訊、LINE、社群連結） |
| `JsonLd` | Server | 渲染 JSON-LD script 標籤 |
| `StructuredData` | Client | 組合所有結構化資料 |
| `LineButton` | Client | LINE 諮詢浮動按鈕（含事件追蹤） |
| `GoogleTagManager` | Client | GTM 整合 + 頁面瀏覽追蹤 |
| `ErrorFallback` | Client | React Error Boundary UI |
| `Container` | Server | 響應式容器 (max-w-7xl) |
| `Section` | Server | 區塊包裝器（支援多種間距） |
| `Button` | Server | 按鈕元件（primary/outline/ghost） |

### Hooks

| Hook | 用途 |
|------|------|
| `useAnimation` | Framer Motion 動畫配置 |
| `useEventTracking` | GTM 事件追蹤 |
| `useFAQAnimation` | FAQ 手風琴動畫 |
| `useFAQState` | FAQ 展開/收合狀態 |
| `useScrollPosition` | 滾動位置偵測 |

### 工具函式（lib/）

| 函式 | 用途 |
|------|------|
| `cn()` | className 合併（clsx + tailwind-merge） |
| `analytics.ts` | 分析事件追蹤（pageView、blogView、ctaClick） |
| `error-tracking.ts` | 錯誤回報 |
| `performance.ts` | 效能監控（Web Vitals） |
| `keywords.ts` | 關鍵字管理工具 |

---

## 內容管理（Content）

### Velite 工作流程

```
content/blog/*.md  →  Velite 編譯  →  .velite/  →  import { posts } from '.velite'
                         │
                    ┌────┴────┐
                    │ rehype-slug    （標題生成 ID）
                    │ remark-gfm    （表格、刪除線等 GFM）
                    │ 閱讀時間計算   （中文 300字/分 + 英文 200詞/分）
                    │ Slug 生成      （從檔案路徑）
                    └─────────┘
```

### 文章 Frontmatter 格式

```yaml
---
title: "文章標題"
summary: "文章摘要（用於卡片和 SEO description）"
publishedAt: "2025-01-15"
updatedAt: "2025-01-20"              # 選填
image: "/images/cover.jpg"
author: "醫師姓名"                    # 預設值從 velite config 設定
category: "治療方法"                  # 必須是定義的分類 enum
tags: ["痔瘡", "微創手術", "術後照護"]
featured: true                       # 是否為精選文章
draft: false                         # 是否為草稿
seo:                                 # 選填
  keywords: ["額外SEO關鍵字"]
  canonical: "https://..."
---

文章內文（Markdown）...
```

### 文章分類 Enum（可依科別自訂）

```typescript
const CATEGORIES = [
  '預防保健', '治療方法', '術後照護', '飲食保健', '疾病衛教',
  '疾病警訊', '居家照護', '特殊照護', '疾病治療', '中醫治療',
] as const
```

---

## 樣式架構（Styling）

### 三層分工（Single Source of Truth）

```
┌─────────────────────────────────────────────────────┐
│ globals.css @theme                                  │
│ → 設計 Token（色彩、字體、間距、陰影、動畫）           │
│ → CSS 變數定義                                       │
│ → 基礎樣式（html, body, scrollbar, selection）        │
│ → Pseudo-element 樣式（無法用 Tailwind utility 表達） │
│   └ H3::before、hr gradient、FAQ accordion、table     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ tailwind.config.ts                                  │
│ → 只保留 typography 外掛 CSS 變數覆寫                 │
│ → 不定義 colors/fonts/content（已在 @theme）          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ prose.ts（文章專用）                                  │
│ → Tailwind Typography utility classes                │
│ → 文章結構性樣式的唯一控制層                           │
│ → 段落、標題、連結、引言、表格、程式碼、圖片            │
└─────────────────────────────────────────────────────┘
```

### 品牌色彩系統

```css
/* globals.css @theme — 替換這 11 個色值即可換品牌 */
--color-brand-50:  #f0f9ff;   /* 最淺 */
--color-brand-100: #e0f2fe;
--color-brand-200: #bae6fd;
--color-brand-300: #7dd3fc;
--color-brand-400: #38bdf8;
--color-brand-500: #0ea5e9;   /* 主色 */
--color-brand-600: #0284c7;
--color-brand-700: #0369a1;
--color-brand-800: #075985;
--color-brand-900: #0c4a6e;
--color-brand-950: #082f49;   /* 最深 */
```

---

## SEO 架構

### 多層 SEO 策略

```
1. Metadata API     → title, description, openGraph, twitter
2. Sitemap          → 所有頁面 + 文章動態索引
3. Robots.txt       → 爬蟲規則
4. Structured Data  → Schema.org JSON-LD
   ├── WebSite         （含站內搜尋）
   ├── Organization    （醫療機構）
   ├── MedicalClinic   （診所服務 + 地區）
   ├── Person          （醫師）
   ├── MedicalWebPage  （疾病頁面）
   ├── FAQPage         （FAQ 頁面）
   ├── Article         （文章頁面）
   └── BreadcrumbList  （麵包屑導覽）
5. OG Image         → 動態生成社群分享圖
6. PWA Manifest     → App-like 體驗
```

### Sitemap 優先順序

| 優先度 | 頁面 | 更新頻率 |
|--------|------|----------|
| 1.0 | 首頁 `/` | daily |
| 0.8 | 疾病指南頁、部落格列表 | weekly/monthly |
| 0.7 | 關於、服務 | monthly |
| 0.6 | 見證、FAQ、諮詢、文章 | monthly/weekly |

---

## 分析追蹤（Analytics）

### GTM 整合架構

```
GoogleTagManager.tsx
├── 自動追蹤 pageview（路由變化時）
└── 自訂事件函式：
    ├── trackPageView()   → 頁面瀏覽 + Web Vitals
    ├── trackBlogView()   → 文章瀏覽（標題、分類、閱讀時間）
    ├── trackCtaClick()   → CTA 按鈕點擊（LINE、電話、預約）
    ├── trackScroll()     → 滾動深度
    └── trackEvent()      → 通用自訂事件
```

---

## 建立新網站的步驟

### Phase 1：基礎設定（30 分鐘）

```bash
# 1. 複製專案
cp -r drfuku/ new-doctor-site/
cd new-doctor-site/

# 2. 清除舊內容
rm -rf content/blog/*
rm -rf .velite/
rm -rf public/doctor-profile*.jpg
```

### Phase 2：替換核心設定

#### Step 1 — `src/config/constants.ts`（必改）
- `SITE`：網站名稱、域名、描述、主色調
- `DOCTOR`：醫師姓名、頭銜、簡介、照片
- `CLINIC`：診所資訊、電話、服務地區
- `DISEASE`：主要疾病/專長名稱
- `KEYWORDS`：SEO 關鍵字組
- `ENV`：GTM ID、驗證碼
- `ASSETS`：Logo、OG 圖片路徑

#### Step 2 — `src/modules/marketing/data/`（必改）
- `hero.tsx`：首頁特色標語、診所地點資訊
- `services.tsx`：服務項目（圖示、標題、描述）
- `faq.ts`：FAQ 問答（分類、問題、答案）
- `testimonials.ts`：患者見證

#### Step 3 — `src/app/globals.css` @theme（調色）
- 替換 `--color-brand-*` 色彩系列（建議用 [Tailwind Color Generator](https://uicolors.app/) 生成）

#### Step 4 — `velite.config.ts`（調整分類）
- 修改 `CATEGORIES` enum 為適合新科別的分類

### Phase 3：資源替換

| 檔案 | 說明 |
|------|------|
| `public/logo.png` | 網站 Logo |
| `public/doctor-profile.jpg` | 醫師照片 |
| `public/line-qr.png` | LINE QR Code |
| `public/favicon.ico` + icons | Favicon 系列 |
| `public/robots.txt` | Sitemap URL |

### Phase 4：內容建立

在 `content/blog/` 建立 Markdown 文章，遵循 Frontmatter 格式。

### Phase 5：部署

```bash
npm install
npm run build      # Velite 編譯 + Next.js 靜態生成
npm run start      # 本機預覽
```

---

## 常用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器（Next.js + Velite watch） |
| `npm run build` | 生產建置（Velite → Next.js → Sitemap） |
| `npm run start` | 啟動生產伺服器 |
| `npm run lint` | ESLint 檢查 |
| `npm run lint:fix` | ESLint 自動修復 |
| `npm run typecheck` | TypeScript 型別檢查 |
| `npm run format` | Prettier 格式化 |

---

## 科別適用範例

本架構可快速適配以下科別（僅需替換設定與資料）：

| 科別 | DISEASE.name | 建議分類 |
|------|-------------|---------|
| 皮膚科 | 青春痘/異位性皮膚炎 | 皮膚保養、治療方法、用藥指南 |
| 眼科 | 近視/白內障 | 視力保健、手術說明、術後照護 |
| 牙科 | 牙周病/植牙 | 口腔衛教、療程說明、術後保養 |
| 骨科 | 退化性關節炎 | 運動復健、手術說明、預防保健 |
| 婦產科 | 產前檢查 | 孕期保健、產後照護、婦科衛教 |
| 身心科 | 焦慮症/失眠 | 心理衛教、治療方式、自我照護 |
| 泌尿科 | 攝護腺肥大 | 疾病衛教、手術說明、生活保健 |

---

> **最後更新**：2026-01-30
> **維護者**：專案開發團隊
