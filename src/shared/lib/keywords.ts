// 關鍵字類型定義
export type KeywordCategory = {
  readonly name: string
  readonly keywords: readonly string[]
  readonly description?: string
  readonly priority?: number
}

export type KeywordCategoryName = 'primary' | 'location' | 'symptoms' | 'treatments' |
  'questions' | 'prevention' | 'cost' | 'complications'

// 算關鍵字相關度 (0-1)
const calculateRelevance = (text: string, keyword: string): number => {
  if (text.includes(keyword)) return 1

  const words = keyword.split(/\s+/)
  const matchedWords = words.filter(word => text.includes(word))
  return matchedWords.length / words.length
}

// 關鍵字分類
const keywordCategories = [
  {
    name: 'primary',
    priority: 1,
    description: '主要關鍵字',
    keywords: [
      '痔瘡治療',
      '大腸直腸外科醫師',
      '微創手術',
      '肛門疾病',
      '直腸外科診所',
      '痔瘡醫生推薦',
      '痔瘡專科醫師',
      '肛門科診所',
      '痔瘡門診'
    ]
  },
  {
    name: 'location',
    priority: 2,
    description: '地理位置相關',
    keywords: [
      '台中痔瘡醫生',
      '南投痔瘡醫師',
      '台北內湖痔瘡',
      '草屯大腸直腸外科',
      '台中微創手術',
      '台北痔瘡診所',
      '台中大腸直腸外科',
      '南投肛門科',
      '彰化痔瘡醫院',
      '雲林痔瘡診所'
    ]
  },
  {
    name: 'symptoms',
    priority: 3,
    description: '症狀相關',
    keywords: [
      '產後痔瘡治療',
      '血栓痔瘡處理',
      '痔瘡出血治療',
      '肛門膿瘍開刀',
      '痔瘡脫垂手術',
      '肛門瘻管治療',
      '內痔出血',
      '外痔腫痛',
      '混合痔',
      '便血診斷',
      '肛門疼痛',
      '便秘痔瘡'
    ]
  },
  {
    name: 'treatments',
    priority: 3,
    description: '治療方式',
    keywords: [
      '無痛痔瘡手術',
      '微創痔瘡手術',
      '大腸直腸內視鏡',
      '肛門手術推薦',
      '腹腔鏡手術',
      'PPH手術',
      '痔瘡結紮手術',
      '雷射痔瘡手術',
      '注射硬化療法',
      '橡皮筋結紮術',
      '中醫痔瘡治療'
    ]
  },
  {
    name: 'questions',
    priority: 4,
    description: '常見問題',
    keywords: [
      '痔瘡怎麼治療',
      '肛門出血原因',
      '產後痔瘡照護',
      '痔瘡手術恢復期',
      '痔瘡術後照顧',
      '痔瘡會自己好嗎',
      '痔瘡術後注意事項',
      '痔瘡手術風險',
      '痔瘡復發機率',
      '術後傷口照護'
    ]
  },
  {
    name: 'prevention',
    priority: 4,
    description: '預防保健',
    keywords: [
      '痔瘡預防方法',
      '腸道保健方式',
      '肛門保養建議',
      '腸胃道保健',
      '痔瘡復發預防',
      '飲食調理建議',
      '生活習慣改善',
      '排便習慣調整',
      '運動預防痔瘡',
      '孕期痔瘡預防'
    ]
  },
  {
    name: 'cost',
    priority: 5,
    description: '費用相關',
    keywords: [
      '痔瘡手術費用',
      '微創手術價格',
      '肛門手術費用',
      '大腸直腸外科診費',
      '痔瘡治療收費',
      '健保痔瘡手術',
      '自費手術價格',
      '術後回診費用',
      '手術自費項目',
      '診所收費標準'
    ]
  },
  {
    name: 'complications',
    priority: 3,
    description: '併發症相關',
    keywords: [
      '痔瘡併發症',
      '肛門廔管',
      '肛門膿瘍',
      '肛裂',
      '直腸脫垂',
      '便血併發症',
      '術後感染',
      '傷口不癒合',
      '大腸癌篩檢',
      '痔瘡惡化'
    ]
  }
] as const

