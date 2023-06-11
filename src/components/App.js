import React from 'react';
import Info from './Info';
import SecretEnter from "./SecretEnter";
import ReturnedSecret from "./ReturnedSecret";
import "./App.css";
import axios from 'axios';

const API_URL = "https://jbc77qrkg1.execute-api.us-east-1.amazonaws.com/dev/secret"

export default class App extends React.Component {
  //returnedSecret = null;

  constructor(props) {
    super(props);
    this.state = {
      secret: null,
      data: null,
      loading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.registerBootlegVH = this.registerBootlegVH.bind(this);
    this.tickUpdate = this.tickUpdate.bind(this);

  }

  componentDidMount() {
    this.registerBootlegVH();
  }

  async onSubmit(secret) {
    //Makes an API call to add secret, and then follows up with a getSecret
    try {
      this.setState({ loading: true })
      await addSecret(secret);
      const newSecret = await getSecret();
      console.log(`ALLO ${newSecret}`)
      //Set the state
      this.setState({
        secret: newSecret,
        loading: false
      });

    } catch (e) {
      console.log("ERROR: " + e)
    }


    return
  };

  onWindowResize = cb => {
    window.addEventListener("resize", cb, {
      passive: true
    });

    window.addEventListener("orientationchange", cb, {
      passive: true
    });

    return () => {
      window.removeEventListener("resize", cb);
      window.removeEventListener("orientationchange", cb);
    };
  };

  registerBootlegVH = () => {
    const setVh = () =>
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight / 100}px`
      );

    const cb = this.tickUpdate(() => {
      setVh();
    });

    setVh();

    return this.onWindowResize(cb);
  };

  tickUpdate = cb => {
    let ticking = false;

    const update = e => {
      cb(e);
      ticking = false;
    };

    const requestTick = e => {
      if (!ticking) {
        requestAnimationFrame(() => update(e));
        ticking = true;
      }
    };

    return requestTick;
  };

  render() {
    return (
      <div className="outer-container">
        <Info />
        <SecretEnter clickHandler={this.onSubmit} />
        {(!this.state.loading) && <ReturnedSecret value={this.state.secret} />}
        {(this.state.loading) &&
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        }
      </div>
    );

  }
};

function getSecret() {
  return new Promise((resolve, reject) => {
    axios.get(API_URL, { crossdomain: true })
      .then(res => {
        if (res.data) {
          console.log(res.data);
          resolve(res.data.secret)
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
  });
}

function addSecret(secret) {
  return new Promise((resolve, reject) => {
    axios.post(API_URL,
      {
        secret
      },
    )
      .then(res => {
        console.log(res.data)
        if (res.data) {
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
