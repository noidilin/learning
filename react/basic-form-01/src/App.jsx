import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import StateLogin from './components/StateLogin.jsx';
import HookLogin from './components/HookLogin.jsx';
import Signup from './components/Signup.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <StateLogin />
        <HookLogin />
        <Login />
        <Signup />
      </main>
    </>
  );
}

export default App;
