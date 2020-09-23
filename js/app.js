const URL = 'https://raw.githubusercontent.com/ehom/news-api-demo/master/js/headlines.json';

fetch(URL)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    return json;
  })
  .then(json => render(json))
  .catch(error => console.error(error));

function Headlines(props) {
  // TODO: get locale from browser?
  const locale = 'en';
  const formatter = new Intl.DateTimeFormat(locale, {hour: '2-digit', minute: '2-digit'});
  
  // console.log(props.src.articles);
  
  const today = new Date(props.src.articles[0].publishedAt).toLocaleDateString();
  // console.log("Today:", today);

  const headlines = props.src.articles.map((article) => {
    const hasNoDesc = (input) => {
      return input.description === null || input.description.length === 0;
    }
    
    let publishedAt = new Date(article.publishedAt);
    const timePublished = formatter.format(publishedAt);

    if (publishedAt.toLocaleDateString() !== today) {
      // publishedAt = `Yesterday, ${timePublished}`;
      publishedAt = `Yesterday`;
    } else {
      publishedAt = timePublished;
    }
    
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
          <li class="list-group-item">{publishedAt}</li>
        </ul>
      </div>
    );
  });
  return (
    <div class="row">{headlines}</div>
  );
}

function getDateFrom(headlines) {
  const today = new Date(headlines.articles[0].publishedAt).toLocaleDateString();
  return today;
}

function LastUpdated(props) {
  return (
    <React.Fragment>Last updated: {props.date}</React.Fragment>
  );
}

function render(headlines) {
  const when = getDateFrom(headlines);
  
  ReactDOM.render(<LastUpdated date={when}/>,
                document.getElementById('lastUpdate'));
  ReactDOM.render(<Headlines src={headlines}/>, 
                document.getElementById('main'));
}

