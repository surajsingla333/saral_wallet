// class App extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {}
//   }

//   insideExtension (val) {
//     console.log('INSIDE FN', val)
//     console.log('INSIDE CONTENT')
//     alert('ALERTING')
//   }

//   componentDidMount () {

//     window.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//       if (message.type === "OYO_PLUGIN_EVALUATED_CONFIG") {
//         this.setState({
//           configData: message.configData
//         });
//       }
//     });

//     // window.addEventListener("message", function(e) {

//     //   // alert('aaaa');

//     //   if (e.source != window) {
//     //       return;
//     //   }

//     //   console.log(e);
//     //   console.log(e.data);

//     //   // var data = JSON.parse(e.data);

//     //   this.insideExtension(e.data);
//     //   // this.insideExtension(data);

//     // });

//     // window.onload("message", function(event) {
//     //   // We only accept messages from ourselves

//     //   window.postMessage("SURAJ");

//     // }, false);

//     console.log(window)
//     console.log('GET ETH', window.window)
//     console.log('GET ETH2', window.window.ethereum)
//     // () =>{
//     // alert("Calling extension function from page");
//     // }

//     // var data = {
//     // random: 'Some data',
//     // more: 'More data'
//     // }

//     // send data through a DOM event
//     window.document.cookie = 'MY COOKIE IN PAGE:trueAF'
//     // console.log('doc', window.document.cookies)
//     console.log('URL', window.document['URL'])
//     // var event = new Event('csEvent');
//     // window.document.dispatchEvent(event);

//   }

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { listPlatforms } from '../../../../../API/src/_INITIALIZE/1_GetPlatform'
import { listNetworks } from '../../../../../API/src/_INITIALIZE/2_GetNetwork'
import { listEntities } from '../../../../../API/src/_INITIALIZE/3_GetEntities'
import { listAttributes } from '../../../../../API/src/_INITIALIZE/4_EntityAttributes'
import { listAttributeValues } from '../../../../../API/src/_INITIALIZE/5_AttributeValue'

class App extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    setTimeout(async () => {
      var listPlatforms1 = await listPlatforms()
      var listNetworks1 = await listNetworks()
      var listEntities1 = await listEntities()
      var listAttributes1 = await listAttributes()
      var listAttributeValues1 = await listAttributeValues()

      console.log('GET VALUE PLATFORMS', listPlatforms1)
      console.log('GET VALUE NETWORKS', listNetworks1)
      console.log('GET VALUE ENTITIES', listEntities1)
      console.log('GET VALUE ENTITIES-OPERATIONS', listAttributes1)
      console.log('GET VALUE ENTITIES-OPERATIONS-KIND', listAttributeValues1)

      this.setState({
        listPlatforms1,
        listNetworks1,
        listEntities1,
        listAttributes1,
        listAttributeValues1
      })
    }, 200)
  }

  componentDidMount () {
    document.addEventListener('click', () => {
      this.callEvent()

      this.props.dispatch({
        type: 'ADD_COUNT'
      })
    })

    document.addEventListener('my_event', () => {
      alert('PRINT')
      this.callEvent;
    })

    var elt = document.createElement('script')
    elt.innerHTML = `window.tezos = {
      bar:function() {
        console.log("IN FOO:BARR")/*whatever*/
        var event = new Event("my_event");
        document.dispatchEvent(event);
      }, 
      isTezos: true,
    };`
    document.head.appendChild(elt)
  }

  callEvent () {
    console.log('EVENT Call')
    alert('SECOND ALERT')
  }

  render () {
    return (
      <div>
        <h1>Count: {this.props.count}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    count: state.count.count
  }
}

export default connect(mapStateToProps)(App)
