import React, { Component } from 'react'

export class Chat extends Component {

    componentDidMount(){
        (function(d, m){
            var kommunicateSettings =
            {"appId":"20d770d620e2d1c242e1c36bf442865be","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script");s.type = "text/javascript";s.async=true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;

        })(document, window.kommunicate || {});
    }

  render() {
    return (
      <div>
        <h1>chat boat</h1>
      </div>
    )
  }
}

export default Chat