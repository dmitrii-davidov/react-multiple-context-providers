import React, {useContext, createContext, useState, useEffect} from 'react';


const ContextA = createContext(0);
const ContextB = createContext(0);


function App() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setA(a + 1);
      setB(b + 1);
    }, 2000);
    return () => clearInterval(id);
  });

  return (
    <ContextA.Provider value={a}>
    <ContextB.Provider value={b}>
      <C/>
      <PureC/>
    </ContextB.Provider>
    </ContextA.Provider>
  );
};

class C extends React.Component {
  constructor() {
    super();
    this.A = makeComponentWithContext('a', ContextA);
    this.B = makeComponentWithContext('b', ContextB);
  }

  render() {
    return (
      <>
        <p>Base:</p>
        <this.A/>
        <this.B/>
      </>
    )
  }
}

class PureC extends React.PureComponent {
  constructor() {
    super();
    this.A = makeComponentWithContext('a', ContextA);
    this.B = makeComponentWithContext('b', ContextB);
  }

  render() {
    return (
      <>
        <p>Pure:</p>
        <this.A/>
        <this.B/>
      </>
    )
  }
}

const makeComponentWithContext = (label, context) => {
  let c = 0;
  return () => {
    c += 1;
    const v = useContext(context);
    return (
      <li>{label} = {v} ({c})</li>
    );
  };
}


export default App;
