const URL= 'https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json';

fetch(URL)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    return json;
  })
  .then(json => render(json))
  .catch(error => console.error(error));

// TODO: Register Handler for when
// "navigator.language" changes

function Headlines(props) {
  moment.locale(navigator.language);
 
  const thisMoment = Date.now();

  const headlines = props.src.articles.map((article) => {
    const hasNoDesc = (input) => {
      return input.description === null || input.description.length === 0;
    }
    
    let published = moment(new Date(article.publishedAt));
    let howLongAgo = published.from(thisMoment);

    let description = article.description;
    if (hasNoDesc(article)) {
      description = article.source.name;
    }

    return (
      <div class='card mb-5 col-sm-4 app-headline'>
        <img class='card-img-top' src={article.urlToImage}/>
        <div class='card-body'>
          <h5 class='card-title'>{article.title}</h5>
          <p class='card-text'>
            <a href={article.url} target='_blank'>{description}</a>
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{howLongAgo}</li>
        </ul>
      </div>
    );
  });
  return (
    <div class="row">{headlines}</div>
  );
}

function Today() {
  const options = {
    weekday: 'long',
    year: 'numeric', month: 'long', day: 'numeric'
  };

  const defaultLocale = navigator.language;

  const todaysDate = new Intl.DateTimeFormat(defaultLocale, options).format(new Date());

  return (
    <React.Fragment>{todaysDate}</React.Fragment>
  );
}

function render(headlines) {
  ReactDOM.render(<Today/>,
                document.getElementById('todaysDate'));
  ReactDOM.render(<Headlines src={headlines}/>, 
                document.getElementById('main'));
}

