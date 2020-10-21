import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { Button, Card, CardBody, CardHeader, Col, Row, Badge, Input, FormText } from 'reactstrap';
import { AppSwitch } from '@coreui/react';

class Defaultfilter extends Component {
  constructor(props) {
    super(props);

    this.defaultFilterSwitchRef = React.createRef();
    this.OnSelectOptionListing = this.OnSelectOptionListing.bind(this);
    this.OnExcluedSelectOptionListing = this.OnExcluedSelectOptionListing.bind(
      this
    );
  }
  state = {
    DefaultFilterData: [],
    isInEditMode: false,
    isDefaultlabelvalue: "",
    isDefaultSwitchvalue: false,
    item: [],
    allDefaultFilterEnabled: true,
    selectedOption: [],
    excluedselectedOption: [],
    handlelist: [],
    taglist: [],
    vendorlist: [],
    productTypelist: [],
    AllselectedOption: [],
    CIOption: [],
    CEOption: [],
    TIOption: [],
    TEOption: [],
    VIOption: [],
    VEOption: [],
    PIOption: [],
    PEOption: [],
    defaultDisabled: false,
    IsExcludeSwitchvalue: [],
    IsIncludeSwitchvalue: []
  };

  ExcludeSwitchvalueChange = (e, item, index) => {
    let IsIncludeSwitchvalue = [...this.state.IsIncludeSwitchvalue];
    let IsExcludeSwitchvalue = [...this.state.IsExcludeSwitchvalue];

    IsIncludeSwitchvalue[index] = e.target.checked ? false : IsIncludeSwitchvalue[index];
    IsExcludeSwitchvalue[index] = e.target.checked;

    this.setState({ IsIncludeSwitchvalue });
    this.setState({ IsExcludeSwitchvalue });
  };

  IncludeSwitchvalueChange = (e, item, index) => {
    let IsIncludeSwitchvalue = [...this.state.IsIncludeSwitchvalue];
    let IsExcludeSwitchvalue = [...this.state.IsExcludeSwitchvalue];

    IsIncludeSwitchvalue[index] = e.target.checked;
    IsExcludeSwitchvalue[index] = e.target.checked ? false : IsExcludeSwitchvalue[index];

    this.setState({ IsIncludeSwitchvalue });
    this.setState({ IsExcludeSwitchvalue });
  };
  returnClassVisibel = () => {
    if (this.state.IsIncludeSwitchvalue) {
      return "visibel_invisibel_switch";
    }
    return "visibel_invisibel_switch disabledDivContent";
  };
  returnClassInVisibel = () => {
    if (this.state.IsExcludeSwitchvalue) {
      return "visibel_invisibel_switch";
    }
    return "visibel_invisibel_switch disabledDivContent";
  };
  OnSelectOptionListing = value => {
    let selectedOption = [];
    value.map((item, index) => {
      selectedOption.push(item.value);
    })
    this.setState({ selectedOption: selectedOption.join() });
  };
  OnExcluedSelectOptionListing = value => {
    let excluedselectedOption = [];
    value.map((item, index) => {
      excluedselectedOption.push(item.value);
    })
    this.setState({ excluedselectedOption: excluedselectedOption.join() });
  };
  onDefaultLabelValue = e => {
    this.setState({ isDefaultlabelvalue: e.target.value });
  };
  OnDefaultSwitchvalueChange = (index, item) => {
    let DefaultFilterData = [...this.state.DefaultFilterData];
    let newItem = {};
    newItem["id"] = item.id;
    newItem["label"] = item.label;
    newItem["name"] = item.name;
    newItem["enabled"] = item.enabled === 1 ? 0 : 1;

    DefaultFilterData = DefaultFilterData.map((item2, index2) =>
      index2 == index ? newItem : item2
    );
    this.setState({ DefaultFilterData: DefaultFilterData });
  };

