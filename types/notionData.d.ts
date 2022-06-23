export interface IProject {
  id: string
  url: string
  properties: {
    Name: {
      title: {
        plain_text
      }[]
    }
    Deploy: {
      url: string
    }
    Code: {
      rich_text: {
        plain_text: string
      }[]
    }
    Tags: {
      multi_select: {
        id: string
        name: string
      }[]
    }
    Photo: {
      files: {
        file: {
          url: string
        }
      }[]
    }
    Tech: {
      multi_select: {
        id: string
        name: string
        color: string
      }[]
    }
  }
}
