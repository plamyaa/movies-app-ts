import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Content } from './components/content/content';
import { Details } from './components/content/cards/details/detailsPage';
import { Search } from './components/content/filter/search/serachPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='movies-app-ts/' element={<Content />}/>
          <Route path="movie/:filmId" element={<Details />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
