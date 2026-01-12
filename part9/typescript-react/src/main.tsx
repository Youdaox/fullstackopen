import ReactDOM from 'react-dom/client'

interface WelcomeProps {
  name: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const Welcome = (props: WelcomeProps) => {
  return <h1>Hello, {props.name}</h1>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Welcome name="Sarah" />
)