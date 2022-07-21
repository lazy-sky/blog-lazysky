import TypeIt from 'typeit-react'

interface ITypeitTextProps {
  children: React.ReactNode
  speed?: number
}

const TypeitText = ({ children, speed = 20 }: ITypeitTextProps) => {
  return (
    <TypeIt
      options={{
        speed,
        lifeLike: true,
        cursor: false,
      }}
    >
      {children}
    </TypeIt>
  )
}

export default TypeitText
