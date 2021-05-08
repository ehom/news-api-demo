"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var ItemSelector = function ItemSelector(_ref2) {
  var id = _ref2.id,
      items = _ref2.items,
      onChange = _ref2.onChange;

  var options = Object.entries(items).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return React.createElement(
      "option",
      { value: key },
      value
    );
  });
  return React.createElement(
    "select",
    { id: id, onChange: onChange, className: "form-control" },
    options
  );
};

var LinkToGoogleTranslate = function LinkToGoogleTranslate(_ref5) {
  var sourceLang = _ref5.sourceLang,
      targetLang = _ref5.targetLang,
      href = _ref5.href,
      text = _ref5.text;

  var _sourceLang$split = sourceLang.split('-'),
      _sourceLang$split2 = _slicedToArray(_sourceLang$split, 2),
      lang = _sourceLang$split2[0],
      country = _sourceLang$split2[1];

  if (lang === 'en') {
    return React.createElement(
      "a",
      { href: href, target: "_blank" },
      text
    );
  }
  var result = "https://translate.google.com/translate?sl=" + sourceLang + "&tl=" + targetLang + "&u=" + href;

  return React.createElement(
    "a",
    { href: result, target: "_blank" },
    text
  );
};

var Headlines = function (_React$Component) {
  _inherits(Headlines, _React$Component);

  function Headlines(props) {
    _classCallCheck(this, Headlines);

    return _possibleConstructorReturn(this, (Headlines.__proto__ || Object.getPrototypeOf(Headlines)).call(this, props));
  }

  _createClass(Headlines, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      console.debug(this.props);

      var isEmpty = function isEmpty(a) {
        return a.length === 0;
      };

      if (isEmpty(this.props.headlines)) {
        return null;
      }

      moment.locale(this.props.locale);
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
        } else {
          console.debug("description:", description);
          var utf16_s = new Utf16String(description);
          console.debug("UTF16:\n", utf16_s.toHexString());

          if (utf16_s.isCorrupted()) {
            console.debug("Bad utf16 characters detected in description text.");
            return null;
          }

          // todo -- use a lookup table so that
          // we can use do this check for other languages/scripts

          if (_this2.props.locale === 'el-GR' && !utf16_s.isGreek()) {
            console.debug("Bad Greek characters detected in description text.");
            return null;
          }
        }

        return React.createElement(
          "div",
          { className: "card mb-5 col-sm-4 app-headline" },
          React.createElement("img", { className: "card-img-top", src: article.urlToImage }),
          React.createElement(
            "div",
            { className: "card-body", dir: "auto" },
            React.createElement(
              "h5",
              { className: "card-title" },
              article.title
            ),
            React.createElement(LinkToGoogleTranslate, { href: article.url, sourceLang: _this2.props.locale, targetLang: "en", text: Util.decodeHtml(description) })
          ),
          React.createElement(
            "ul",
            { className: "list-group list-group-flush" },
            React.createElement(
              "li",
              { className: "list-group-item" },
              howLongAgo
            )
          )
        );
      });

      return React.createElement(
        "div",
        { className: "row" },
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