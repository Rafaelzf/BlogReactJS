import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './new.css';




class New extends Component {

    constructor(props){
        super(props);
        this.state = {
            titulo:'',
            descricao:'',
            imagem: null,
            url:'',
            alert:'',
            progress:''
        }

        this.cadastrar = this.cadastrar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    
    }
    
    componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/');
            return null;
        }
    }

    handleFile = async(e) => {
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/png' || image.type === 'image/jpeg'){
                await this.setState({imagem: image});
                this.handleUpload();
            }else{
                alert('Envie uma imagem do tipo, jpg ou png');
                this.setState({imagem: null});
                return null;
            }
        }
    }

    handleUpload = async() =>{
        const {imagem} = this.state;
        const currentUid = firebase.getCurrentUid();
        const uploadTask = firebase.storage.ref(`imagem/${currentUid}/${imagem.name}`).put(imagem);

        await uploadTask.on('state_changed', (snapshot) =>{
            //progresso
            const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
            this.setState({progress});
        }, (error) =>{
            //erro
            console.log('Erro ao enviar a imagem '+ error)
        }, ()=>{
            //sucesso
            firebase.storage.ref(`imagem/${currentUid}`).child(imagem.name).getDownloadURL()
            .then(url =>{
                this.setState({url:url});
            });
        });
    }

    cadastrar = async(e) =>{
        e.preventDefault();

        if(this.state.titulo !== '' && this.state.descricao !== '' && this.state.imagem !== '' && this.state.imagem !== null && this.state.url !== ''){
           let posts = firebase.app.ref('posts');
           let chave = posts.push().key;

           await posts.child(chave).set({
               titulo: this.state.titulo,
               imagem: this.state.url,
               descricao: this.state.descricao,
               autor: localStorage.nome 
           });

           this.props.history.push('/dashboard');
        }else{
            this.setState({alert: 'Preencha todos os campos!'})
        }
        
    }

        render(){
            return(
                <div>
                
                   <form onSubmit={this.cadastrar} id="post">

                        <strong>{this.state.alert}</strong>

                        <label>Título:</label>
                        <input autofocus type="text" value={this.state.titulo}
                            onChange={(e) => this.setState({titulo: e.target.value})}/>

                        <label>Descrição:</label>
                        <textarea type="text" value={this.state.descricao}
                            onChange={(e) => this.setState({descricao: e.target.value})}></textarea>

                        <label>Imagem:</label>
                        <input  type="file" onChange={this.handleFile} /><br />

                        {this.state.url !== ''?
                        <img src={this.state.url} alt={this.state.titulo}  />
                        : 
                        <progress value={this.state.progress} max="100" />
                        }



                        <button type="submit">Cadastrar</button>
                        <Link id="voltar" to="/dashboard">Voltar</Link>
                   </form>

                   <footer >
                      
                   </footer>
                </div>
            )
        };
    
     
    }



export default withRouter(New);