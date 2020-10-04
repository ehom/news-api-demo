const HEADLINES= 'https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json';

const userLanguage = navigator.language;

fetch(HEADLINES)
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
  moment.locale(userLanguage);
 
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
      <div className='card mb-5 col-sm-4 app-headline'>
        <img className='card-img-top' src={article.urlToImage}/>
        <div className='card-body'>
          <h5 className='card-title'>{article.title}</h5>
          <p className='card-text'>
            <a href={article.url} target='_blank'>{description}</a>
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{howLongAgo}</li>
        </ul>
      </div>
    );
  });

  return (
    <div className="row">{headlines}</div>
  );
}

function Today() {
  const options = {
    weekday: 'long',
    year: 'numeric', month: 'long', day: 'numeric'
  };

  const todaysDate = new Intl.DateTimeFormat(userLanguage, options).format(new Date());

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

