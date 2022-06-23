export interface IProject {
  id: string
  properties: {
    Name: {
      title: {
        plain_text
      }[]
    }
    URL: {
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