// 建立關鍵字映射
export const keywords = {
  // 各分類關鍵字
  categories: keywordCategories,

  // 取得所有關鍵字
  all: keywordCategories.flatMap(category => category.keywords),

  // 取得特定分類的關鍵字
  getByCategory(category: KeywordCategoryName): readonly string[] {
    return keywordCategories.find(c => c.name === category)?.keywords ?? []
  },

  // 取得相關關鍵字，可選擇最大返回數量和最小相關度
  getRelevant(text: string, options?: {
    limit?: number
    minRelevance?: number  // 0-1 之間的數值
  }): string[] {
    const normalizedText = text.toLowerCase()
    const relevantKeywords = this.all
      .map(keyword => ({
        keyword,
        relevance: calculateRelevance(normalizedText, keyword.toLowerCase())
      }))
      .filter(({ relevance }) =>
        !options?.minRelevance || relevance >= options.minRelevance
      )
      .sort((a, b) => b.relevance - a.relevance)
      .map(({ keyword }) => keyword)

    return options?.limit ? relevantKeywords.slice(0, options.limit) : relevantKeywords
  },

  // 取得主要關鍵字
  getPrimary(): readonly string[] {
    return this.getByCategory('primary')
  },

  // 取得地理位置關鍵字
  getLocation(): readonly string[] {
    return this.getByCategory('location')
  },

  // 取得症狀相關關鍵字
  getSymptoms(): readonly string[] {
    return this.getByCategory('symptoms')
  },

  // 取得治療方式關鍵字
  getTreatments(): readonly string[] {
    return this.getByCategory('treatments')
  },

  // 取得問題相關關鍵字
  getQuestions(): readonly string[] {
    return this.getByCategory('questions')
  },

  // 取得預防保健關鍵字
  getPrevention(): readonly string[] {
    return this.getByCategory('prevention')
  },

  // 取得費用相關關鍵字
  getCost(): readonly string[] {
    return this.getByCategory('cost')
  },

  // 取得併發症相關關鍵字
  getComplications(): readonly string[] {
    return this.getByCategory('complications')
  },

  // 依優先順序取得關鍵字
  getByPriority(priority: number): readonly string[] {
    return keywordCategories
      .filter(category => category.priority === priority)
      .flatMap(category => category.keywords)
  },

  // 取得分類描述
  getCategoryDescription(category: KeywordCategoryName): string | undefined {
    return keywordCategories.find(c => c.name === category)?.description
  },

  // 搜尋相關關鍵字並依分類回傳
  searchByCategory(text: string, options?: {
    minRelevance?: number  // 0-1 之間的數值
  }): Record<KeywordCategoryName, string[]> {
    const normalizedText = text.toLowerCase()
    return keywordCategories.reduce((acc, category) => {
      const matches = category.keywords
        .map(keyword => ({
          keyword,
          relevance: calculateRelevance(normalizedText, keyword.toLowerCase())
        }))
        .filter(({ relevance }) =>
          !options?.minRelevance || relevance >= options.minRelevance
        )
        .map(({ keyword }) => keyword)

      if (matches.length > 0) {
        acc[category.name as KeywordCategoryName] = matches
      }
      return acc
    }, {} as Record<KeywordCategoryName, string[]>)
  },

  // 取得所有分類名稱
  getAllCategories(): readonly KeywordCategoryName[] {
    return keywordCategories.map(c => c.name) as KeywordCategoryName[]
  },

  // 取得指定數量的隨機關鍵字
  getRandomKeywords(count: number, category?: KeywordCategoryName): string[] {
    const sourceKeywords = category ? this.getByCategory(category) : this.all
    const shuffled = [...sourceKeywords].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }
} as const
