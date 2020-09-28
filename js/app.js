"use strict";

var URL = 'https://raw.githubusercontent.com/ehom/external-data/master/headlines.json';

fetch(URL).then(function (response) {
  return response.json();
}).then(function (json) {
  console.log(json);
  return json;
}).then(function (json) {
  return render(json);
}).catch(function (error) {
  return console.error(error);
});

// TODO
// What to do if 0 hours?
// "n minutes ago"
// 

function getTimePast(t2, t1) {
  var milliSecondsDiff = t2 - t1;
  console.debug("msecs diff: ", milliSecondsDiff);
  var hoursAgo = Math.round(milliSecondsDiff / (1000 * 60 * 60));

  var formatter = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit", // other values: "lookup"
    numeric: "always", // other values: "auto"
    style: "long" // other values: "short" or "narrow"
  });

  return formatter.format(-hoursAgo, 'hour');
}

function Headlines(props) {
  // TODO: get locale from browser?

  // console.log(props.src.articles);

  var atTheMoment = Date.now();

  var headlines = props.src.articles.map(function (article) {
    var hasNoDesc = function hasNoDesc(input) {
      return input.description === null || input.description.length === 0;
    };

    var publishedAt = new Date(article.publishedAt).getTime();
    var howLongAgo = getTimePast(atTheMoment, publishedAt);

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

function Today() {
  var options = {
    weekday: 'long',
    year: 'numeric', month: 'long', day: 'numeric'
  };

  var defaultLocale = undefined;
  var todaysDate = Intl.DateTimeFormat(defaultLocale, options).format(new Date());

  return React.createElement(
    React.Fragment,
    null,
    todaysDate
  );
}

function render(headlines) {
  ReactDOM.render(React.createElement(Today, null), document.getElementById('todaysDate'));
  ReactDOM.render(React.createElement(Headlines, { src: headlines }), document.getElementById('main'));
}