  componentDidMount = async () => {
    await axios
      .post(
        "https://vishwainfoways.com/shopify-api/default-variant-filter-api.php",
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
        let default_filters = resJSON.data.default_filters;
        console.log("geragegegr", default_filters)
        this.setState({ DefaultFilterData: default_filters });
        let enabled = [];
        let IsIncludeSwitchvalue = [];
        let IsExcludeSwitchvalue = [];
        default_filters.map((item, index) => {
          enabled.push(false);
          IsIncludeSwitchvalue.push(item.Include[0].enabled == "0" ? false : true);
          IsExcludeSwitchvalue.push(item.Exclude[0].enabled == "0" ? false : true);
          if (item.name == "collections") {
            let CIOption = item.Include[0].name.split(",");
            let OCIOption = [];
            CIOption.map((item, index) => {
              OCIOption.push({ value: item, label: item });
            });

            let CEOption = item.Exclude[0].name.split(",");
            let OCEOption = [];
            CEOption.map((item, index) => {
              OCEOption.push({ value: item, label: item })
            });
            this.setState({ CIOption: OCIOption });
            this.setState({ CEOption: OCEOption });

            this.setState({ IncCollName: item.Include[0].name });
            this.setState({ ExcCollName: item.Exclude[0].name });
          }

          if (item.name == "tags") {
            let TIOption = item.Include[0].name.split(",");
            let OTIOption = [];
            TIOption.map((item, index) => {
              OTIOption.push({ value: item, label: item })
            });

            let TEOption = item.Exclude[0].name.split(",");
            let OTEOption = [];
            TEOption.map((item, index) => {
              OTEOption.push({ value: item, label: item })
            });
            this.setState({ TEOption: OTEOption });
            this.setState({ TIOption: OTIOption });

            this.setState({ IncTagName: item.Include[0].name });
            this.setState({ ExcTagName: item.Exclude[0].name });
          }

          if (item.name == "vendor") {
            let VIOption = item.Include[0].name.split(",");
            let OVIOption = [];
            VIOption.map((item, index) => {
              OVIOption.push({ value: item, label: item })
            })

            let VEOption = item.Exclude[0].name.split(",");
            let OVEOption = [];
            VEOption.map((item, index) => {
              OVEOption.push({ value: item, label: item })
            })
            this.setState({ VEOption: OVEOption });
            this.setState({ VIOption: OVIOption });

            this.setState({ IncVendorName: item.Include[0].name });
            this.setState({ ExcVendorName: item.Exclude[0].name });
          }
          if (item.name == "product_type") {
            let PIOption = item.Include[0].name.split(",");
            let OPIOption = [];
            PIOption.map((item, index) => {
              OPIOption.push({ value: item, label: item })
            })

            let PEOption = item.Exclude[0].name.split(",");
            let OPEOption = [];
            PEOption.map((item, index) => {
              OPEOption.push({ value: item, label: item })
            })
            this.setState({ PEOption: OPEOption });
            this.setState({ PIOption: OPIOption });

            this.setState({ IncProdName: item.Include[0].name });
            this.setState({ ExcProdName: item.Exclude[0].name });
          }
        });
        this.setState({ isInEditMode: enabled });
        this.setState({ IsIncludeSwitchvalue: IsIncludeSwitchvalue });
        this.setState({ IsExcludeSwitchvalue: IsExcludeSwitchvalue });
      });
    await axios
      .post(
        "https://searchtuls.com/shopify/api/enabled-filters.php",
        {
          data: {
            shop_id: 2,
            name: "default",
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
        this.setState({
          allDefaultFilterEnabled: res.data[0].enabled == 1 ? true : false
        });
      });
    await axios
      .post(
        "https://searchtuls.com/shopify/api/collection-vs-products-chandlelist.php",
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
        let handlelist = [];
        let taglist = [];
        let vendorlist = [];
        let productTypelist = [];

        resJSON.data.handle.map(item => {
          handlelist.push({ value: item.handle, label: item.handle });
        });
        this.setState({ handlelist: handlelist });

        resJSON.data.tag.map(item => {
          taglist.push({ value: item.tag, label: item.tag });
        });
        this.setState({ taglist: taglist });

        resJSON.data.vendor.map(item => {
          vendorlist.push({ value: item.vendor, label: item.vendor });
        });
        this.setState({ vendorlist: vendorlist });

        resJSON.data.productType.map(item => {
          productTypelist.push({
            value: item.productType,
            label: item.productType
          });
        });
        this.setState({ productTypelist: productTypelist });
      });

  };
  onEditchange = index => {
    const isInEditMode = [...this.state.isInEditMode];
    isInEditMode[index] = !isInEditMode[index];
    this.setState({ isInEditMode: isInEditMode });
  };

  onUpdateSave = async (index, item) => {
    let DefaultFilterData = [...this.state.DefaultFilterData];
    let newItem = {};
    newItem["id"] = item.id;
    newItem["label"] = this.state.isDefaultlabelvalue || item.label;
    newItem["name"] = item.name;
    newItem["enabled"] = item.enabled;

    DefaultFilterData = DefaultFilterData.map((item2, index2) =>
      index2 === index ? newItem : item2
    );

    this.setState({ DefaultFilterData: DefaultFilterData });

    const item_id = item.id;
    var includeSwitch = '';
    var excludeSwitch = '';
    this.state.IsIncludeSwitchvalue.map((item1, index1) => {
      if (index === index1) {
        includeSwitch = item1 ? 1 : 0;
      }
    })
    this.state.IsExcludeSwitchvalue.map((item1, index1) => {
      if (index === index1) {
        excludeSwitch = item1 ? 1 : 0;
      }
    })

    let IncludeOption = '';
    let ExcludeOption = '';
    if (this.state.excluedselectedOption.length === 0) {
      if (item.name === 'collections') {
        ExcludeOption = this.state.ExcCollName;
      } else if (item.name === 'tags') {
        ExcludeOption = this.state.ExcTagName;
      } else if (item.name === 'vendor') {
        ExcludeOption = this.state.ExcVendorName;
      } else if (item.name === "product_type") {
        ExcludeOption = this.state.ExcProdName;
      } else { }
    }

    if (this.state.selectedOption.length === 0) {
      if (item.name === 'collections') {
        IncludeOption = this.state.IncCollName;
      } else if (item.name === 'tags') {
        IncludeOption = this.state.IncTagName;
      } else if (item.name === 'vendor') {
        IncludeOption = this.state.IncVendorName;
      } else if (item.name === "product_type") {
        IncludeOption = this.state.IncProdName;
      } else { }
    }

    var incl = this.state.selectedOption.length === 0 ? IncludeOption : this.state.selectedOption;
    var excl = this.state.excluedselectedOption.length === 0 ? ExcludeOption : this.state.excluedselectedOption;
    let CIOption = incl.split(",");
    let CEOption = excl.split(",");


    let OCIOption = [];
    let OCEOption = [];
    let OTIOption = [];
    let OTEOption = [];
    let OVIOption = [];
    let OVEOption = [];
    let OPIOption = [];
    let OPEOption = [];

    CIOption.map((item1, index1) => {
      if (item.name === "collections") {
        OCIOption.push({ value: item1, label: item1 });
      } else if (item.name === "tags") {
        OTIOption.push({ value: item1, label: item1 });
      } else if (item.name === "vendor") {
        OVIOption.push({ value: item1, label: item1 });
      } else if (item.name === "product_type") {
        OPIOption.push({ value: item1, label: item1 });
      } else { }
    });

    CEOption.map((item1, index1) => {
      if (item.name === "collections") {
        OCEOption.push({ value: item1, label: item1 });
      } else if (item.name === "tags") {
        OTEOption.push({ value: item1, label: item1 });
      } else if (item.name === "vendor") {
        OVEOption.push({ value: item1, label: item1 });
      } else if (item.name === "product_type") {
        OPEOption.push({ value: item1, label: item1 });
      } else { }
    });

    this.setState({ CIOption: OCIOption });
    this.setState({ CEOption: OCEOption });

    this.setState({ TIOption: OTIOption });
    this.setState({ TEOption: OTEOption });

    this.setState({ VIOption: OVIOption });
    this.setState({ VEOption: OVEOption });

    this.setState({ PIOption: OPIOption });
    this.setState({ PEOption: OPEOption });

    await axios
      .post(
        "https://vishwainfoways.com/shopify-api/default-variant-filter-api.php",
        {
          data: {
            action: "POST",
            shop_id: 2,
            id: item_id,
            type: item.name,
            label: newItem["label"],
            enabled: newItem["enabled"],
            IncludeOption: incl,
            ExcludeOption: excl,
            IncludeSwitchValue: includeSwitch,
            ExcludeSwitchValue: excludeSwitch,
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
      .then(res => console.log("res.data"));

    this.onEditchange(index);
  };

  updateDefaultFilterStatus = async type => {
    await axios
      .post(
        "https://vishwainfoways.com/shopify-api/enabled-filters.php",
        {
          data: {
            shop_id: 2,
            name: type,
            action: "POST",
            enabled: this.state.allDefaultFilterEnabled === true ? 1 : 0
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
      .then(console.log("update"))
  };
  fnUpdateDefaultFilterStatus = type => {
    this.updateDefaultFilterStatus(type);
  };
  OnAllDefaultSwitchValueChange = e => {
    this.setState({ allDefaultFilterEnabled: e.target.checked }, function () {
      this.fnUpdateDefaultFilterStatus("default");
    });
  };

  returnClassEnabled = () => {
    if (this.state.allDefaultFilterEnabled) {
      return "table-responsive";
    }
    return "table-responsive disabledDivContent";
  };

  render() {
    return (
      <div className="product_labels_page animated fadeIn">
        <Card>
          <CardHeader>
            <Row className="d-flex align-items-center">
              <Col md={11} />
              <Col md={1}>
                <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                  ref={this.defaultFilterSwitchRef}
                  key="allDefaultFilterEnabled"
                  checked={this.state.allDefaultFilterEnabled}
                  name="allDefaultFilterEnabled"
                  onChange={e => this.OnAllDefaultSwitchValueChange(e)}
                />
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <div className={this.returnClassEnabled()}>
                <table className="table filter_tabel">
                  <thead>
                    <tr>
                      <th>Default Variants Filter</th>
                      <th>Enable/Disable</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.DefaultFilterData && this.state.DefaultFilterData.length !== 0 &&
                      this.state.DefaultFilterData.map((item, index) => {
                        let include =
                          item.name === "tags"
                            ? this.state.taglist
                            : item.name === "collections"
                              ? this.state.handlelist
                              : item.name === "vendor"
                                ? this.state.vendorlist
                                : item.name === "product_type"
                                  ? this.state.productTypelist
                                  : "";
                        let Includevalue =
                          item.name === "collections"
                            ? this.state.CIOption
                            : item.name === "tags"
                              ? this.state.TIOption
                              : item.name === "vendor"
                                ? this.state.VIOption
                                : item.name === "product_type"
                                  ? this.state.PIOption
                                  : "";
                        let Excludevalue =
                          item.name === "collections"
                            ? this.state.CEOption
                            : item.name === "tags"
                              ? this.state.TEOption
                              : item.name === "vendor"
                                ? this.state.VEOption
                                : item.name === "product_type"
                                  ? this.state.PEOption
                                  : "";
                        return this.state.isInEditMode[index] ? (
                          <tr key={`${index}-e`}>
                            <td key={`td1-${index}`} className="In_Ex_detail">
                              <Input type="text" id="text-input" name="text-input" placeholder="Default Variant Name"
                                defaultValue={
                                  item.label || this.state.isDefaultlabelvalue
                                }
                                onChange={this.onDefaultLabelValue} />
                              <FormText color="muted" style={{ marginBottom: '10px' }}>This is Default Variant Name</FormText>

                              <b style={{ marginBottom: '5px' }}>Inclued Collection item :</b>
                              <br />
                              <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                                key={`Switch1-${index}`}
                                checked={this.state.IsIncludeSwitchvalue[index]}
                                onChange={e =>
                                  this.IncludeSwitchvalueChange(e, item, index)
                                }
                              />
                              <div className={this.returnClassVisibel()} style={{ marginBottom: '10px' }}>
                                <Select key={index}
                                  Value={Includevalue}
                                  defaultValue={Includevalue}
                                  onChange={this.OnSelectOptionListing}
                                  isMulti
                                  isSearchable
                                  options={include}
                                />
                              </div>

                              <b style={{ marginBottom: '5px' }}>Exclued Collection item :</b>
                              <br />
                              <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                                key={`Switch2-${index}`}
                                checked={this.state.IsExcludeSwitchvalue[index]}
                                onChange={e =>
                                  this.ExcludeSwitchvalueChange(e, item, index)
                                }
                              />
                              <div className={this.returnClassInVisibel()}>
                                <Select key={`Switch3-${index}`}
                                  Value={Excludevalue}
                                  defaultValue={Excludevalue}
                                  onChange={this.OnExcluedSelectOptionListing}
                                  isMulti
                                  isSearchable
                                  options={include}
                                />
                              </div>
                            </td>

                            <td key={`td2-${index}`}>
                              <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                                key={`Switch4-${index}`}
                                checked={item.enabled == 1 ? true : false}
                                onChange={e =>
                                  this.OnDefaultSwitchvalueChange(index, item)
                                }
                              />
                            </td>
                            <td key={`td3-${index}`}>
                              <Button
                                className="edit_delete_btn" color="success"
                                onClick={() => this.onUpdateSave(index, item)}
                              >
                                <i className="fa fa-check fa-lg"></i>
                              </Button>
                              &nbsp;&nbsp;
                                <Button
                                className="edit_delete_btn" color="danger"
                                onClick={() => this.onEditchange(index)}
                              >
                                <i className="fa fa-close fa-lg"></i>
                              </Button>
                            </td>
                          </tr>
                        ) : (
                            <tr key={`${index}-tr`}>
                              <td key={`td21-${index}`}>{item.label}</td>
                              <td key={`td22-${index}`}>
                                <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                                  disabled={true}
                                  key={`Switch21-${index}`}
                                  checked={item.enabled == 1 ? true : false}
                                />
                              </td>
                              <td key={`td23-${index}`}>
                                <Button
                                  className="edit_delete_btn block" color="primary" outline
                                  onClick={() => this.onEditchange(index)}
                                >
                                  <i className="cui-pencil icons font-2xl d-block"></i>
                                </Button>
                              </td>
                            </tr>
                          );
                      })}
                  </tbody>
                </table>
              </div>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Defaultfilter;
