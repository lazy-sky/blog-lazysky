import TypeIt from 'typeit-react'

interface ITypeitTextProps {
  children: React.ReactNode
  speed?: number
}

const TypeitText = ({ children, speed = 35 }: ITypeitTextProps) => {
  return (
    <TypeIt
      options={{
        speed,
        lifeLike: true,
        afterComplete: (instance: any) => {
          instance.destroy()
        },
      }}
    >
      {children}
    </TypeIt>
  )
}

export default TypeitText
