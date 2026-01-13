import type { CoursePart } from "../App";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(c => <Part part={c} />)}
    </div>
  )
}

export default Content;