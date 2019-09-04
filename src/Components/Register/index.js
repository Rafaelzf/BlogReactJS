import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            nome:'',
            email: '',
            password:''
        }

        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
  
    };


    register(e){
        e.preventDefault();

        this.onRegister();
    }

    onRegister = async() =>{
        try{

            const {nome, email, password} = this.state;

            await firebase.register(nome, email, password).catch((error) =>{
                console.log('Aconteceu o erro: ' + error);
            });

            this.props.history.replace('/dashboard');

        }catch(error){
            console.log(error.message);
        }
    }


    render(){
        
        return(
        
            <div>
                <h1 className="register-h1">Novo Usuário</h1>
                <form onSubmit={this.register} id="register">
             
                        <label htmlFor="">Nome: </label>
                        <input type="text" autoFocus autoComplete="off" value={this.state.nome} 
                            placeholder="Nome" onChange={(e) => this.setState({nome: e.target.value})}/>
                  

                    
                        <label htmlFor="">Email: </label>
                        <input type="text"  autoComplete="off" value={this.state.email} 
                        placeholder="Teste.teste@xmail.com" onChange={(e) => this.setState({email: e.target.value})}/>
                    

                    
                        <label htmlFor="">Password: </label>
                        <input type="text"  autoComplete="off" value={this.state.password} 
                            onChange={(e) => this.setState({password: e.target.value})}/>
                   

                    <button type="submit">Cadastrar</button>

                </form>
            </div>
        )
    }
}

export default withRouter(Register);