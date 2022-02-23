import './App.css';

import { RecoilRoot } from 'recoil';

import Main from './app/main';

// import React, { ReactElement } from 'react';
// interface Props {
//   children: ReactElement | ReactElement[];
// }

function App() {
  return (
    <RecoilRoot>
      {/* <AuthProtector> */}
      <div className="App">
        <Main />
      </div>
      {/* </AuthProtector> */}
    </RecoilRoot>
  );
}

export default App;
