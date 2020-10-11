'use strict';

var userLanguage = navigator.language;
var HEADLINES = 'https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json';

fetch(HEADLINES).then(function (response) {
  return response.json();
}).then(function (json) {
  console.log(json);
  return json;
}).then(function (json) {
  ReactDOM.render(React.createElement(Page, { headlines: json }), document.getElementById('root'));
}).catch(function (error) {
  return console.error(error);
});

function Page(props) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'jumbotron pb-4 mb-5' },
      React.createElement(TodaysDate, null),
      React.createElement(
        'h1',
        { className: 'title' },
        'BUSINESS HEADLINES'
      )
    ),
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(Headlines, { src: props.headlines }),
      ','
    )
  );
}

// TODO: Register Handler for when
// "navigator.language" changes

function Headline(properties) {
  // TODO -- default properties ???

  return React.createElement(
    'div',
    { className: 'card mb-5 col-sm-4 app-headline' },
    React.createElement(
      'a',
      { href: properties.url, target: '_blank' },
      React.createElement('img', { className: 'card-img-top', src: properties.urlToImage })
    ),
    React.createElement(
      'div',
      { className: 'card-body' },
      React.createElement(
        'h5',
        { className: 'card-title' },
        properties.title
      ),
      React.createElement(
        'p',
        { className: 'card-text' },
        React.createElement(
          'a',
          { href: properties.url, target: '_blank' },
          properties.description
        )
      )
    ),
    React.createElement(
      'ul',
      { className: 'list-group list-group-flush' },
      React.createElement(
        'li',
        { className: 'list-group-item' },
        properties.howLongAgo
      )
    )
  );
}

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

    return React.createElement(Headline, { title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      howLongAgo: howLongAgo });
  });

  return React.createElement(
    'div',
    { className: 'row' },
    headlines
  );
}

function TodaysDate() {
  var options = {
    weekday: 'long',
    year: 'numeric', month: 'long', day: 'numeric'
  };

  var date = new Intl.DateTimeFormat(userLanguage, options).format(new Date());

  return React.createElement(
    React.Fragment,
    null,
    date
  );
}