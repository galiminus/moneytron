import React from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { connect } from 'react-redux';

import AppBar from "./appbar";
import translations from "../translations";

const About = (props) => (
  <div>
    <AppBar
      onLeftIconButtonClick={props.history.goBack}
      title={translations[props.locale].about}
      iconElementLeft={<IconButton><BackIcon /></IconButton>}
    />
    <div
      style={{
        padding: "64px 1em 0 1em",
        fontFamily: "Roboto, sans-serif",
        fontSize: "1.1em",
        textAlign: "justify"
      }}
    >
      <p>
        <strong>MIT License</strong>
      </p>
      <p>
        Copyright © 2018, Victor Goya
      </p>
      <p>
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      </p>
      <p>
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      </p>
      <p>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>
    </div>
  </div>
)

function mapStateToProps(state, props) {
  return ({
    locale: state.configuration.locale
  });
}

export default connect(mapStateToProps)(About);
