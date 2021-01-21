"use strict";

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
      headlines: [],
      locale: _this.props.locale
    };
    console.debug("ctor");
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      console.debug("componentDidMount");

      var URL = "https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json";

      fetch(URL).then(function (response) {
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
    key: "render",
    value: function render() {
      console.debug("about to render...");
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { className: "jumbotron pb-4 mb-5" },
          React.createElement(
            "h5",
            null,
            React.createElement(Today, { locale: this.state.locale })
          ),
          React.createElement(
            "h1",
            { className: "title" },
            "BUSINESS HEADLINES"
          )
        ),
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(Headlines, {
            headlines: this.state.headlines,
            locale: this.state.locale
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

ReactDOM.render(React.createElement(App, { locale: navigator.language }), document.getElementById("root"));