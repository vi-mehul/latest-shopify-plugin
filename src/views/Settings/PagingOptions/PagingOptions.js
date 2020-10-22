import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Label,
  Input,
  Button,
} from "reactstrap";
import { AppSwitch } from '@coreui/react';

const SortingOptions = () => {
  // constructor(props) {
  //   super(props);
  // }

  // state = {
  //   infiniteScrollEnabled: true,
  //   productsPerPage: 10,
  //   saving: '',
  // };

  const componentDidMount = async () => {
    await axios
      .post(
        "https://vishwainfoways.com/shopify-api/paging-options.php",
        {
          data: {
            shop_id: 2,
            action: "GET"
          }
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
          Accept: "text/html",
          "Content-Type": "application/json"
        }
      )
      .then(resJSON => {
        let Options = resJSON.data.Options;
        this.setState({
          infiniteScrollEnabled:
            Options.infiniteScrollEnabled === "1" ? true : false
        });
        this.setState({ productsPerPage: Options.productsPerPage });
      });
  };

const  fnUpdatePagingOptions = async () => {
    this.setState({ saving: 'Saving' });
    await axios
      .post(
        "https://vishwainfoways.com/shopify-api/paging-options.php",
        {
          data: {
            action: "POST",
            shop_id: 2,
            infiniteScrollEnabled:
              this.state.infiniteScrollEnabled == true ? 1 : 0,
            productsPerPage: this.state.productsPerPage
          }
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
          Accept: "text/html",
          "Content-Type": "application/json"
        }
      )
      .then(res => {
        this.setState({ saving: 'Saved' });
      });
  };

  const onProductPerPageChange = e => {
    this.setState({ productsPerPage: e.target.value });
    this.setState({ saving: 'Save' });
  };
  const onInfiniteScrollEnable = e => {
    this.setState({ infiniteScrollEnabled: e.target.checked });
    this.setState({ saving: 'Save' });
  };
  const saveChanges = () => {
    this.fnUpdatePagingOptions();
  }
  
    let paging = [10, 20, 25, 50, 100, 200];
    return (
      <div className="product_labels_page animated fadeIn">
        <Card>
          <CardHeader>
            <Row style={{height: '35px'}}>
            <Col md={10} className="d-flex align-items-center" />
            <Col md={2} className="d-flex align-items-center">
              {this.state.saving !== '' &&
                <Button className={this.state.saving === 'Save' ? "btn btn-success" :
                  this.state.saving === 'Saving' ? "btn btn-warning" : "btn btn-disabled"}
                  onClick={() => this.state.saving === 'Save' && this.saveChanges()}>{this.state.saving}</Button>
              }
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div className="table-responsive">
              <table className="table filter_tabel">
                <tbody>
                  <tr key={1}>
                    <td>Enable Infinite Scroll</td>
                    <td>
                      <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                        key="infiniteScrollEnabled"
                        checked={this.state.infiniteScrollEnabled}
                        name="infiniteScrollEnabled"
                        onChange={e => this.onInfiniteScrollEnable(e)}
                      />
                    </td>
                  </tr>

                  <tr key={2}>
                    <td>Product Per Page</td>
                    <td>
                      <Input type="select"
                        name="sltProductPerPage"
                        value={this.state.productsPerPage}
                        onChange={e => this.onProductPerPageChange(e)}
                      >
                        <option value="0" disabled>Select Product Per Page</option>

                        {paging.map((item, index) => {
                          return (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          );
                        })}
                      </Input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  
}

export default SortingOptions;
