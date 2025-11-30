export type TemplateItem = {
  id: string
  title: string
  subtitle: string
  price: number
  isFree: boolean
  stack: string[]
  rating: number
  sales: number
  tags: string[]
  hero?: string
  images?: string[]
  features?: string[]
  longDescription?: string
}

export type CartItem = {
  templateId: string
  qty: number
  template?: TemplateItem
}

export type User = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export type Purchase = {
  templateId: string
  purchasedAt: string
}
