import type { CoursePart } from "../App";

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
  }

  switch (part.kind) {
    case 'basic': 
      return (
        <p>
          <strong>{part.name}</strong><br />
          <i>{part.description}</i> <br />
        </p>
      )
    case 'group': 
      return (
        <p>
          <strong>{part.name}</strong><br />
          project exercises {part.groupProjectCount}<br />
        </p>
      )
    case 'background':  
      return (
        <p>
          <strong>{part.name}</strong><br />
          <i>{part.description}</i> <br />
          submit to {part.backgroundMaterial}
        </p>
      )
    case 'special':
      return (
        <p>
          <strong>{part.name}</strong><br />
          <i>{part.description}</i> <br />
          required skills: {part.requirements.join(', ')}
        </p>
      )
    default: 
      return assertNever(part);
  }
}

export default Part;