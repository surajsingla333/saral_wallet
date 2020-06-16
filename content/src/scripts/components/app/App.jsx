import React, { Component } from 'react'
import { connect } from 'react-redux'

import { listPlatforms } from '../../../../../API/src/_INITIALIZE/1_GetPlatform'
import { listNetworks } from '../../../../../API/src/_INITIALIZE/2_GetNetwork'
import { listEntities } from '../../../../../API/src/_INITIALIZE/3_GetEntities'
import { listAttributes } from '../../../../../API/src/_INITIALIZE/4_EntityAttributes'
import { listAttributeValues } from '../../../../../API/src/_INITIALIZE/5_AttributeValue'

import Cookies from 'js-cookie';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      account: this.props.currentAccount,
      value: "ME VALUE",
    }
  }

  componentWillMount() {
    setTimeout(async () => {
      var listPlatforms1 = await listPlatforms()
      var listNetworks1 = await listNetworks()
      var listEntities1 = await listEntities()
      var listAttributes1 = await listAttributes()
      var listAttributeValues1 = await listAttributeValues()

      // console.log('GET VALUE PLATFORMS', listPlatforms1)
      // console.log('GET VALUE NETWORKS', listNetworks1)
      // console.log('GET VALUE ENTITIES', listEntities1)
      // console.log('GET VALUE ENTITIES-OPERATIONS', listAttributes1)
      // console.log('GET VALUE ENTITIES-OPERATIONS-KIND', listAttributeValues1)

      this.setState({
        listPlatforms1,
        listNetworks1,
        listEntities1,
        listAttributes1,
        listAttributeValues1
      })
    }, 200)
    this.setState({
      acc: this.props.currentAccount,
    })
  }

  componentDidMount() {

    //     document.addEventListener('click', async () => {
    //       await this.callEvent({ name: "name", address: "address" });
    // });

    document.addEventListener('my_event', async (e) => {
      // alert('PRINT')
      console.log("GETTING E", e);
      await this.callEvent(e.detail);
    })

    document.addEventListener('transfer', async (e) => {
      // alert('PRINT')
      console.log("GETTING E", e);
      await this.transfer(e.detail);
    })

    // document.addEventListener('my_event_res', async (e) => {
    //   // alert('PRINT')
    //   console.log("GETTING E2", e.oi);
    // })

    var elt = document.createElement('script');
    // var elt2 = document.createElement('script');
    // elt2.src = chrome.runtime.getURL('script.js');
    // elt2.onload = function () {
      // this.remove();
    // };


    // var intervalId = setInterval(() => {
    //   if () {
    //     console.log(this.props.operationID);
    //     clearInterval(intervalId);
    //   }
    //   else{
    //     console.log("IN ELSE")
    //   }
    // }, 1000);

    elt.innerHTML = `window.tezos = {

      bar:function(work) {
        console.log("IN FOO:BARR");

        var event = new CustomEvent("my_event", {detail: work});
       document.dispatchEvent(event);
        return "APLE";
      }, 

      isTezos: ` + JSON.stringify(this.state.account ? true : false) + `,
      account: ` + JSON.stringify(this.state.account) + `,
      value: ` + JSON.stringify(this.state.value) + `,
      transfer:function(data) {
        console.log("IN FOO:BARR");

        var event = new CustomEvent("transfer", {detail: data});
       document.dispatchEvent(event);
        return "transfer";
      }, 
    };`

    document.head.appendChild(elt)
    // document.head.appendChild(elt2)
  }


  barCall1(v) {
    console.log("INSIDE BAR CALL1");
    console.log(v, this.state);
  }

  async barCall(v) {
    console.log("INSIDE BAR CALL", v);
    return "PROMISE";
  }

  async transfer(data){

    this.setState({functionType: 'transfer' ,functionValue: data });
    console.log("GOT DATA", data);
    console.log('EVENT Call')
    this.props.sendFunction(this.state);
    // await this.props.operationID;
    // return "VALUE";
    // return new Promise(function (resolve, reject) {
    var intervalId = setInterval(() => {
      if (this.props.operationID) {
        var event = new CustomEvent("transferResponse", {detail: this.props.operationID});
       document.dispatchEvent(event);
        this.props.refreshOperation(this.state);
        clearInterval(intervalId);
      }
    }, 1000);

  }

  async callEvent(v) {
    this.setState({ functionType: 'message' , functionValue: v });
    console.log("GOT DATA", v)
    console.log('EVENT Call')
    this.props.sendFunction(this.state);
    // await this.props.operationID;
    // return "VALUE";
    // return new Promise(function (resolve, reject) {
    var intervalId = setInterval(() => {
      if (this.props.operationID) {
        var event = new CustomEvent("bar", {detail: this.props.operationID});
       document.dispatchEvent(event);
        this.props.refreshOperation(this.state);
        clearInterval(intervalId);
      }
    }, 1000);
    // });

    // alert('SECOND ALERT')
  }

  render() {
    return (
      <div>
        {/* {Cookies.get("name")};
        <h1>Count: {this.props.count}</h1>
        <h1>Account: {this.props.currentAccount}</h1> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    count: state.count.count,
    currentAccount: state.sendToContent.currentAccount,
    operationID: state.functionCall.operationHash,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendFunction: newState => dispatch({ type: 'CALL_FUNCTION', state: newState }),
    refreshOperation: newState => dispatch({ type: 'REFRESH_OPERATION', state: newState }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
