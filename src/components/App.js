import React from 'react';
import Info from './Info';
import SecretEnter from "./SecretEnter";
import ReturnedSecret from "./ReturnedSecret";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import "./App.css";
import axios from 'axios';



export default class App extends React.Component {
  //returnedSecret = null;

  constructor(props){
    super(props);
    this.state = {
      secret: null,
      data: null
    };

    this.onSubmit = this.onSubmit.bind(this);

  }

  async onSubmit(secret){
    //Makes an API call to add secret, and then follows up with a getSecret
    try{
      await addSecret(secret);
      const newSecret = await getSecret();

      //Set the state
      this.setState({
        secret: newSecret
      });

    } catch (e){
      console.log("ERROR: " + e)
    }
    

    return
  };

  render(){
    return (
      <Container>
        <Row>
          <Col>
            <Info />
          </Col>
        </Row>
        <Row>
          <Col> 
            <SecretEnter clickHandler = {this.onSubmit}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <ReturnedSecret value = {this.state.secret}/>
          </Col>
        </Row>
      </Container>
    );

  } 
};

function getSecret(){
  return new Promise((resolve, reject) => {
    axios.get(`https://afternoon-beach-20536.herokuapp.com/api/secrets`, { crossdomain: true })
      .then(res => {
        if(res.data){
          console.log(res.data);
          resolve(res.data[0]["secret"])
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
  });
}

function addSecret(secret){
  return new Promise((resolve, reject) => {
    axios.post(`https://afternoon-beach-20536.herokuapp.com/api/secrets/${secret}`)
    .then(res => {
      console.log(res.data)
      if(res.data){
        console.log(res.data)
        resolve(res.data)
      }
    })
    .catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

//export default App;
