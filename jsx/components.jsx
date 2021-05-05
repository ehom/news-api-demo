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

const ItemSelector = ({id, items, onChange}) => {
  const options = Object.entries(items).map(([key, value]) => <option value={key}>{value}</option>);
  return (
    <select id={id} onChange={onChange} className="form-control">
    {options}
    </select>
  );
};

class Headlines extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.debug(this.props);

    const isEmpty = (a) => a.length === 0;

    if (isEmpty(this.props.headlines)) {
      return null;
    }

    moment.locale(this.props.locale);
    const thisMoment = moment(new Date());

    // TODO
    // rewrite this to use a loop instead of calling map?

    const headlines = this.props.headlines.articles.map((article) => {
      const hasNoDesc = (object) => {
        return object.description === null || object.description.length === 0;
      };

      let published = moment(new Date(article.publishedAt));
      let howLongAgo = published.from(thisMoment);

      let description = article.description;
      if (hasNoDesc(article)) {
        description = article.source.name;
      } else {
        console.debug("description:", description);
        const utf16_s = new Utf16String(description);
        console.debug("UTF16:\n", utf16_s.toHexString());

        if (utf16_s.isCorrupted()) {
          console.debug("Bad utf16 characters detected in description text.")
          return null;
        }

        // todo -- use a lookup table so that
        // we can use do this check for other languages/scripts

        if (this.props.locale === 'el-GR' && !utf16_s.isGreek()) {
          console.debug("Bad Greek characters detected in description text.")
          return null;
        }
      }

      return (
        <div className="card mb-5 col-sm-4 app-headline">
          <img className="card-img-top" src={article.urlToImage} />
          <div className="card-body" dir='auto'>
            <h5 className="card-title">{article.title}</h5>
            <a href={article.url} target="_blank">
            {Util.decodeHtml(description)}
            </a>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{howLongAgo}</li>
          </ul>
        </div>
      );
    });

    return <div className="row">{headlines}</div>;
  }
}

Headlines.defaultProps = {
  headlines: [],
  locale: navigator.language
};


