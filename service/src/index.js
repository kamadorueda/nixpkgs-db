import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Search } from './views/Search';

const Root = () => (
  <Search />
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
