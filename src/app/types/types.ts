export type ParamsType = {
  params: {
    id: string
  }
  searchParams?: object
}

export type CardItemProps = {
  $id: string
  confession: string
  comments: string[]
  $createdAt: string
}

export type CardProps = {
  id: string
  confession: string
  commentNumber: number
  createdAt: string
}

export type ToastProps={
  message: string
  category: string
}

export type LoaderProps = {
  caption: string
}

export type UserDataType = {
  confession: string,
  comments: string[]
  createdAt?: string
}

export type ErrorPropsType = {
  error: Error
  reset: ()=>void
}
