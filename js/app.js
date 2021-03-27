"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      locale: _this.props.locale,
      headlines: []
    };
    console.debug("ctor");
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var resource = "https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json";

      fetch(resource).then(function (response) {
        return response.json();
      }).then(function (json) {
        _this2.setState({
          headlines: json
        });
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }, {
    key: "changeHandler",
    value: function changeHandler(event) {
      var _this3 = this;

      var locale = event.target.value;
      console.debug("change event:", locale);

      var resource = "https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json";

      console.debug("debug state, locale: ", this.state.locale);

      if (event.target.value !== 'en-US') {
        var _locale$split = locale.split('-'),
            _locale$split2 = _slicedToArray(_locale$split, 2),
            languageCode = _locale$split2[0],
            countryCode = _locale$split2[1];

        console.debug("debug countryCode: ", countryCode);
        resource = "https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/" + countryCode.toLowerCase() + "-headlines.json";
      }

      console.log("fetch resource: ", resource);

      fetch(resource).then(function (response) {
        return response.json();
      }).then(function (json) {
        _this3.setState({
          locale: locale,
          headlines: json
        });
      }).catch(function (error) {
        return console.log(error);
      });
    }
  }, {
    key: "render",
    value: function render() {
      console.debug("about to render...");
      var style = { fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic' };

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "nav",
          { className: "navbar navbar-light bg-light mb-3" },
          React.createElement(
            "h3",
            { className: "navbar-text", style: style },
            "BUSINESS HEADLINES"
          ),
          React.createElement(
            "span",
            { className: "navbar-text float-right" },
            React.createElement(Today, { locale: this.state.locale })
          )
        ),
        React.createElement(
          "div",
          { className: "container mb-3" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement("div", { className: "col-md-9" }),
            React.createElement(
              "div",
              { className: "col-md-3" },
              React.createElement(ItemSelector, { id: "countrySelector", onChange: this.changeHandler.bind(this) })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(Headlines, {
            locale: this.state.locale, headlines: this.state.headlines
          })
        )
      );
    }
  }]);

  return App;
}(React.Component);

App.defaultProps = {
  locale: navigator.language
};

var ItemSelector = function ItemSelector(_ref) {
  var id = _ref.id,
      onChange = _ref.onChange;

  return React.createElement(
    "select",
    { id: id, onChange: onChange, className: "form-control" },
    React.createElement(
      "option",
      { value: "en-US" },
      "US"
    ),
    React.createElement(
      "option",
      { value: "en-GB" },
      "Great Britain"
    ),
    React.createElement(
      "option",
      { value: "zh-HK" },
      "Hong Kong"
    ),
    React.createElement(
      "option",
      { value: "ja-JP" },
      "Japan"
    ),
    React.createElement(
      "option",
      { value: "ko-KR" },
      "South Korea"
    ),
    React.createElement(
      "option",
      { value: "he-IL" },
      "Israel"
    )
  );
};

ReactDOM.render(React.createElement(App, { locale: navigator.language }), document.getElementById("root"));