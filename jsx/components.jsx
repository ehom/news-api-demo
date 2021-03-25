const Today = ({ locale }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  const today = new Intl.DateTimeFormat(locale, options).format(new Date());
  return <React.Fragment>{today}</React.Fragment>;
};

Today.defaultProps = {
  locale: navigator.language
};

class Headlines extends React.Component {
  constructor(props) {
    super(props);
    moment.locale(this.props.locale);
  }

  render() {
    console.debug(this.props);

    const isEmpty = (a) => a.length === 0;

    if (isEmpty(this.props.headlines)) {
      return <div class="row">x</div>;
    }

    const thisMoment = moment(new Date());

    // TODO
    // rewrite this to use a loop instead of calling map?

    const headlines = this.props.headlines.articles.map((article) => {
      const hasNoDesc = (object) => {
        return object.description === null || object.description.length === 0;
      };

      let published = moment(new Date(article.publishedAt));
      let howLongAgo = published.from(thisMoment);

      let description = Util.decodeHtml(article.description);
      if (hasNoDesc(article)) {
        description = article.source.name;
      }

      return (
        <div class="card mb-5 col-sm-4 app-headline">
          <img class="card-img-top" src={article.urlToImage} />
          <div class="card-body">
            <h5 class="card-title">{article.title}</h5>
            <p class="card-text">
              <a href={article.url} target="_blank">
                {description}
              </a>
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{howLongAgo}</li>
          </ul>
        </div>
      );
    });

    return <div class="row">{headlines}</div>;
  }
}

Headlines.defaultProps = {
  headlines: [],
  locale: navigator.language
};

const Util = {
  decodeHtml: (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
};
