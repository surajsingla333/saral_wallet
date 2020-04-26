import React, { Component } from 'react'
import { connect } from 'react-redux'

import { listPlatforms } from '../../../../../API/src/_INITIALIZE/1_GetPlatform'
import { listNetworks } from '../../../../../API/src/_INITIALIZE/2_GetNetwork'
import { listEntities } from '../../../../../API/src/_INITIALIZE/3_GetEntities'
import { listAttributes } from '../../../../../API/src/_INITIALIZE/4_EntityAttributes'
import { listAttributeValues } from '../../../../../API/src/_INITIALIZE/5_AttributeValue'

import Cookies from 'js-cookie';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: "ME VALUE",
    }
  }

  componentWillMount () {
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

  componentDidMount () {
    // document.addEventListener('click', () => {
    //   this.callEvent()

    //   this.props.dispatch({
    //     type: 'ADD_COUNT'
    //   })
    // })
    console.log(this.props);
    console.log(this.state);
    alert("PKH", Cookies.get('pkh'))

    document.addEventListener('my_event', (e) => {
      alert('PRINT')
      console.log(e);
      this.callEvent(e.detail);
    })

    var VAL = this.state.value;

    alert(this.state.acc);
    var elt = document.createElement('script')
    elt.innerHTML = `window.tezos = {
      bar:function(work) {
        console.log("IN FOO:BARR")/*whatever*/
        var event = new CustomEvent("my_event", {detail: work});
        document.dispatchEvent(event);
      }, 
      isTezos: true,
      account: ` + JSON.stringify(this.props.currentAccount) + `,
      value:` + JSON.stringify(this.state.value) + `
    };`
    document.head.appendChild(elt)
  }

  callEvent (v) {
    console.log("GOT DATA", v)
    console.log('EVENT Call')
    alert('SECOND ALERT')
  }

  render () {
    return (
      <div>
        {Cookies.get("name")};
        <h1>Count: {this.props.count}</h1>
        <h1>Account: {this.props.currentAccount}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    count: state.count.count,
    currentAccount: state.sendToContent.currentAccount,
  }
}

export default connect(mapStateToProps)(App)
