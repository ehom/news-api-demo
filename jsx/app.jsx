const userLanguage = navigator.language;
const HEADLINES= 'https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json';

fetch(HEADLINES)
  .then(response => response.json())
  .then(json => {
    console.log(json);
    return json;
  })
  .then((json) => {
    ReactDOM.render(<Page headlines={json} />, document.getElementById('root'));
  })
  .catch(error => console.error(error));

function Page(props) {
  return (
    <React.Fragment>
      <div className='jumbotron pb-4 mb-5 text-center'>
        <h1 className='title'>BUSINESS HEADLINES</h1>
        <TodaysDate />
      </div>
      <div className='container'>
        <Headlines src={props.headlines} />,
      </div>
    </React.Fragment>
  );
}

// TODO: Register Handler for when
// "navigator.language" changes

function Headline(properties) {
  // TODO -- default properties ???
  console.debug("Source:", properties.source);

  return (
    <div className='card mb-5 col-sm-4 app-headline'>
      <img className='card-img-top' src={properties.urlToImage} />
      <div className='card-body'>
        <h5 className='card-title'>{properties.title}</h5>
        <p className='card-text'>{properties.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <a href={properties.url} target='_blank'>{properties.sourceName}</a>
        </li>
        <li className="list-group-item">{properties.howLongAgo}</li>
      </ul>
    </div>
  );
}

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

    return <Headline title={article.title}
                     description={article.description}
                     sourceName={article.source.name}
                     url={article.url}
                     urlToImage={article.urlToImage}
                     howLongAgo={howLongAgo} />;
  });

  return (
    <div className='row'>{headlines}</div>
  );
}

function TodaysDate() {
  const options = {
    weekday: 'long',
    year: 'numeric', month: 'long', day: 'numeric'
  };

  const date = new Intl.DateTimeFormat(userLanguage, options).format(new Date());

  return (
    <React.Fragment>{date}</React.Fragment>
  );
}
