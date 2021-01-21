"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Today = function Today(_ref) {
  var locale = _ref.locale;

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  var today = new Intl.DateTimeFormat(locale, options).format(new Date());
  return React.createElement(
    React.Fragment,
    null,
    today
  );
};

Today.defaultProps = {
  locale: navigator.language
};

Today.propTypes = {
  locale: PropTypes.string
};

var Headlines = function (_React$Component) {
  _inherits(Headlines, _React$Component);

  function Headlines(props) {
    _classCallCheck(this, Headlines);

    var _this = _possibleConstructorReturn(this, (Headlines.__proto__ || Object.getPrototypeOf(Headlines)).call(this, props));

    moment.locale(_this.props.locale);
    return _this;
  }

  _createClass(Headlines, [{
    key: "render",
    value: function render() {
      console.debug(this.props);

      var isEmpty = function isEmpty(a) {
        return a.length === 0;
      };

      if (isEmpty(this.props.headlines)) {
        return React.createElement(
          "div",
          { "class": "row" },
          "x"
        );
      }

      var thisMoment = moment(new Date());

      // TODO
      // rewrite this to use a loop instead of calling map?

      var headlines = this.props.headlines.articles.map(function (article) {
        var hasNoDesc = function hasNoDesc(object) {
          return object.description === null || object.description.length === 0;
        };

        var published = moment(new Date(article.publishedAt));
        var howLongAgo = published.from(thisMoment);

        var description = article.description;
        if (hasNoDesc(article)) {
          description = article.source.name;
        }

        return React.createElement(
          "div",
          { "class": "card mb-5 col-sm-4 app-headline" },
          React.createElement("img", { "class": "card-img-top", src: article.urlToImage }),
          React.createElement(
            "div",
            { "class": "card-body" },
            React.createElement(
              "h5",
              { "class": "card-title" },
              article.title
            ),
            React.createElement(
              "p",
              { "class": "card-text" },
              React.createElement(
                "a",
                { href: article.url, target: "_blank" },
                description
              )
            )
          ),
          React.createElement(
            "ul",
            { "class": "list-group list-group-flush" },
            React.createElement(
              "li",
              { "class": "list-group-item" },
              howLongAgo
            )
          )
        );
      });

      return React.createElement(
        "div",
        { "class": "row" },
        headlines
      );
    }
  }]);

  return Headlines;
}(React.Component);

Headlines.defaultProps = {
  headlines: [],
  locale: navigator.language
};

Headlines.propTypes = {
  headlines: PropTypes.array,
  locale: PropTypes.string
};