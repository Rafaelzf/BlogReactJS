import React, { Component } from 'react';
import firebase from '../../firebase';

import './home.css';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        firebase.app.ref('posts').once('value', (snapshot) => {
            let state = this.state;
            state.posts = [];

            snapshot.forEach((childItem, index) => {
                state.posts.push({
                    key: childItem.key,
                    autor: childItem.val().autor,
                    descricao: childItem.val().descricao,
                    imagem: childItem.val().imagem,
                    titulo: childItem.val().titulo
                });
            })
            this.state.posts.reverse();
            this.setState(state);
        });
    }


    render() {
        return( 
            <section id="post"> 
                {this.state.posts.map((post) => {
                    return ( 
                        <article key={post.key}>

                            <header>
                                <div className="container-titulo">
                                    <h2>{post.titulo}</h2> 
                                    <span> Autor: {post.autor} </span> 
                                </div> 
                            </header>

                            <img src={post.imagem} alt="Capa do Post" />
                            
                            <footer>
                                <p>{post.descricao}</p> 
                            </footer> 
                        </article>
                    )
                })
            } </section>
        )
    }
}

export default Home;