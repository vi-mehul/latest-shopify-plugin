import React, { Component } from "react";
import ToggleDisplay from "react-toggle-display";
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

class Customfilter extends Component {
  constructor(props) {
    super(props);
    this.onEditchange = this.onEditchange.bind(this);
    this.onUpdateSave = this.onUpdateSave.bind(this);
    this.onSaveAddValue = this.onSaveAddValue.bind(this);
    this.onCustomfilterlabelLabelValue = this.onCustomfilterlabelLabelValue.bind(
      this
    );
    this.onCustomLabelValue = this.onCustomLabelValue.bind(this);
    this.OnCustomSwitchvalueChange = this.OnCustomSwitchvalueChange.bind(this);
    this.OnAddCustomVariantsLabelsChange = this.OnAddCustomVariantsLabelsChange.bind(
      this
    );
    this.OnAddCustomLabelNameChange = this.OnAddCustomLabelNameChange.bind(
      this
    );
    this.OnAddCustomFilterLabelsChange = this.OnAddCustomFilterLabelsChange.bind(
      this
    );
    this.OnAddCustomFilterLabelsNameChange = this.OnAddCustomFilterLabelsNameChange.bind(
      this
    );
    this.OnCustomEnabelCheckedChange = this.OnCustomEnabelCheckedChange.bind(
      this
    );
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }
  state = {
    tab: "CustomFilter",
    CustomFilterData: [],
    isCustomlabelvalue: "",
    isCustomfilterlabelvalue: "",
    isInEditMode: false,
    show: false,
    item: [],
    isAddCustomVariantsLabelsvalue: "",
    isAddCustomLabelsNamevalue: "",
    isAddCustomFilterLabelsvalue: "",
    isAddCustomFilterLabelsNamevalue: "",
    isCustomEnabelChecked: false,
    allCustomFilterEnabled: true,
    danger: false,
    savestatus: '',
  };
  OnShowHiedClick() {
    this.setState({ show: !this.state.show });
  }
  onCustomLabelValue = e => {
    this.setState({ isCustomlabelvalue: e.target.value });
  };
  onCustomfilterlabelLabelValue = e => {
    this.setState({ isCustomfilterlabelvalue: e.target.value });
  };
  OnAddCustomVariantsLabelsChange = e => {
    this.setState({ isAddCustomVariantsLabelsvalue: e.target.value });
    this.setState({ savestatus: 'Save'});
  };
  OnAddCustomLabelNameChange = e => {
    this.setState({ isAddCustomLabelsNamevalue: e.target.value });
    this.setState({ savestatus: 'Save'});
  };
  OnAddCustomFilterLabelsChange = e => {
    this.setState({ isAddCustomFilterLabelsvalue: e.target.value });
    this.setState({ savestatus: 'Save'});
  };
  OnAddCustomFilterLabelsNameChange = e => {
    this.setState({ isAddCustomFilterLabelsNamevalue: e.target.value });
    this.setState({ savestatus: 'Save'});
  };
  OnCustomEnabelCheckedChange = e => {
    this.setState({ isCustomEnabelChecked: e.target.checked });
    this.setState({ savestatus: 'Save'});
  };
  OnCustomSwitchvalueChange = (index, item) => {
    let CustomFilterData = [...this.state.CustomFilterData];
    console.log("gergeasg", this.state.CustomFilterData)
    let newItem = {};
    newItem["id"] = item.id;
    newItem["label"] = item.label;
    newItem["name"] = item.name;
    newItem["filter_value"] = item.filter_value;
    newItem["enabled"] = item.enabled === 1 ? 0 : 1;

    CustomFilterData = CustomFilterData.map((item2, index2) =>
      index2 == index ? newItem : item2
    );
    this.setState({ CustomFilterData: CustomFilterData });
  };
  updateCustomFilterStatus = async type => {
    console.log(this.state.allCustomFilterEnabled);
    await axios
      .post(
        "https://searchtuls.com/shopify/api/enabled-filters.php",
        {
          data: {
            shop_id: 2,
            name: type,
            action: "POST",
            enabled: this.state.allCustomFilterEnabled === true ? 1 : 0
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
      .then(res => console.log(res.data));
  };
  fnUpdateCustomFilterStatus = type => {
    this.updateCustomFilterStatus(type);
  };
  OnAllCustomSwitchValueChange = e => {
    this.setState({ allCustomFilterEnabled: e.target.checked }, function () {
      this.fnUpdateCustomFilterStatus("custom");
    });
  };

  returnClassEnabled = () => {
    if (this.state.allCustomFilterEnabled) {
      return "table-responsive";
    }

    return "table-responsive disabledDivContent";
  };

  componentDidMount = async () => {
    await axios
      .post("https://vishwainfoways.com/searchtuls.com/shopify/api/custom-filter-api.php", {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
        Accept: "text/html",
        "Content-Type": "application/json"
      })
      .then(resJSON => {
        let custom_filters = resJSON.data.custom_filters;
        console.log("fgwgagr", custom_filters)
        this.setState({ CustomFilterData: custom_filters });
        //console.log(custom_filters);
        let enabled = [];
        custom_filters.map((item1, index1) => {
          enabled.push(false);
        });
        this.setState({ isInEditMode: enabled });
      });
    await axios
      .post(
        "https://searchtuls.com/shopify/api/enabled-filters.php",
        {
          data: {
            shop_id: 2,
            name: "custom",
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
      .then(res => {
        console.log(res.data);

        this.setState({
          allCustomFilterEnabled: res.data[0].enabled == 1 ? true : false
        });
      });
  };
  onEditchange = index => {
    const isInEditMode = [...this.state.isInEditMode];
    isInEditMode[index] = !isInEditMode[index];
    this.setState({ isInEditMode: isInEditMode });
  };
  onUpdateSave = async (index, item) => {
    let CustomFilterData = [...this.state.CustomFilterData];
    let newItem = {};
    newItem["id"] = item.id;
    newItem["label"] = this.state.isCustomlabelvalue || item.label;
    newItem["name"] = item.name;
    newItem["enabled"] = item.enabled;
    newItem["filter_value"] = item.filter_value;
    newItem["filter_label"] =
      this.state.isCustomfilterlabelvalue || item.filter_label;

    CustomFilterData = CustomFilterData.map((item2, index2) =>
      index2 == index ? newItem : item2
    );
    this.setState({ CustomFilterData: CustomFilterData });
    const item_id = item.id;
    await axios
      .post(
        "https://searchtuls.com/shopify/api/custom-filter-api.php",
        {
          data: {
            shop_id: 2,
            id: item_id,
            label: newItem["label"],
            enabled: newItem["enabled"],
            filter_label: newItem["filter_label"]
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
      .then(res => console.log(res.data));
    this.onEditchange(index);
  };
  onSaveAddValue = async index => { 
    if (
      this.state.isAddCustomVariantsLabelsvalue != '' &&
      this.state.isAddCustomLabelsNamevalue != '' &&
      this.state.isAddCustomFilterLabelsvalue != '' &&
      this.state.isAddCustomFilterLabelsNamevalue != '') {   
    let CustomFilterData = [...this.state.CustomFilterData];
    let newItemAdd = {};
    newItemAdd["label"] = this.state.isAddCustomVariantsLabelsvalue;
    newItemAdd["name"] = this.state.isAddCustomLabelsNamevalue;
    newItemAdd["filter_label"] = this.state.isAddCustomFilterLabelsvalue;
    newItemAdd["filter_value"] = this.state.isAddCustomFilterLabelsNamevalue;
    newItemAdd["enabled"] = this.state.isCustomEnabelChecked == 0 ? 0 : 1;
    CustomFilterData.push(newItemAdd);
    this.setState({ CustomFilterData: CustomFilterData });    
      await axios
        .post(
          "https://searchtuls.com/shopify/api/custom-filter-api.php",
          {
            data: {
              shop_id: 2,
              label: newItemAdd["label"],
              name: newItemAdd["name"],
              filter_label: newItemAdd["filter_label"],
              filter_value: newItemAdd["filter_value"],
              enabled: newItemAdd["enabled"]
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
          this.setState({ savestatus: 'Saving'});
          res.data && this.setState({ savestatus: 'Saved'});
          });
    } else {
      this.setState({danger: true});
    }
  };
  onDeleteItem = async (index, item) => {
    let CustomFilterData = [...this.state.CustomFilterData];
    let newItem = {};
    newItem["id"] = item.id;
    CustomFilterData = CustomFilterData.map((item2, index2) =>
      index2 == index ? newItem : item2
    );
    this.setState({
      CustomFilterData: this.state.CustomFilterData.filter(
        (_, i) => i !== index
      )
    });
    await axios
      .post(
        "https://searchtuls.com/shopify/api/custom-deleteapi.php",
        {
          data: {
            shop_id: 2,
            id: item.id
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
      .then(res => console.log(res.data));
  };
  toggleDanger = () => {
    this.setState({
      danger: false,
    });
  }

  render() {
    return (
      <div className="product_labels_page animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <ToggleDisplay show={!this.state.show} tag="section">
              <Card>
                <CardHeader className="tab_title">
                  <Row>
                    <Col md={9} className="d-flex align-items-center" />
                    <Col md={3} className="d-flex align-items-center">
                      {/*<Button
                        className="MergeFilterValues btn btn-success"
                        onClick={() => this.OnShowHiedClick()}
                      >
                        Add New Filter
                      </Button>*/}
                      {" "}
                      <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                        ref={this.defaultFilterSwitchRef}
                        key="allDefaultFilterEnabled"
                        checked={this.state.allCustomFilterEnabled}
                        name="allDefaultFilterEnabled"
                        onChange={e => this.OnAllCustomSwitchValueChange(e)}
                      />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {" "}
                  <Col md={12} style={{ textAlign: "right" }} />
                  <div className={this.returnClassEnabled()}>
                    <table className="table filter_tabel">
                      <thead>
                        <tr>
                          <th>Custom Variants Filter</th>
                          <th>Filter Label</th>
                          <th>Enabel/Disabel</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.CustomFilterData.map((item, index) => {
                          return this.state.isInEditMode[index] ? (
                            <tr key={index}>
                              <td>
                                {index > 1 &&
                                <Input
                                  type="text"
                                  defaultValue={
                                    item.label || this.state.isCustomlabelvalue
                                  }
                                  disabled
                                  onChange={this.onCustomLabelValue}
                                /> }
                                { index < 2 &&
                                  <Input
                                  type="text"
                                  defaultValue={
                                    item.label || this.state.isCustomlabelvalue
                                  }
                                  onChange={this.onCustomLabelValue}
                                />
                                }
                              </td>
                              <td>
                                <Input
                                  type="text"
                                  defaultValue={
                                    item.filter_label ||
                                    this.state.isCustomfilterlabelvalue
                                  }
                                  onChange={this.onCustomfilterlabelLabelValue}
                                />
                              </td>
                              <td>
                                <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                                  key={index}
                                  checked={item.enabled == 1 ? true : false}
                                  onChange={e =>
                                    this.OnCustomSwitchvalueChange(index, item)
                                  }
                                />
                              </td>
                              <td>
                                <Button
                                  className="edit_delete_btn" color="success"
                                  onClick={() => this.onUpdateSave(index, item)}
                                >
                                  <i className="fa fa-check fa-lg"></i>
                                </Button>
                              </td>
                              <td>
                                <Button
                                  className="edit_delete_btn" color="danger"
                                  onClick={() => this.onEditchange(index)}
                                >
                                  <i className="fa fa-close fa-lg"></i>
                                </Button>
                              </td>
                            </tr>
                          ) : (
                              <tr key={index}>
                                <td>{item.label}</td>
                                <td>{item.filter_label}</td>
                                <td>
                                  <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                                    disabled={true}
                                    key={index}
                                    checked={item.enabled == 1 ? true : false}
                                  />
                                </td>
                                <td>
                                  <Button
                                    className="edit_delete_btn block" color="primary" outline
                                    onClick={() => this.onEditchange(index)}
                                  >
                                    <i className="cui-pencil icons font-2xl d-block"></i>
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    className="edit_delete_btn block" color="danger" outline
                                    onClick={() => this.onDeleteItem(index, item)}
                                  >
                                    <i className="icon-trash icons font-2xl d-block"></i>
                                  </Button>
                                </td>
                              </tr>
                            );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </ToggleDisplay>

            <ToggleDisplay show={this.state.show} tag="section">
              <Card className="label_by_tag">
                <CardHeader className="tab_title">
                  <Row>
                    <Col md={10} className="d-flex align-items-center">
                      <Button
                        className="btn btn-link btn-back"
                        onClick={() => this.OnShowHiedClick()}
                      >
                        &lt;&lt; back to: Product Lables
                      </Button>
                    </Col>
                    <Col md={2} className="d-flex align-items-center" >
                      {this.state.savestatus !== '' &&
                        <Button className={this.state.savestatus === 'Save' ? "btn btn-success" : 
                        this.state.savestatus === 'Saving' ? "btn btn-warning" : "btn btn-disabled" } 
                        onClick={() => this.state.savestatus === 'Save' && this.onSaveAddValue()}>{this.state.savestatus}</Button>
                      }
                      <Modal isOpen={this.state.danger} toggle={this.toggleDanger.bind(this)}
                        className={'modal-danger'}>
                        <ModalHeader>Fill all details</ModalHeader>
                        <ModalBody>
                          You must need to add fill all details.
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" onClick={this.toggleDanger.bind(this)}>Ok</Button>
                        </ModalFooter>
                      </Modal>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="border border_padding">
                  <Row className="border_bottom">
                    <Col md={3}
                      className="tab_content_title"
                      htmlFor="basic-example"
                    >
                      Custom Variants Labels{" "}
                    </Col>
                    <Col md={9}>
                      <Input
                        name="text"
                        type="select"
                        className="form-control"
                        value={this.state.isAddCustomVariantsLabelsvalue}
                        onChange={this.OnAddCustomVariantsLabelsChange}
                      >
                        <option>On Sale</option>
                        <option>Availability</option>
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={3}
                      className="tab_content_title"
                      htmlFor="basic-example"
                    >
                      Custom Labels Name{" "}
                    </Col>
                    <Col md={9}>
                      <Input
                        name="text"
                        type="textbox"
                        className="form-control"
                        value={this.state.isAddCustomLabelsNamevalue}
                        onChange={this.OnAddCustomLabelNameChange}
                      />
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={3}
                      className="tab_content_title"
                      htmlFor="basic-example"
                    >
                      Custom Filter Labels{" "}
                    </Col>
                    <Col md={9}>
                      <Input
                        name="text"
                        type="textbox"
                        className="form-control"
                        value={this.state.isAddCustomFilterLabelsvalue}
                        onChange={this.OnAddCustomFilterLabelsChange}
                      />
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={3}
                      className="tab_content_title"
                      htmlFor="basic-example"
                    >
                      Custom Filter Labels Name{" "}
                    </Col>
                    <Col md={9}>
                      <Input
                        name="text"
                        type="textbox"
                        className="form-control"
                        value={this.state.isAddCustomFilterLabelsNamevalue}
                        onChange={this.OnAddCustomFilterLabelsNameChange}
                      />
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Enabel/Disabel{" "}
                    </Col>
                    <Col md={6}>
                      <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                        checked={this.state.isCustomEnabelChecked}
                        onChange={e => this.OnCustomEnabelCheckedChange(e)}
                      />
                    </Col>
                  </Row>

                </CardBody>
              </Card>
            </ToggleDisplay>

          </Col>
        </Row >
      </div >
    );
  }
}

export default Customfilter;
