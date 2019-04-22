import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col, Modal, ModalBody, ModalHeader,
  Row,
  Input,
  FormGroup,
  Label,
  InputGroup, Table
} from 'reactstrap';
import Button from "reactstrap/es/Button";
import {notifyError, notifyInfo} from "../Toast";
import CustomLoader from "../CustomLoader";
import axios from 'axios';

class HTTPClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      success: false,
      primary: false,
      danger: false,
      list: [],
      method:'GET',
      resourceEndpoint: '',
      requestBody:'',
      responseBody:'',
      loading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeTextArea = this.onChangeTextArea.bind(this);
    this.onTab = this.onTab.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onSendSample = this.onSendSample.bind(this);
    this.onPopulate = this.onPopulate.bind(this);
    this.onChangeMethod = this.onChangeMethod.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this)
    this.toggleDanger = this.toggleDanger.bind(this)
  }
  toggleSuccess() {
    this.setState({
      success : !this.state.success,
    });
  }
  togglePrimary() {
    this.setState({
      primary : !this.state.primary,
    });
  }
  toggleDanger() {
    this.setState({
      danger : !this.state.danger,
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onChangeTextArea(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onTab(e) {
    if (e.keyCode === 9) { // tab was pressed
      e.preventDefault();
      let val = this.state.requestBody;
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      this.setState(
        {
          "requestBody": val.substring(0, start) + "\t" + val.substring(end)
        },
        () => {
          this.refs.input.selectionStart = this.refs.input.selectionEnd = start + 1
        });
    }
  }
  onChangeMethod(e) {
    this.setState({
      [e.target.name]: e.target.value,
      method: e.target.value,
    }, function () {
      console.log(this.state.method)
    });
  }
  onSend(e) {
    this.setState({
      loading: true,
    })
    if (this.state.method==='GET') {
      axios.get( this.state.resourceEndpoint)
        .then(data => {
          if (typeof data == "object")
            data = JSON.stringify(data, null, "\t");
          this.setState({
            responseBody: data,
            loading: false
          });
        }).catch(error => {
        this.setState({
          loading: false
        })
        notifyError(''+error)
      })
    }
  }
  onSendSample(e) {
    this.setState({
      loading: true,
    })
    if (this.state.method==='GET') {
      axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(data => {
          if (typeof data == "object")
            data = JSON.stringify(data, null, "\t");
          this.setState({
            responseBody: data,
            loading: false
          });
        }).catch(error => {
        this.setState({
          loading: false
        })
        notifyError(''+error)
      })
    }
  }
  onPopulate(row) {
    console.log(row)
    let baseURL = row.instance.protocal+'://'+row.instance.ip + ':' + row.instance.port
    let resourceEndpoint = row.url.replace(baseURL, '')
    this.setState({
      baseURL: baseURL,
      resourceEndpoint: resourceEndpoint,
      method: row.method,
      selectedInstance: row.instance,
      instanceName: row.instance.name
    }, function () {
      this.state.name=this.state.instanceName+':'+this.state.method+':'+this.state.baseURL+this.state.resourceEndpoint
    })
  }

  render() {
    const { list, method } = this.state;
    let loader;
    if (this.state.loading) {
      loader = <CustomLoader/>
    }
    let rows = list.map(
      row => {
        if ((row.status !== 'Deleted' && !this.state.show)|| this.state.show) {
          return <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.instance.name}</td>
            <td>{row.method}</td>
            <td>{row.url}</td>
            <td className="">
              <div className="">
                <Button onClick={()=>{this.togglePrimary();this.onPopulate(row)}} className="ml-2 btn btn-pill btn-outline-info" size="sm" outline>
                  <i className="fa fa-folder-open"></i>&nbsp;Open
                </Button>
              </div>
            </td>
          </tr>
        }
      }
    );
    let view;
    if (method==="POST" || method==="PUT")  {
      view =
        <Row className="format-btn-row">
          <Col xs="12">
            <FormGroup>
              <Col md="9">
                <Label htmlFor="requestBody">Request Body</Label>
              </Col>
              <Col xs="12">
                <Input type="textarea" ref="input" value={this.state.requestBody} onChange={this.onChangeTextArea} onKeyDown={this.onTab} name="requestBody" id="requestBody" rows="15"
                       placeholder="Request Body..." />
              </Col>
            </FormGroup>
          </Col>
        </Row>
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>HTTP Client</strong>
              </CardHeader>
              <CardBody className="instance-card">
                <Row className="format-btn-row">
                  <Col xs="12">
                    <FormGroup>
                      <Button className="float-right mb-2 btn btn-primary col-2" onClick={this.onSendSample} value="send" outline>Sample Request</Button>
                      <InputGroup>
                        <Input className="col-2" value={this.state.method} onChange={this.onChangeMethod} type="select" name="method" id="method">
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="PUT">PUT</option>
                          <option value="DELETE">DELETE</option>
                          <option value="OPTIONS">OPTIONS</option>
                          <option value="HEAD">HEAD</option>
                        </Input>
                        <Input className="col-9" type="text" value={this.state.resourceEndpoint} onChange={this.onChange} id="resourceEndpoint" name="resourceEndpoint" placeholder="Resource Endpoint" />
                        <Button className={this.state.baseURL!==''?"btn btn-primary col-2":"btn btn-primary disabled col-2"} onClick={this.state.baseURL!==''?()=>{this.onSend()}:()=>console.log('Disabled')} value="send" outline>Send Request</Button>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <div>
                  { view }
                  <Row className="format-btn-row">
                    <Col xs="12">
                      <FormGroup>
                        <Col md="9">
                          <Label htmlFor="responseBody">Response Body</Label>
                        </Col>
                        <Col xs="12">
                          <Input type="textarea" ref="input" value={this.state.responseBody} onChange={this.onChangeTextArea} onKeyDown={this.onTab} name="responseBody" id="responseBody" rows="15"
                                 placeholder="Response Body..."  disabled />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}>Save Request</ModalHeader>
                  <ModalBody>
                    <form id="httpclient-save_form" method="POST" onSubmit={this.onSave}>
                      <div className="form-group">
                        <div className="form-group">
                          <input value={this.state.name} onChange={this.onChange} type="text"
                                 className="form-control" name="name"
                                 required/>
                        </div>
                        <p>Are you sure you want to save this request?</p>
                      </div>
                      <Button type="button" onClick={this.toggleSuccess} className="btn btn-secondary float-right">Cancel</Button>
                      <button type="submit" className="btn btn-success float-right mr-2"><i className="fa fa-check"></i>&nbsp;Save Request</button>
                    </form>
                  </ModalBody>
                </Modal>
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                       className={'modal-http modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.togglePrimary}>Saved Requests</ModalHeader>
                  <ModalBody>
                    <Table hover bordered striped responsive size="sm">
                      <thead>
                      <tr>
                        <th>Request Name</th>
                        <th>Instance Name</th>
                        <th>Method</th>
                        <th>URL</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      {rows}
                      </tbody>
                    </Table>
                  </ModalBody>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
        { loader }
      </div>
    );
  }
}

export default HTTPClient;
