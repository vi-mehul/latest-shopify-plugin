import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Label,
  Input,
  Button
} from "reactstrap";
import { ChromePicker } from "react-color";
import "react-switchery-component/react-switchery-component.css";
import ToolTip from "react-portal-tooltip";
import Image2 from "./image/filter_background.png";
import Image3 from "./image/filter_font_size.png";
import Image4 from "./image/Price_setting.png";
import Image5 from "./image/Title_setting.png";
import Image6 from "./image/Description_setting.png";
import Image7 from "./image/option_title_color.png";
import Image8 from "./image/product-button.png";
import axios from "axios";
import { AppSwitch } from '@coreui/react';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.onFilterHeadingColorClick = this.onFilterHeadingColorClick.bind(this);
    this.onFilterHeadingColorClose = this.onFilterHeadingColorClose.bind(this);
    this.onFilterHeadingColorClickComplete = this.onFilterHeadingColorClickComplete.bind(this);
    this.onFilterHeadingBackgroundColorClick = this.onFilterHeadingBackgroundColorClick.bind(this);
    this.onFilterHeadingBackgroundColorClose = this.onFilterHeadingBackgroundColorClose.bind(this);
    this.onFilterHeadingBackgroundColorClickComplete = this.onFilterHeadingBackgroundColorClickComplete.bind(this);
    this.onTitleColorClick = this.onTitleColorClick.bind(this);
    this.onTitleColorClose = this.onTitleColorClose.bind(this);
    this.onTitleColorClickComplete = this.onTitleColorClickComplete.bind(this);
    this.OnFilterHeadingFontChange = this.OnFilterHeadingFontChange.bind(this);
    this.OnTitleFontChange = this.OnTitleFontChange.bind(this);
    this.OnHeadingFontFamilychange = this.OnHeadingFontFamilychange.bind(this);
    this.OnTitleFontFamilychange = this.OnTitleFontFamilychange.bind(this);
    this.FontSizeOption = this.FontSizeOption.bind(this);
    this.onFilterHeadingFontSizeChange = this.onFilterHeadingFontSizeChange.bind(this);
    this.onFilterTitleFontSizeChange = this.onFilterTitleFontSizeChange.bind(this);
    this.onPriceColorClick = this.onPriceColorClick.bind(this);
    this.onPriceColorClose = this.onPriceColorClose.bind(this);
    this.onPriceColorClickComplete = this.onPriceColorClickComplete.bind(this);
    this.OnPriceFontChange = this.OnPriceFontChange.bind(this);
    this.OnPriceFontFamilychange = this.OnPriceFontFamilychange.bind(this);
    this.onPriceFontSizeChange = this.onPriceFontSizeChange.bind(this);
    this.onDescriptionColorClick = this.onDescriptionColorClick.bind(this);
    this.onDescriptionColorClose = this.onDescriptionColorClose.bind(this);
    this.onDescriptionColorClickComplete = this.onDescriptionColorClickComplete.bind(this);
    this.OnDescriptionFontChange = this.OnDescriptionFontChange.bind(this);
    this.OnDescriptionFontFamilychange = this.OnDescriptionFontFamilychange.bind(this);
    this.onDescriptionFontSizeChange = this.onDescriptionFontSizeChange.bind(this);
    this.onOptionTitleColorClick = this.onOptionTitleColorClick.bind(this);
    this.onOptionTitleColorClose = this.onOptionTitleColorClose.bind(this);
    this.onOptionTitleColorClickComplete = this.onOptionTitleColorClickComplete.bind(this);
    this.OnFilterOptionFontChange = this.OnFilterOptionFontChange.bind(this);
    this.OnFilterOptionFontFamilychange = this.OnFilterOptionFontFamilychange.bind(this);
    this.onFilterOptionFontSizeChange = this.onFilterOptionFontSizeChange.bind(this);
    this.OnSortByProductTitleAscendingChange = this.OnSortByProductTitleAscendingChange.bind(this);
    this.OnSortByProductTitleDescendingChange = this.OnSortByProductTitleDescendingChange.bind(this);
    this.onFilterOptionBackgroundColorClickComplete = this.onFilterOptionBackgroundColorClickComplete.bind(this);
    this.onFilterOptionBackgroundColorClose = this.onFilterOptionBackgroundColorClose.bind(this);
    this.onFilterOptionBackgroundColorClick = this.onFilterOptionBackgroundColorClick.bind(this);
    this.onFilterHeadingFontWeightChange = this.onFilterHeadingFontWeightChange.bind(this);
    this.onFilterOptionFontWeightChange = this.onFilterOptionFontWeightChange.bind(this);
    this.onFilterTitleFontWeightChange = this.onFilterTitleFontWeightChange.bind(this);
    this.onPriceFontWeightChange = this.onPriceFontWeightChange.bind(this);
    this.onDescriptionFontWeightChange = this.onDescriptionFontWeightChange.bind(this);
    this.onTitleHoverColorClick = this.onTitleHoverColorClick.bind(this);
    this.onTitleHoverColorClose = this.onTitleHoverColorClose.bind(this);
    this.onTitleHoverColorClickComplete = this.onTitleHoverColorClickComplete.bind(this);
  }
  swatch = {
    padding: "2px",
    display: "inline-block",
    position: "absolute",
    top: "0px",
    border: "1px solid #dee2e6"
  };
  popover = {
    position: "absolute",
    zIndex: "10000"
  };
  state = {
    SaveAllSettings: [],
    FilterHeadingColor: "#ff0000",
    displayFilterHeadingColor: false,
    isFilterHeadingFontChecked: false,
    FilterHeadingBackgroundColor: "#ccc",
    displayFilterHeadingBackgroundColor: false,
    TitleColor: "#ccc",
    displayTitleColor: false,
    isTitleFontChecked: false,
    isHeadingFontFamilyValue: "",
    isTitleFontFamilyValue: "",
    isFilterHeadingFontSize: "10px",
    isFilterTitleFontSize: "10px",
    isPriceFontChecked: false,
    isPriceFontFamilyValue: "",
    isPriceFontSize: "10px",
    isPriceColor: "#333",
    displayPriceColor: false,
    isDescriptionFontChecked: false,
    isDescriptionFontFamilyValue: "",
    isDescriptionFontSize: "10px",
    isDescriptionColor: "#333",
    displayDescriptionColor: false,
    OptionTitleColor: "#000",
    displayOptionTitleColor: false,
    isFilterOptionFontChecked: false,
    isFilterOptionFontFamilyValue: "",
    isFilterOptionFontSize: "10px",
    isSortByProductTitleAscendingvalue: "",
    isSortByProductTitleDescendingvalue: "",
    isColorTooltipActive: false,
    isTooltipActive: false,
    isTooltipBackgroundColorActive: false,
    isTooltipFilterOptionActive: false,
    isTitleColorTooltipActive: false,
    isPriceColorTooltipActive: false,
    isDescriptionColorTooltipActive: false,
    isProductButtonTooltipActive: false,
    FilterOptionBackgroundColor: "#ffffff",
    displayFilterOptionBackgroundColor: false,
    isFilterHeadingFontWeight: "700",
    isFilterOptionFontWeight: "400",
    isFilterTitleFontWeight: "700",
    isPriceFontWeight: "400",
    isDescriptionFontWeight: "400",
    TitleHoverColor: "#0385c5",
    displayTitleHoverColor: false,
    ProductBtnTextColor: "#ffffff",
    displayProductBtnTextColor: false,
    ProductBtnTextHoverColor: "#000000",
    displayProductBtnTextHoverColor: false,
    isProductBtnTextFontChecked: false,
    isProductBtnTextFontFamilyValue: "",
    isProductBtnFontSize: "13px",
    isProductBtnFontWeight: "700",
    ProductBtnBackgroundColor: "#000000",
    displayProductBtnBackgroundColor: false,
    ProductBtnBackgroundHoverColor: "#ffffff",
    displayProductBtnBackgroundHoverColor: false,
    savebtnmsg: '',
  };
  

  onProductBtnBackgroundHoverColorClick = () => {
    this.setState({ displayProductBtnBackgroundHoverColor: true });
  };
  onProductBtnBackgroundrHoverColorClose = () => {
    this.setState({ displayProductBtnBackgroundHoverColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onProductBtnBackgroundColorHoverClickComplete = color => {
    this.setState({ ProductBtnBackgroundHoverColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onProductBtnBackgroundColorClick = () => {
    this.setState({ displayProductBtnBackgroundColor: true });
  };
  onProductBtnBackgroundrColorClose = () => {
    this.setState({ displayProductBtnBackgroundColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onProductBtnBackgroundColorClickComplete = color => {
    this.setState({ ProductBtnBackgroundColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onProductBtnTextHoverColorClick = () => {
    this.setState({ displayProductBtnTextHoverColor: true });
  };
  onProductBtnTextHoverColorClose = () => {
    this.setState({ displayProductBtnTextHoverColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onProductBtnTextHoverColorClickComplete = color => {
    this.setState({ ProductBtnTextHoverColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onProductBtnTextColorClick = () => {
    this.setState({ displayProductBtnTextColor: true });
  };
  onProductBtnTextColorClose = () => {
    this.setState({ displayProductBtnTextColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onProductBtnTextColorClickComplete = color => {
    this.setState({ ProductBtnTextColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onTitleHoverColorClick = () => {
    this.setState({ displayTitleHoverColor: true });
  };
  onTitleHoverColorClose = () => {
    this.setState({ displayTitleHoverColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onTitleHoverColorClickComplete = color => {
    this.setState({ TitleHoverColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterHeadingColorClick = () => {
  this.setState({ displayFilterHeadingColor: true });
  };
  onFilterHeadingColorClose = () => {
    this.setState({ displayFilterHeadingColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterHeadingColorClickComplete = color => {
    this.setState({ FilterHeadingColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterOptionBackgroundColorClick = () => {
    this.setState({ displayFilterOptionBackgroundColor: true });
  };
  onFilterOptionBackgroundColorClose = () => {
    this.setState({ displayFilterOptionBackgroundColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterOptionBackgroundColorClickComplete = color => {
    this.setState({ FilterOptionBackgroundColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterHeadingBackgroundColorClick = () => {
    this.setState({ displayFilterHeadingBackgroundColor: true });
  };
  onFilterHeadingBackgroundColorClose = () => {
    this.setState({ displayFilterHeadingBackgroundColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterHeadingBackgroundColorClickComplete = color => {
    this.setState({ FilterHeadingBackgroundColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onTitleColorClick = () => {
    this.setState({ displayTitleColor: true });
  };
  onTitleColorClose = () => {
    this.setState({ displayTitleColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onTitleColorClickComplete = color => {
    this.setState({ TitleColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onOptionTitleColorClick = () => {
    this.setState({ displayOptionTitleColor: true });
  };
  onOptionTitleColorClose = () => {
    this.setState({ displayOptionTitleColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onOptionTitleColorClickComplete = color => {
    this.setState({ OptionTitleColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onPriceColorClick = () => {
    this.setState({ displayPriceColor: true });
  };
  onPriceColorClose = () => {
    this.setState({ displayPriceColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onPriceColorClickComplete = color => {
    this.setState({ isPriceColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };
  onDescriptionColorClick = () => {
    this.setState({ displayDescriptionColor: true });
  };
  onDescriptionColorClose = () => {
    this.setState({ displayDescriptionColor: false });
  this.setState({ savebtnmsg: 'Save'});
  };
  onDescriptionColorClickComplete = color => {
    this.setState({ isDescriptionColor: color.hex });
  this.setState({ savebtnmsg: 'Save'});
  };

  OnFilterHeadingFontChange = e => {
    this.setState({ isFilterHeadingFontChecked: e.target.checked });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnTitleFontChange = e => {
    this.setState({ isTitleFontChecked: e.target.checked });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnHeadingFontFamilychange = e => {
    this.setState({ isHeadingFontFamilyValue: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnTitleFontFamilychange = e => {
    this.setState({ isTitleFontFamilyValue: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterHeadingFontSizeChange = e => {
    this.setState({ isFilterHeadingFontSize: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterTitleFontSizeChange = e => {
    this.setState({ isFilterTitleFontSize: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnPriceFontChange = e => {
    this.setState({ isPriceFontChecked: e.target.checked });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnPriceFontFamilychange = e => {
    this.setState({ isPriceFontFamilyValue: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onPriceFontSizeChange = e => {
    this.setState({ isPriceFontSize: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnDescriptionFontChange = e => {
    this.setState({ isDescriptionFontChecked: e.target.checked });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnDescriptionFontFamilychange = e => {
    this.setState({ isDescriptionFontFamilyValue: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onDescriptionFontSizeChange = e => {
    this.setState({ isDescriptionFontSize: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnFilterOptionFontChange = e => {
    this.setState({ isFilterOptionFontChecked: e.target.checked });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnFilterOptionFontFamilychange = e => {
    this.setState({ isFilterOptionFontFamilyValue: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterOptionFontSizeChange = e => {
    this.setState({ isFilterOptionFontSize: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnSortByProductTitleAscendingChange = e => {
    this.setState({ isSortByProductTitleAscendingvalue: e.target.value });
    this.setState({ savebtnmsg: 'Save'});
  }
  OnSortByProductTitleDescendingChange = e => {
    this.setState({ isSortByProductTitleDescendingvalue: e.target.value });
    this.setState({ savebtnmsg: 'Save'});
  }
  onFilterHeadingFontWeightChange = e => {
    this.setState({ isFilterHeadingFontWeight: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterOptionFontWeightChange = e => {
    this.setState({ isFilterOptionFontWeight: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onFilterTitleFontWeightChange = e => {
    this.setState({ isFilterTitleFontWeight: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onPriceFontWeightChange = e => {
    this.setState({ isPriceFontWeight: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onDescriptionFontWeightChange = e => {
    this.setState({ isDescriptionFontWeight: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onProductBtnFontWeightChange = e => {
    this.setState({ isProductBtnFontWeight: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnProductBtnTextFontChange = e => {
    this.setState({ isProductBtnTextFontChecked: e.target.checked });
  this.setState({ savebtnmsg: 'Save'});
  };
  OnProductBtnTextFontFamilychange = e => {
    this.setState({ isProductBtnTextFontFamilyValue: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };
  onProductBtnFontSizeChange = e => {
    this.setState({ isProductBtnFontSize: e.target.value });
  this.setState({ savebtnmsg: 'Save'});
  };

  showTooltipColor() {
    this.setState({ isColorTooltipActive: true });
  }
  hideTooltipColor() {
    this.setState({ isColorTooltipActive: false });
  }
  showTooltip() {
    this.setState({ isTooltipActive: true });
  }
  hideTooltip() {
    this.setState({ isTooltipActive: false });
  }
  showTooltipBackgroundColor() {
    this.setState({ isTooltipBackgroundColorActive: true });
  }
  hideTooltipBackgroundColor() {
    this.setState({ isTooltipBackgroundColorActive: false });
  }
  showTooltipFilterOption() {
    this.setState({ isTooltipFilterOptionActive: true });
  }
  hideTooltipFilterOption() {
    this.setState({ isTooltipFilterOptionActive: false });
  }
  showTooltipTitleColor() {
    this.setState({ isTitleColorTooltipActive: true });
  }
  hideTooltipTitleColor() {
    this.setState({ isTitleColorTooltipActive: false });
  }
  showTooltipPriceColor() {
    this.setState({ isPriceColorTooltipActive: true });
  }
  hideTooltipPriceColor() {
    this.setState({ isPriceColorTooltipActive: false });
  }
  showTooltipDescriptionColor() {
    this.setState({ isDescriptionColorTooltipActive: true });
  }
  hideTooltipDescriptionColor() {
    this.setState({ isDescriptionColorTooltipActive: false });
  }
  showTooltipProductButtonColor() {
    this.setState({ isProductButtonTooltipActive: true });
  }
  hideTooltipProductButtonColor() {
    this.setState({ isProductButtonTooltipActive: false });
  }

  saveAllChanges = async () => {
    this.setState({ savebtnmsg: 'Saving'});
    const SaveAllSettings = {
      FilterHeadingColor: this.state.FilterHeadingColor,
      isFilterHeadingFontChecked: this.state.isFilterHeadingFontChecked,
      FilterHeadingBackgroundColor: this.state.FilterHeadingBackgroundColor,
      TitleColor: this.state.TitleColor,
      isTitleFontChecked: this.state.isTitleFontChecked,
      isHeadingFontFamilyValue: this.state.isHeadingFontFamilyValue,
      isTitleFontFamilyValue: this.state.isTitleFontFamilyValue,
      isFilterHeadingFontSize: this.state.isFilterHeadingFontSize,
      isFilterTitleFontSize: this.state.isFilterTitleFontSize,
      FilterOptionBackgroundColor: this.state.FilterOptionBackgroundColor,
      isPriceColor: this.state.isPriceColor,
      isPriceFontChecked: this.state.isPriceFontChecked,
      isPriceFontFamilyValue: this.state.isPriceFontFamilyValue,
      isPriceFontSize: this.state.isPriceFontSize,
      isDescriptionColor: this.state.isDescriptionColor,
      isDescriptionFontChecked: this.state.isDescriptionFontChecked,
      isDescriptionFontFamilyValue: this.state.isDescriptionFontFamilyValue,
      isDescriptionFontSize: this.state.isDescriptionFontSize,
      OptionTitleColor: this.state.OptionTitleColor,
      isFilterOptionFontChecked: this.state.isFilterOptionFontChecked,
      isFilterOptionFontFamilyValue: this.state.isFilterOptionFontFamilyValue,
      isFilterOptionFontSize: this.state.isFilterOptionFontSize,
      isSortByProductTitleAscendingvalue: this.state.isSortByProductTitleAscendingvalue,
      isSortByProductTitleDescendingvalue: this.state.isSortByProductTitleDescendingvalue,
      isFilterHeadingFontWeight: this.state.isFilterHeadingFontWeight,
      isFilterOptionFontWeight: this.state.isFilterOptionFontWeight,
      isFilterTitleFontWeight: this.state.isFilterTitleFontWeight,
      isPriceFontWeight: this.state.isPriceFontWeight,
      isDescriptionFontWeight: this.state.isDescriptionFontWeight,
      TitleHoverColor: this.state.TitleHoverColor,
      ProductBtnTextColor: this.state.ProductBtnTextColor,
      ProductBtnTextHoverColor: this.state.ProductBtnTextHoverColor,
      isProductBtnTextFontChecked: this.state.isProductBtnTextFontChecked,
      isProductBtnTextFontFamilyValue: this.state.isProductBtnTextFontFamilyValue,
      isProductBtnFontSize: this.state.isProductBtnFontSize,
      isProductBtnFontWeight: this.state.isProductBtnFontWeight,
      ProductBtnBackgroundColor: this.state.ProductBtnBackgroundColor,
      ProductBtnBackgroundHoverColor: this.state.ProductBtnBackgroundHoverColor
    };
    this.setState({ SaveAllSettings: SaveAllSettings });
    console.log("SaveAllSettings", SaveAllSettings);
    await axios.post('https://vishwainfoways.com/shopify-api/shopify-admin-api.php',
      { "data": { "data": SaveAllSettings, "shop_id": 1 } }, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
        'Accept': 'text/html',
        'Content-Type': 'application/json',
      }).then(res => res.data && this.setState({ savebtnmsg: 'Saved'}));    
  };

  componentDidMount = async () => {
    await axios
      .get(
        "https://vishwainfoways.com/shopify-api/shopify-admin-api.php",
        {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
          Accept: "text/html",
          "Content-Type": "application/json"
        }).then(res => {
          let filters_data = res.data.shop_setting_details[0];
          this.setState({ FilterHeadingColor: filters_data.filter_heading_color });
          this.setState({ isFilterHeadingFontChecked: filters_data.filter_heading_fontchecked });
          this.setState({ FilterHeadingBackgroundColor: filters_data.filter_backgroundcolor });
          this.setState({ TitleColor: filters_data.product_titlecolor });
          this.setState({ isTitleFontChecked: filters_data.product_title_fontchecked });
          this.setState({ isHeadingFontFamilyValue: filters_data.filter_heading_fontfamily });
          this.setState({ isTitleFontFamilyValue: filters_data.product_title_fontfamily });
          this.setState({ isFilterHeadingFontSize: filters_data.filter_heading_fontsize });
          this.setState({ isFilterTitleFontSize: filters_data.product_title_fontsize });
          this.setState({ isPriceColor: filters_data.product_pricecolor });
          this.setState({ isPriceFontChecked: filters_data.product_price_fontchecked });
          this.setState({ isPriceFontFamilyValue: filters_data.product_price_fontfamily });
          this.setState({ isPriceFontSize: filters_data.product_price_fontsize });
          this.setState({ isDescriptionColor: filters_data.product_descriptionColor });
          this.setState({ isDescriptionFontChecked: filters_data.product_description_fontchecked });
          this.setState({ isDescriptionFontFamilyValue: filters_data.product_description_fontfamily });
          this.setState({ isDescriptionFontSize: filters_data.product_description_fontsize });
          this.setState({ OptionTitleColor: filters_data.filter_option_titlecolor });
          this.setState({ isFilterOptionFontChecked: filters_data.filter_option_fontchecked });
          this.setState({ isFilterOptionFontFamilyValue: filters_data.filter_option_fontfamily });
          this.setState({ isFilterOptionFontSize: filters_data.filter_option_fontsize });
          this.setState({ isSortByProductTitleAscendingvalue: filters_data.sortby_product_title_ascending });
          this.setState({ isSortByProductTitleDescendingvalue: filters_data.sortby_product_title_descending });
          this.setState({ FilterOptionBackgroundColor: filters_data.filter_option_backgroundcolor });
          this.setState({ isFilterHeadingFontWeight: filters_data.filter_heading_fontweight });
          this.setState({ isFilterOptionFontWeight: filters_data.filter_option_fontweight });
          this.setState({ isFilterTitleFontWeight: filters_data.product_title_fontweight });
          this.setState({ isPriceFontWeight: filters_data.product_price_fontweight });
          this.setState({ isDescriptionFontWeight: filters_data.product_description_fontweight });
          this.setState({ TitleHoverColor: filters_data.product_titlehovercolor });
          this.setState({ ProductBtnTextColor: filters_data.product_btn_textcolor });
          this.setState({ ProductBtnTextHoverColor: filters_data.product_btn_text_hovercolor });
          this.setState({ isProductBtnTextFontChecked: filters_data.product_btn_text_fontchecked });
          this.setState({ isProductBtnTextFontFamilyValue: filters_data.product_btn_text_fontfamilyvalue });
          this.setState({ isProductBtnFontSize: filters_data.product_btn_fontsize });
          this.setState({ isProductBtnFontWeight: filters_data.product_btn_fontweight });
          this.setState({ ProductBtnBackgroundColor: filters_data.product_btn_backgroundcolor });
          this.setState({ ProductBtnBackgroundHoverColor: filters_data.product_btn_backgroundhovercolor });
        });
  };
  FontSizeOption() {
    var arr = [];
    for (let i = 1; i <= 50; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}px
        </option>
      );
    }
    return arr;
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader style={{height: '65px'}} className="d-flex align-items-center">
                <Col md={10} />
                <Col md={2}>
                {this.state.savebtnmsg !== '' &&
                <Button className={this.state.savebtnmsg === 'Save' ? "btn btn-success" :
                  this.state.savebtnmsg === 'Saving' ? "btn btn-warning" : "btn btn-disabled"}
                  onClick={() => this.state.savebtnmsg === 'Save' && this.saveAllChanges()}>{this.state.savebtnmsg}</Button>
              }
                </Col>
              </CardHeader>
              <CardBody>
                {/* ------------- Filter Headers Start -------------------- */}
                <div
                  className="option_heading"
                  style={{ backgroundColor: "#f0f3f5", padding: "15px" }}
                >
                  <h5>Filter Headers</h5>
                </div>
                <Row className="border_bottom">
                  <Col md={6} className="tab_content_title">
                    Color{" "}
                    <i
                      className="fa fa-question-circle fa-lg mt-4"
                      id="Filter_title_color"
                      onMouseEnter={this.showTooltipColor.bind(this)}
                      onMouseLeave={this.hideTooltipColor.bind(this)}
                    />
                    <ToolTip
                      active={this.state.isColorTooltipActive}
                      position="right"
                      arrow="center"
                      parent="#Filter_title_color"
                    >
                      <div>
                        <img src={Image3} />
                      </div>
                    </ToolTip>
                  </Col>
                  <Col md={6}>
                    <div style={this.swatch}>
                      <div
                        contentEditable
                        className="colorPickerBorder"
                        onClick={this.onFilterHeadingColorClick}
                        onBlur={this.onFilterHeadingColorClose}
                        style={{
                          width: "100px",
                          cursor: "pointer",
                          height: "20px",
                          backgroundColor: this.state.FilterHeadingColor
                        }}
                      />
                    </div>
                    {this.state.displayFilterHeadingColor ? (
                      <div style={this.popover}>
                        <ChromePicker
                          color={this.state.FilterHeadingColor}
                          onChange={this.onFilterHeadingColorClickComplete}
                        />
                      </div>
                    ) : null}
                  </Col>
                </Row>

                <Row className="border_bottom">
                  <Col md="6" tab_content_title>
                    <Label htmlFor="Font Family"> Font Family</Label>
                  </Col>
                  <Col md="6">
                    <Row>
                      <Col md="4">
                        <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'} 
                        checked={this.state.isFilterHeadingFontChecked == 1 ? true : false}  
                        onChange={e => this.OnFilterHeadingFontChange(e)} />                       
                      </Col>
                      <Col md="8">
                          <div
                            style={{
                              display:
                                this.state.isFilterHeadingFontChecked == false
                                  ? "none"
                                  : "block"
                            }}
                          >
                            <Input type="select" id="select"
                              className="font_family_box"
                              value={this.state.isHeadingFontFamilyValue}
                              onChange={this.OnHeadingFontFamilychange}
                            >
                              <option value="0" disabled>Select Font Family</option>
                              <option value="Algerian">Algerian</option>
                              <option value="Garamond">Garamond</option>
                              <option value="Latha">Latha</option>
                              <option value="Constantia">Constantia</option>
                            </Input>

                          </div>
                        </Col>
                    </Row>
                  </Col>
                </Row>

                  <Row className="border_bottom">

                    <Col md={6} className="tab_content_title">
                      Font Size{" "}
                      <i
                        className="fa fa-question-circle fa-lg mt-4"
                        id="hoverMe"
                        onMouseEnter={this.showTooltip.bind(this)}
                        onMouseLeave={this.hideTooltip.bind(this)}
                      />
                      <ToolTip
                        active={this.state.isTooltipActive}
                        position="right"
                        arrow="center"
                        parent="#hoverMe"
                      >
                        <div>
                          <img src={Image3} />
                        </div>
                      </ToolTip>
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isFilterHeadingFontSize}
                        onChange={this.onFilterHeadingFontSizeChange}
                      >
                        <option value="0" disabled>Select Font Size</option>
                        {this.FontSizeOption()}
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col className="tab_content_title">
                      Font Weight{" "}
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isFilterHeadingFontWeight}
                        onChange={this.onFilterHeadingFontWeightChange}
                      >
                        <option value="0" disabled>Select Font Weight</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">

                    <Col md={6} className="tab_content_title">
                      Filter Background Color{" "}
                      <i
                        className="fa fa-question-circle fa-lg mt-4"
                        id="BackgroundColor"
                        onMouseEnter={this.showTooltipBackgroundColor.bind(this)}
                        onMouseLeave={this.hideTooltipBackgroundColor.bind(this)}
                      />
                      <ToolTip
                        active={this.state.isTooltipBackgroundColorActive}
                        position="right"
                        arrow="center"
                        parent="#BackgroundColor"
                      >
                        <div>
                          <img src={Image2} />
                        </div>
                      </ToolTip>
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onFilterHeadingBackgroundColorClick}
                          onBlur={this.onFilterHeadingBackgroundColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state
                              .FilterHeadingBackgroundColor
                          }}
                        />
                      </div>
                      {this.state.displayFilterHeadingBackgroundColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.FilterHeadingBackgroundColor}
                            onChange={
                              this.onFilterHeadingBackgroundColorClickComplete
                            }
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                  {/* ----------------- Filter Headers End -------------------------- */}

                  {/* ----------------- Filter Options Setting Start -------------------------- */}
                  <div
                    className="option_heading"
                    style={{ backgroundColor: "#f0f3f5", padding: "15px" }}
                  >
                    <h5>Filter Options Setting </h5>
                  </div>
                  <Row className="border_bottom">
                    <Col className="tab_content_title">
                      Option Title Color{" "}
                      <i
                        className="fa fa-question-circle fa-lg mt-4"
                        id="FilterOption"
                        onMouseEnter={this.showTooltipFilterOption.bind(this)}
                        onMouseLeave={this.hideTooltipFilterOption.bind(this)}
                      />
                      <ToolTip
                        active={this.state.isTooltipFilterOptionActive}
                        position="right"
                        arrow="center"
                        parent="#FilterOption"
                      >
                        <div>
                          <img src={Image7} />
                        </div>
                      </ToolTip>
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onOptionTitleColorClick}
                          onBlur={this.onOptionTitleColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state.OptionTitleColor
                          }}
                        />
                      </div>
                      {this.state.displayOptionTitleColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.OptionTitleColor}
                            onChange={this.onOptionTitleColorClickComplete}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col className="tab_content_title">
                      Option Font Family
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={4}>
                        <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'} 
                            checked={this.state.isFilterOptionFontChecked == 1 ? true : false}
                            onChange={e => this.OnFilterOptionFontChange(e)}
                          />
                        </Col>
                        <Col md={8}>
                          <div
                            style={{
                              display:
                                this.state.isFilterOptionFontChecked == false
                                  ? "none"
                                  : "block"
                            }}
                          >
                            <Input type="select" id="select"
                              className="font_family_box"
                              value={this.state.isFilterOptionFontFamilyValue}
                              onChange={this.OnFilterOptionFontFamilychange}
                            >
                              <option value="0" disabled>Select Font Family</option>
                              <option value="Algerian">Algerian</option>
                              <option value="Garamond">Garamond</option>
                              <option value="Latha">Latha</option>
                              <option value="Constantia">Constantia</option>
                            </Input>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Option Font Size{" "}
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isFilterOptionFontSize}
                        onChange={this.onFilterOptionFontSizeChange}
                      >
                        <option value="0" disabled>Select Font Size</option>
                        {this.FontSizeOption()}
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Option Font Weight{" "}
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isFilterOptionFontWeight}
                        onChange={this.onFilterOptionFontWeightChange}
                      >
                        <option value="0" disabled>Select Font Weight</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Option Background Color{" "}
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onFilterOptionBackgroundColorClick}
                          onBlur={this.onFilterOptionBackgroundColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state.FilterOptionBackgroundColor
                          }}
                        />
                      </div>
                      {this.state.displayFilterOptionBackgroundColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.FilterOptionBackgroundColor}
                            onChange={
                              this.onFilterOptionBackgroundColorClickComplete
                            }
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                  {/* ----------------------- Filter Options Setting End -------------------------- */}

                  {/* ----------------------- Product Ordering Setting Start ------------------------ */}
                  <div
                    className="option_heading"
                    style={{ backgroundColor: "#f0f3f5", padding: "15px" }}
                  >
                    <h5>Product Ordering Setting </h5>
                  </div>
                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title" htmlFor="basic-example" >
                      Sort By Product Title Ascending{" "}
                    </Col>
                    <Col md={6}>
                      <Input
                        type="text"
                        className="form-control"
                        value={this.state.isSortByProductTitleAscendingvalue}
                        onChange={e => this.OnSortByProductTitleAscendingChange(e)}
                      />
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6}
                      className="tab_content_title"
                      htmlFor="basic-example"
                    >
                      Sort By Product Title Descending{" "}
                    </Col>
                    <Col md={6}>
                      <Input
                        type="text"
                        className="form-control"
                        value={this.state.isSortByProductTitleDescendingvalue}
                        onChange={e => this.OnSortByProductTitleDescendingChange(e)}
                      />
                    </Col>
                  </Row>

                  {/* ----------------------- Product Ordering Setting End -------------------------- */}

                  {/* ----------------------- Product Setting Option Start ------------------------ */}
                  <div
                    className="option_heading"
                    style={{ backgroundColor: "#f0f3f5", padding: "15px" }}
                  >
                    <h5>Product Option Setting</h5>
                  </div>
                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Title Color{" "}
                      <i
                        className="fa fa-question-circle fa-lg mt-4"
                        id="TitleColor"
                        onMouseEnter={this.showTooltipTitleColor.bind(this)}
                        onMouseLeave={this.hideTooltipTitleColor.bind(this)}
                      />
                      <ToolTip
                        active={this.state.isTitleColorTooltipActive}
                        position="right"
                        arrow="center"
                        parent="#TitleColor"
                      >
                        <div>
                          <img src={Image5} />
                        </div>
                      </ToolTip>
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onTitleColorClick}
                          onBlur={this.onTitleColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state.TitleColor
                          }}
                        />
                      </div>
                      {this.state.displayTitleColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.TitleColor}
                            onChange={this.onTitleColorClickComplete}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Title Hover Color{" "}
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onTitleHoverColorClick}
                          onBlur={this.onTitleHoverColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state.TitleHoverColor
                          }}
                        />
                      </div>
                      {this.state.displayTitleHoverColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.TitleHoverColor}
                            onChange={this.onTitleHoverColorClickComplete}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Title Font Family
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={4}>
                        <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'} 
                            checked={this.state.isTitleFontChecked == 1 ? true : false}
                            onChange={e => this.OnTitleFontChange(e)}
                          />
                        </Col>
                        <Col md={8} >
                          <div
                            style={{
                              display:
                                this.state.isTitleFontChecked == false
                                  ? "none"
                                  : "block"
                            }}
                          >
                            <Input type="select" id="select"
                              className="font_family_box"
                              value={this.state.isTitleFontFamilyValue}
                              onChange={this.OnTitleFontFamilychange}
                            >
                              <option value="0">Select Font Family</option>
                              <option value="Algerian">Algerian</option>
                              <option value="Garamond">Garamond</option>
                              <option value="Latha">Latha</option>
                              <option value="Constantia">Constantia</option>
                            </Input>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Title Font Size{" "}
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isFilterTitleFontSize}
                        onChange={this.onFilterTitleFontSizeChange}
                      >
                        <option value="0" disabled>Select Font Size</option>
                        {this.FontSizeOption()}
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Title Font Weight{" "}
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isFilterTitleFontWeight}
                        onChange={this.onFilterTitleFontWeightChange}
                      >
                        <option value="0" disabled>Select Font Weight</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col className="col-sm-6 tab_content_title">
                      Price Color{" "}
                      <i
                        className="fa fa-question-circle fa-lg mt-4"
                        id="PriceColor"
                        onMouseEnter={this.showTooltipPriceColor.bind(this)}
                        onMouseLeave={this.hideTooltipPriceColor.bind(this)}
                      />
                      <ToolTip
                        active={this.state.isPriceColorTooltipActive}
                        position="right"
                        arrow="center"
                        parent="#PriceColor"
                      >
                        <div>
                          <img src={Image4} />
                        </div>
                      </ToolTip>
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onPriceColorClick}
                          onBlur={this.onPriceColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state.isPriceColor
                          }}
                        />
                      </div>
                      {this.state.displayPriceColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.isPriceColor}
                            onChange={this.onPriceColorClickComplete}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Price Font Family
                  </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={4}>
                        <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'}
                            checked={this.state.isPriceFontChecked == 1 ? true : false}
                            onChange={e => this.OnPriceFontChange(e)}
                          />
                        </Col>
                        <Col md={8}>
                          <div
                            style={{
                              display:
                                this.state.isPriceFontChecked == false
                                  ? "none"
                                  : "block"
                            }}
                          >
                            <Input type="select" id="select"
                              className="font_family_box"
                              value={this.state.isPriceFontFamilyValue}
                              onChange={this.OnPriceFontFamilychange}
                            >
                              <option value="0" disabled>Select Font Family</option>
                              <option value="Algerian">Algerian</option>
                              <option value="Garamond">Garamond</option>
                              <option value="Latha">Latha</option>
                              <option value="Constantia">Constantia</option>
                            </Input>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Price Font Size{" "}
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isPriceFontSize}
                        onChange={this.onPriceFontSizeChange}
                      >
                        <option value="0" disabled>Select Font Size</option>
                        {this.FontSizeOption()}
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Price Font Weight{" "}
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isPriceFontWeight}
                        onChange={this.onPriceFontWeightChange}
                      >
                        <option value="0" disabled>Select Font Weight</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Description Color{" "}
                      <i
                        className="fa fa-question-circle fa-lg mt-4"
                        id="DescriptionColor"
                        onMouseEnter={this.showTooltipDescriptionColor.bind(this)}
                        onMouseLeave={this.hideTooltipDescriptionColor.bind(this)}
                      />
                      <ToolTip
                        active={this.state.isDescriptionColorTooltipActive}
                        position="right"
                        arrow="center"
                        parent="#DescriptionColor"
                      >
                        <div>
                          <img src={Image6} />
                        </div>
                      </ToolTip>
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onDescriptionColorClick}
                          onBlur={this.onDescriptionColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state.isDescriptionColor
                          }}
                        />
                      </div>
                      {this.state.displayDescriptionColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.isDescriptionColor}
                            onChange={this.onDescriptionColorClickComplete}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Description Font Family
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={4}>
                        <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'} 
                            checked={this.state.isDescriptionFontChecked == 1 ? true : false}
                            onChange={e => this.OnDescriptionFontChange(e)}
                          />
                        </Col>
                        <Col md={8}>
                          <div
                            style={{
                              display:
                                this.state.isDescriptionFontChecked == false
                                  ? "none"
                                  : "block"
                            }}
                          >
                            <Input type="select" id="select"
                              className="font_family_box"
                              value={this.state.isDescriptionFontFamilyValue}
                              onChange={this.OnDescriptionFontFamilychange}
                            >
                              <option value="0" disabled>Select Font Family</option>
                              <option value="Algerian">Algerian</option>
                              <option value="Garamond">Garamond</option>
                              <option value="Latha">Latha</option>
                              <option value="Constantia">Constantia</option>
                            </Input>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Description Font Size{" "}
                    </Col>
                    <Col className="col-sm-6">
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isDescriptionFontSize}
                        onChange={this.onDescriptionFontSizeChange}
                      >
                        <option value="0" disabled>Select Font Size</option>
                        {this.FontSizeOption()}
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Description Font Weight{" "}
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isDescriptionFontWeight}
                        onChange={this.onDescriptionFontWeightChange}
                      >
                        <option value="0" disabled>Select Font Weigh</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                      </Input>
                    </Col>
                  </Row>

                  {/* ----------------------- Product Setting Option End ------------------------ */}
                  {/* ----------------------- Quick Viwe Button Setting Option Start ------------------------ */}

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Product Button Background Color{" "}
                      <i
                        className="fa fa-question-circle fa-lg mt-4"
                        id="ProductButton"
                        onMouseEnter={this.showTooltipProductButtonColor.bind(this)}
                        onMouseLeave={this.hideTooltipProductButtonColor.bind(this)}
                      />
                      <ToolTip
                        active={this.state.isProductButtonTooltipActive}
                        position="right"
                        arrow="center"
                        parent="#ProductButton"
                      >
                        <div>
                          <img src={Image8} />
                        </div>
                      </ToolTip>
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onProductBtnBackgroundColorClick}
                          onBlur={this.onProductBtnBackgroundrColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state.ProductBtnBackgroundColor
                          }}
                        />
                      </div>
                      {this.state.displayProductBtnBackgroundColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.ProductBtnBackgroundColor}
                            onChange={this.onProductBtnBackgroundColorClickComplete}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Product Button Background Hover Color{" "}
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onProductBtnBackgroundHoverColorClick}
                          onBlur={this.onProductBtnBackgroundrHoverColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state.ProductBtnBackgroundHoverColor
                          }}
                        />
                      </div>
                      {this.state.displayProductBtnBackgroundHoverColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.ProductBtnBackgroundHoverColor}
                            onChange={this.onProductBtnBackgroundColorHoverClickComplete}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Product Button text Color{" "}
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onProductBtnTextColorClick}
                          onBlur={this.onProductBtnTextColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state.ProductBtnTextColor
                          }}
                        />
                      </div>
                      {this.state.displayProductBtnTextColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.ProductBtnTextColor}
                            onChange={this.onProductBtnTextColorClickComplete}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Product Button text Hover Color{" "}
                    </Col>
                    <Col md={6}>
                      <div style={this.swatch}>
                        <div
                          contentEditable
                          className="colorPickerBorder"
                          onClick={this.onProductBtnTextHoverColorClick}
                          onBlur={this.onProductBtnTextHoverColorClose}
                          style={{
                            width: "100px",
                            cursor: "pointer",
                            height: "20px",
                            backgroundColor: this.state.ProductBtnTextHoverColor
                          }}
                        />
                      </div>
                      {this.state.displayProductBtnTextHoverColor ? (
                        <div style={this.popover}>
                          <ChromePicker
                            color={this.state.ProductBtnTextHoverColor}
                            onChange={this.onProductBtnTextHoverColorClickComplete}
                          />
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Product Button text Font Family
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={4}>
                        <AppSwitch className={'mx-1'} variant={'3d'} checked size={'lg'} color={'success'} 
                            checked={this.state.isProductBtnTextFontChecked == 1 ? true : false}
                            onChange={e => this.OnProductBtnTextFontChange(e)}
                          />
                        </Col>
                        <Col md={8}>
                          <div
                            style={{
                              display:
                                this.state.isProductBtnTextFontChecked == false
                                  ? "none"
                                  : "block"
                            }}
                          >
                            <Input type="select" id="select"
                              className="font_family_box"
                              value={this.state.isProductBtnTextFontFamilyValue}
                              onChange={this.OnProductBtnTextFontFamilychange}
                            >
                              <option value="0" disabled>Select Font Family</option>
                              <option value="Algerian">Algerian</option>
                              <option value="Garamond">Garamond</option>
                              <option value="Latha">Latha</option>
                              <option value="Constantia">Constantia</option>
                            </Input>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Product Button Font Size{" "}
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isProductBtnFontSize}
                        onChange={this.onProductBtnFontSizeChange}
                      >
                        <option value="0" disabled>Select Font Size</option>
                        {this.FontSizeOption()}
                      </Input>
                    </Col>
                  </Row>

                  <Row className="border_bottom">
                    <Col md={6} className="tab_content_title">
                      Product Button Font Weight{" "}
                    </Col>
                    <Col md={6}>
                      <Input type="select" id="select"
                        className="font_size_box"
                        value={this.state.isProductBtnFontWeight}
                        onChange={this.onProductBtnFontWeightChange}
                      >
                        <option value="0" disabled>Select Font Weight</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                      </Input>
                    </Col>
                  </Row>

                  {/* ----------------------- Quick Viwe Button Setting Option End ------------------------ */}
              </CardBody >
            </Card >
          </Col >
        </Row >
      </div >
        );
      }
    }
    
    export default Filters;
