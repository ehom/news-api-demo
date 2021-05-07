const TITLE = "World News Headlines";

const getResource = (locale) => {
  const [notUsed, countryCode] = locale.split('-');
  return `https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/${countryCode.toLowerCase()}-headlines.json`;
};

const RESOURCES = [
  getResource('en-US'),
  'https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/countries.json'
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: this.props.locale,
      headlines: [],
      countries: {}
    };
    console.debug("ctor");
  }

  sessionStorage = window.sessionStorage;

  componentDidMount() {
    console.debug("componentDidMount()");

    const FETCH_JSONS = "fetchJsonS";
    const cache = this.sessionStorage;

    if (cache.getItem('countries') && cache.getItem('en-US')) {
      this.setState({
        countries: JSON.parse(cache.getItem('countries')),
        headlines: JSON.parse(cache.getItem('en-US'))
      });
    } else {
      console.time(FETCH_JSONS);
      console.timeLog(FETCH_JSONS);

      fetchJsonS(RESOURCES)
      .then(data => {
        console.timeEnd(FETCH_JSONS);

        const [headlines, countries] = data;

        cache.setItem('en-US', JSON.stringify(headlines));
        cache.setItem('countries', JSON.stringify(countries));

        this.setState({
          headlines: headlines,
          countries: countries
        });
      });
    }
  }

  fetchHeadlines(locale) {
    const cache = this.sessionStorage;

    if (cache.getItem(locale)) {
      console.debug("Use cache copy of headlines for: ", locale);

      this.setState({
        locale: locale,
        headlines: JSON.parse(cache.getItem(locale))
      });
    } else {
      const resource = getResource(locale);
      console.debug("fetch headlines: ", resource);

      fetchJson(resource)
      .then((json) => {
        cache.setItem(locale, JSON.stringify(json));
        this.setState({
          locale: locale,
          headlines: json
        });
      })
      .catch((error) => console.log(error));
    }
  }

  changeHandler(event) {
    const locale = event.target.value;
    this.fetchHeadlines(locale);
  }

  setPageOrientation(locale) {
    const hebrew = locale === 'he-IL';
    // todo
    document.documentElement.lang = hebrew ? 'he'  : 'en';
    document.documentElement.dir  = hebrew ? 'rtl' : 'ltr';

    const RTS_CSS = 'https://cdn.rtlcss.com/bootstrap/v4.5.3/css/bootstrap.min.css';
    const LTR_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css';

    document.getElementById('bootstrap').href = document.documentElement.dir === 'rtl' ? RTS_CSS: LTR_CSS;
  }

  render() {
    console.debug("about to render...");
    const style = {fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic'};

    this.setPageOrientation(this.state.locale);

    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light mb-3">
          <h3 className="navbar-text" style={style}>{TITLE}</h3>
          <span className="navbar-text float-right"><Today locale={this.state.locale} /></span>
        </nav>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-7">
            </div>
            <div className="col-md-5">
              <ItemSelector id="countrySelector" items={this.state.countries} onChange={this.changeHandler.bind(this)} />
            </div>
          </div>
        </div>
        <main role="main">
          <Headlines
            locale={this.state.locale} headlines={this.state.headlines}
          />
        </main>
      </React.Fragment>
    );
  }
}

App.defaultProps = {
  locale: navigator.language
};

ReactDOM.render(<App locale={navigator.language} />, document.getElementById("root"));
