import React, { Component } from "react";
import Switch from "react-switchery-component";
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

class Productfilter extends Component {
  constructor(props) {
    super(props);
    this.onUpdateSave = this.onUpdateSave.bind(this);
    this.onEditchange = this.onEditchange.bind(this);
    this.onProductLabelValue = this.onProductLabelValue.bind(this);
    this.OnProductSwitchvalueChange = this.OnProductSwitchvalueChange.bind(
      this
    );
    this.OnShowHiedClick = this.OnShowHiedClick.bind(this);
    this.onSaveAddValue = this.onSaveAddValue.bind(this);
    this.OnAddProductVariantsChange = this.OnAddProductVariantsChange.bind(
      this
    );
    this.OnAddProductVariantsLabelNameChange = this.OnAddProductVariantsLabelNameChange.bind(
      this
    );
    this.OnProductEnabelCheckedChange = this.OnProductEnabelCheckedChange.bind(
      this
    );
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }
  state = {
    tab: "ProductVariantsFilter",
    ProductFilterData: [],
    isInEditMode: false,
    show: false,
    isProductlabelvalue: "",
    isAddProductlabelvalue: "",
    isAddProductlabelNamevalue: "",
    isProductEnabelChecked: false,
    isVarisntsList: [],
    item: [],
    allVariantFilterEnabled: false,
    savestatus: '',
    danger: false,
  };
  OnShowHiedClick() {
    this.setState({ show: !this.state.show });
  }
  onProductLabelValue = e => {
    this.setState({ isProductlabelvalue: e.target.value });
  };
  OnAddProductVariantsChange = e => {
    this.setState({ isAddProductlabelvalue: e.target.value });
    this.setState({ savestatus: 'Save'});
  };
  OnAddProductVariantsLabelNameChange = e => {
    this.setState({ isAddProductlabelNamevalue: e.target.value });
    this.setState({ savestatus: 'Save'});
  };
  OnProductEnabelCheckedChange = e => {
    this.setState({ isProductEnabelChecked: e.target.checked });
    this.setState({ savestatus: 'Save'});
  };
  OnProductSwitchvalueChange = (index, item) => {
    let ProductFilterData = [...this.state.ProductFilterData];
    let newItem = {};
    newItem["id"] = item.id;
    newItem["label"] = item.label;
    newItem["name"] = item.name;
    newItem["enabled"] = item.enabled === 1 ? 0 : 1;

    ProductFilterData = ProductFilterData.map((item2, index2) =>
      index2 == index ? newItem : item2
    );
    this.setState({ ProductFilterData: ProductFilterData });
  };
  componentDidMount = async () => {
    await axios
      .post("https://searchtuls.com/shopify/api/product-filter-api.php", {
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
        let product_variants_filters = resJSON.data.product_variants_filters;
        this.setState({ ProductFilterData: product_variants_filters });
        let enabled = [];
        product_variants_filters.map((item1, index1) => {
          enabled.push(false);
        });
        this.setState({ isInEditMode: enabled });
      });
    await axios
      .post("https://searchtuls.com/shopify/api/variants-list-api.php", {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
        Accept: "text/html",
        "Content-Type": "application/json"
      })
      .then(res => {
        //console.log(res.data.variantsSelectedOptions)
        this.setState({ isVarisntsList: res.data.variantsSelectedOptions });
      });
    await axios
      .post(
        "https://searchtuls.com/shopify/api/enabled-filters.php",
        {
          data: {
            shop_id: 2,
            name: "variant",
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
          allVariantFilterEnabled: res.data[0].enabled == 1 ? true : false
        });
      });
  };
  onEditchange = index => {
    const isInEditMode = [...this.state.isInEditMode];
    isInEditMode[index] = !isInEditMode[index];
    this.setState({ isInEditMode: isInEditMode });
  };
  onUpdateSave = async (index, item) => {
    let ProductFilterData = [...this.state.ProductFilterData];
    let newItem = {};
    newItem["id"] = item.id;
    newItem["label"] = this.state.isProductlabelvalue || item.label;
    newItem["name"] = item.name;
    newItem["enabled"] = item.enabled;

    ProductFilterData = ProductFilterData.map((item2, index2) =>
      index2 == index ? newItem : item2
    );
    this.setState({ ProductFilterData: ProductFilterData });
    const item_id = item.id;
    await axios
      .post(
        "https://searchtuls.com/shopify/api/product-filter-api.php",
        {
          data: {
            shop_id: 2,
            id: item_id,
            label: newItem["label"],
            enabled: newItem["enabled"]
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
      this.state.isAddProductlabelvalue != '' &&
      this.state.isAddProductlabelNamevalue != '') {
      let ProductFilterData = [...this.state.ProductFilterData];
      let newItemAdd = {};
      newItemAdd["label"] = this.state.isAddProductlabelvalue;
      newItemAdd["name"] = this.state.isAddProductlabelNamevalue;
      newItemAdd["enabled"] = this.state.isProductEnabelChecked ? 1 : 0;
      ProductFilterData.push(newItemAdd);
      await axios
        .post(
          "https://searchtuls.com/shopify/api/product-filter-api.php",
          {
            data: {
              shop_id: 2,
              label: newItemAdd["label"],
              name: newItemAdd["name"],
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
          this.setState({ savestatus: 'Saving' });
          res.data && this.setState({ savestatus: 'Saved' });
        });
    } else {
      this.setState({danger: true});
    }
  };
  onDeleteItem = async (index, item) => {
    let ProductFilterData = [...this.state.ProductFilterData];
    let newItem = {};
    newItem["id"] = item.id;
    ProductFilterData = ProductFilterData.map((item2, index2) =>
      index2 == index ? newItem : item2
    );
    this.setState({
      ProductFilterData: this.state.ProductFilterData.filter(
        (_, i) => i !== index
      )
    });
    await axios
      .post(
        "https://searchtuls.com/shopify/api/product-deleteapi.php",
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
  updateVariantFilterStatus = async type => {
    await axios
      .post(
        "https://searchtuls.com/shopify/api/enabled-filters.php",
        {
          data: {
            shop_id: 2,
            name: type,
            action: "POST",
            enabled: this.state.allVariantFilterEnabled === true ? 1 : 0
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
  fnUpdateVariantFilterStatus = type => {
    this.updateVariantFilterStatus(type);
  };
  OnAllVariantSwitchValueChange = e => {
    this.setState({ allVariantFilterEnabled: e.target.checked }, function () {
      this.fnUpdateVariantFilterStatus("variant");
    });
  };

  returnClassEnabled = () => {
    if (this.state.allVariantFilterEnabled) {
      return "table-responsive";
    }

    return "table-responsive disabledDivContent";
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
                    <Col md={9} className="d-flex align-items-center">
                    </Col>
                    <Col md={3} className="d-flex align-items-center">
                      <Button
                        className="MergeFilterValues btn btn-success"
                        onClick={() => this.OnShowHiedClick()}
                      >
                        Add New Filter
                      </Button>{" "}
                      <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                        ref={this.defaultFilterSwitchRef}
                        key="allDefaultFilterEnabled"
                        checked={this.state.allVariantFilterEnabled}
                        name="allDefaultFilterEnabled"
                        onChange={e => this.OnAllVariantSwitchValueChange(e)}
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
                          <th>Product Variants Filter</th>
                          <th>Enabel/Disabel</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.ProductFilterData.map((item, index) => {
                          return this.state.isInEditMode[index] ? (
                            <tr key={index}>
                              <td>
                                <Input
                                  type="text"
                                  defaultValue={
                                    item.label || this.state.isProductlabelvalue
                                  }
                                  onChange={this.onProductLabelValue}
                                />
                              </td>
                              <td>
                                <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                                  key={index}
                                  checked={item.enabled == 1 ? true : false}
                                  onChange={e =>
                                    this.OnProductSwitchvalueChange(index, item)
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
                    <Col md={2} className="d-flex align-items-center">
                      {this.state.savestatus !== '' &&
                        <Button className={this.state.savestatus === 'Save' ? "btn btn-success" :
                          this.state.savestatus === 'Saving' ? "btn btn-warning" : "btn btn-disabled"}
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
                      Product Variants Filter Labels{" "}
                      <div className="row row_notes" style={{ color: '#666' }}>
                        Like Size, Color, Material, etc
                        </div>
                    </Col>
                    <Col md={9}>
                      <Input
                        name="text"
                        type="textbox"
                        className="form-control"
                        value={this.state.isAddProductlabelvalue}
                        onChange={this.OnAddProductVariantsChange}
                      />
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={3}
                      className="tab_content_title"
                      htmlFor="basic-example"
                    >
                      Product Filter Labels Name{" "}
                    </Col>
                    <Col md={9}>
                      <Input type="select"
                        className="font_size_box"
                        value={this.state.isAddProductlabelNamevalue}
                        onChange={this.OnAddProductVariantsLabelNameChange}
                      >

                        <option value="">Select Option </option>
                        {this.state.isVarisntsList.map((item, index) => {
                          return <option value={item.name}>{item.name}</option>;
                        })}
                      </Input>

                    </Col>
                  </Row>

                  <div className="border_bottom">
                    <div className="row">
                      <div className="col-sm-6 tab_content_title">
                        Enabel/Disabel{" "}
                      </div>
                      <div className="col-sm-6">
                        <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                          checked={this.state.isProductEnabelChecked}
                          onChange={e => this.OnProductEnabelCheckedChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </ToggleDisplay>

          </Col>
        </Row >
      </div>
    );
  }
}
export default Productfilter;
