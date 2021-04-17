import {BrowserRouter as Router} from 'react-router-dom';
import {DataProvider} from './GlobalState';
import Header from './components/headers/Headers';
import MaingPages from './components/mainpages/Pages';
import { Provider } from "react-redux";
import generateStore from "./redux/store";



function App() {
  const store = generateStore();
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Provider store={store}>
            <Header />
            <MaingPages />
          </Provider>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
