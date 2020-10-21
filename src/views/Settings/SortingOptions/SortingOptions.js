import React, { Component } from "react";
import axios from "axios";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Label,
  Input,
  Button,
  Modal, ModalBody, ModalHeader, ModalFooter
} from "reactstrap";
import { AppSwitch } from '@coreui/react';

class SortingOptions extends Component {


  constructor(props) {
    super(props);
  }
  state = {
    SortingOptions: [
      { "title": "Text for Order By Featured", "label": "Featured", "name": "manual", "enabled": true, "isInEditMode": false, 'msg': 'Label Can not be blank' },
      { "title": "Text for Order By  Best Selling", "label": "Best Selling", "name": "best-selling", "enabled": true, "isInEditMode": false, 'msg': 'Label Can not be blank' },
      { "title": "Text for Order By Product Title Ascending", "label": "Alphabetically, A-Z", "name": "title-ascending", "enabled": true, "isInEditMode": false, 'msg': 'Label Can not be blank' },
      { "title": "Text for Order By Product Title Descending", "label": "Alphabetically, Z-A", "name": "title-descending", "enabled": true, "isInEditMode": false, 'msg': 'Label Can not be blank' },
      { "title": "Text for Order By Product Price Ascending", "label": "Price, low to high", "name": "price-ascending", "enabled": true, "isInEditMode": false, 'msg': 'Label Can not be blank' },
      { "title": "Text for Order By Product Title Descending", "label": "Price, high to low", "name": "price-descending", "enabled": true, "isInEditMode": false, 'msg': 'Label Can not be blank' },
      { "title": "Text for Order By Product Date Descending ", "label": "Date, new to old", "name": "created-descending", "enabled": true, "isInEditMode": false, 'msg': 'Label Can not be blank' },
      { "title": "Text for Order By Product Date Ascending", "label": "Date, old to new", "name": "created-ascending", "enabled": true, "isInEditMode": false, 'msg': 'Label Can not be blank' }
    ],
    allSortingOptionsEnabled: true,
    showErrors: false,
    savestatus: '',
  };
  componentDidMount = async () => {
    await axios
      .post(
        "https://searchtuls.com/shopify/api/sorting-options.php", {
          data: {
            shop_id: 2,
            action: 'GET'
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

        console.log(resJSON);
        let SortingOptions1 = resJSON.data;
        let SortingOptions2 = [...this.state.SortingOptions];

        let SortingOptions = [];

        SortingOptions2.map((item, i) => {
          let item1 = Object.assign({}, item);
          item1["label"] = SortingOptions1[i].label;
          item1["enabled"] = SortingOptions1[i].enabled == false ? 0 : 1;
          SortingOptions.push(item1);

          // let anc = Object.assign({},SortingOptions1[i],item);
          // SortingOptions.push(anc);
          // console.log(SortingOptions);
        });

        console.log(SortingOptions);

        /*let SortingOptions = [];
        SortingOptions2.map((item,i)=>{
          let anc = Object.assign({},SortingOptions1[i],item);
          SortingOptions.push(anc);
          console.log(SortingOptions);
        });*/

        this.setState({ SortingOptions: SortingOptions });

        /*arr1.forEach((itm, i) => {
          arr3.push(Object.assign({}, itm, arr2[i]));
        });*/
        /*let default_filters = resJSON.data.default_filters;
        this.setState({ DefaultFilterData: default_filters });
        let enabled = [];
        default_filters.map((item1, index1) => {
          enabled.push(false);
        });
        this.setState({ isInEditMode: enabled });*/
      });
  };
  fnUpdateSortingOptions = async () => {
    await axios
      .post(
        "https://searchtuls.com/shopify/api/sorting-options.php",
        {
          data: {
            action: 'POST',
            shop_id: 2,
            sortingoptions: this.state.SortingOptions
          }
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
          "Accept": "text/html",
          "Content-Type": "application/json"
        }
      )
      .then(res => res.data && this.setState({savestatus: 'Saved'}));

  }
  updateSortingOptionsStatus = async (type) => {
    await axios
      .post(
        "https://searchtuls.com/shopify/api/enabled-filters.php",
        {
          data: {
            shop_id: 2,
            name: type,
            enabled: (this.state.allSortingOptionsEnabled === true) ? 1 : 0
          }
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
          "Accept": "text/html",
          "Content-Type": "application/json"
        }
      )
      .then(res => console.log(res.data));

  }
  fnUpdateSortingOptionsStatus = (type) => {
    this.updateSortingOptionsStatus(type);
  }
  OnAllSortingSwitchValueChange = (e) => {
    this.setState({ allSortingOptionsEnabled: e.target.checked }, function () {
      this.fnUpdateSortingOptionsStatus('sortingoptions');
    });
  }
  returnClassEnabled = () => {

    if (this.state.allSortingOptionsEnabled) {
      return "table-responsive";
    }

    return "table-responsive disabledDivContent";
  }
  onUpdateLabelValue = (e, item, index) => {
    let SortingOptions = [...this.state.SortingOptions];
    SortingOptions[index].label = e.target.value;
    this.setState({ SortingOptions: SortingOptions });
    this.setState({savestatus: 'Save'});
  }
  saveAllSortingOptions = () => {
    this.setState({savestatus: 'Saving'});
    let SortingOptions = [...this.state.SortingOptions];
    let isError = false;
    SortingOptions.map((item, index) => {
      if (item.label == "") {
        isError = true;
      }
    })
    if (isError) {
      this.setState({ showErrors: true });
    } else {
      this.setState({ showErrors: false }, function () {
        this.fnUpdateSortingOptions();
      });
    }
  }
  OnSortingSwitchValueChange = (e, item, index) => {
    let SortingOptions = [...this.state.SortingOptions];
    SortingOptions[index].enabled = e.target.checked;
    this.setState({ SortingOptions: SortingOptions });
    this.setState({savestatus: 'Save'});
  }
  render() {
    return (
      <div className="product_labels_page animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
            <Col md={9} className="d-flex align-items-center" />
            <Col md={1} className="d-flex align-items-center">
              <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                ref={this.defaultFilterSwitchRef}
                key="allDefaultFilterEnabled"
                checked={this.state.allSortingOptionsEnabled}
                name="allDefaultFilterEnabled"
                onChange={e =>
                  this.OnAllSortingSwitchValueChange(e)
                }
              />
              </Col>
              <Col md={2} className="d-flex align-items-center">
              {this.state.savestatus !== '' &&
                <Button className={this.state.savestatus === 'Save' ? "btn btn-success" :
                  this.state.savestatus === 'Saving' ? "btn btn-warning" : "btn btn-disabled"}
                  onClick={() => this.state.savestatus === 'Save' && this.saveAllSortingOptions()}>{this.state.savestatus}</Button>
              }
            </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div className={this.returnClassEnabled()} >
              {this.state.showErrors && <div className="" style={{ color: 'red' }}>Please solve All Errors.</div>}
              <table className="table filter_tabel">
                <thead>
                  <tr>
                    <th width="30%">Option Name</th>
                    <th width="60%">Option Label</th>
                    <th width="10%">Enable/Disable</th>

                  </tr>
                </thead>
                <tbody>
                  {this.state.SortingOptions.map((item, index) => {

                    return (
                      <tr key={`${index}-tr`}>
                        <td>
                          {
                            item.title
                          }
                        </td>
                        <td>
                          <Input
                            type="text"
                            value={
                              item.label
                            }
                            onChange={(e) => this.onUpdateLabelValue(e, item, index)}
                          />
                          {item.label == "" && <span style={{ color: 'red' }}>{item.msg}</span>}
                        </td>
                        <td >
                          <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                            key={index}
                            checked={item.enabled == 1 ? true : false}
                            onChange={e =>
                              this.OnSortingSwitchValueChange(e, item, index)
                            }
                          />
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SortingOptions;

