'use strict';

var HEADLINES = 'https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json';

var userLanguage = navigator.language;

fetch(HEADLINES).then(function (response) {
  return response.json();
}).then(function (json) {
  console.log(json);
  return json;
}).then(function (json) {
  return render(json);
}).catch(function (error) {
  return console.error(error);
});

// TODO: Register Handler for when
// "navigator.language" changes

function Headlines(props) {
  moment.locale(userLanguage);

  var thisMoment = Date.now();

  var headlines = props.src.articles.map(function (article) {
    var hasNoDesc = function hasNoDesc(input) {
      return input.description === null || input.description.length === 0;
    };

    var published = moment(new Date(article.publishedAt));
    var howLongAgo = published.from(thisMoment);

    var description = article.description;
    if (hasNoDesc(article)) {
      description = article.source.name;
    }

    return React.createElement(
      'div',
      { className: 'card mb-5 col-sm-4 app-headline' },
      React.createElement('img', { className: 'card-img-top', src: article.urlToImage }),
      React.createElement(
        'div',
        { className: 'card-body' },
        React.createElement(
          'h5',
          { className: 'card-title' },
          article.title
        ),
        React.createElement(
          'p',
          { className: 'card-text' },
          React.createElement(
            'a',
            { href: article.url, target: '_blank' },
            description
          )
        )
      ),
      React.createElement(
        'ul',
        { className: 'list-group list-group-flush' },
        React.createElement(
          'li',
          { className: 'list-group-item' },
          howLongAgo
        )
      )
    );
  });

  return React.createElement(
    'div',
    { className: 'row' },
    headlines
  );
}

function Today() {
  var options = {
    weekday: 'long',
    year: 'numeric', month: 'long', day: 'numeric'
  };

  var todaysDate = new Intl.DateTimeFormat(userLanguage, options).format(new Date());

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