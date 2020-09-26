const URL = 'https://raw.githubusercontent.com/ehom/news-api-demo/master/js/headlines.json';

fetch(URL)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    return json;
  })
  .then(json => render(json))
  .catch(error => console.error(error));

// TODO
// What to do if 0 hours?
// "n minutes ago"
// 

function getTimePast(t2, t1) {
  const milliSecondsDiff = t2 - t1;
  console.debug("msecs diff: ", milliSecondsDiff);
  const hoursAgo = Math.round(milliSecondsDiff / (1000 * 60 * 60));
  return `${hoursAgo}h ago`;
}

function Headlines(props) {
  // TODO: get locale from browser?
  
  // console.log(props.src.articles);
  
  const atTheMoment = Date.now();

  const headlines = props.src.articles.map((article) => {
    const hasNoDesc = (input) => {
      return input.description === null || input.description.length === 0;
    }
    
    const publishedAt = new Date(article.publishedAt).getTime();
    const howLongAgo = getTimePast(atTheMoment, publishedAt);

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

function getLastModified() {
  const options = {
    weekday: 'long',
    year: 'numeric', month: 'long', day: 'numeric'
  };

  return new Date(document.lastModified).toLocaleDateString(undefined, options);
}

function LastUpdated(props) {
  return (
    <React.Fragment>Last updated: {props.date}</React.Fragment>
  );
}

function render(headlines) {
  const when = getLastModified();
  
  ReactDOM.render(<LastUpdated date={when}/>,
                document.getElementById('lastUpdate'));
  ReactDOM.render(<Headlines src={headlines}/>, 
                document.getElementById('main'));
}

