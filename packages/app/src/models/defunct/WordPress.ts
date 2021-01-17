export class Paper {
  id?: number
  title: string
  url: string
  tags: string[]
  status: string
  author: number
  content: string
  slug: string
  language: string

  constructor(props) {
    Object.assign(this, { ...props })
    this.slug = (this.title || '').replace(/\s/g, '-').toLowerCase()
  }
}
