interface CourseInfo {
  name: string,
  exerciseCount: number
}

interface Props {
  courseParts: CourseInfo[]
}

const Content = ({ courseParts }: Props) => {
  return (
    <div>
      {courseParts.map(c => {
        return (
          <p>
            {c.name} {c.exerciseCount}
          </p>
        )
      })}
    </div>
  )
}

export default Content;