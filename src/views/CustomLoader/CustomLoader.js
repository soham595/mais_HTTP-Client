import React, { Component } from 'react';
import Lottie from 'react-lottie'
import animationData from '../../assets/img/custom-loaders/loader-1.json'
import {Modal} from "reactstrap";
class CustomLoader extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
    };
    return (
      <div>
        <Modal isOpen={true} className="loader-modal">
          <Lottie options={defaultOptions} height={500} width={400}/>
        </Modal>
      </div>
    );
  }
}

export default CustomLoader;
