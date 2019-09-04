import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './global.css';
import Home from './Components/Home';
import Header from './Components/Header';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import New from './Components/New';
import Register from './Components/Register';

import Firebase from './firebase';


class App extends Component {

  //Status para ver se está logado ou não
  state = {
    firebaseInitialized: false
  }

  //faz a requisição
  componentDidMount() {
    Firebase.isInitialized().then(resultado => {
      //devolve o usuário
      this.setState({firebaseInitialized:resultado});
    })
  }

  render(){
     //Se o status do usuário retornar verdadeiro
      return this.state.firebaseInitialized !== false ? (
    
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/New" component={New} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      ) : ( //Se o status do usuário retornar falso
        
        <h1>Carregando...</h1>
      )
  }
}

export default App;
