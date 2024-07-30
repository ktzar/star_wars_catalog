import ReactDom from 'react-dom';
import { SWApp } from './components/SWApp'

const App = () => {
  return (<>
    <div className="container">
      <SWApp />
    </div>
  </>);
}

ReactDom.render(<App />, document.getElementById('root'));
