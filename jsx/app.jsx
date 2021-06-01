const TITLE = "World News Headlines";

const getResource = (locale) => {
  const [notUsed, countryCode] = locale.split('-');
  return `https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/${countryCode.toLowerCase()}-headlines.json`;
};

const RESOURCES = [
  getResource('en-US'),
  'https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/countries.json'
];

const URLs = {
  RTS_CSS: 'https://cdn.rtlcss.com/bootstrap/v4.5.3/css/bootstrap.min.css',
  LTR_CSS: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css'
};

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

    console.debug("cache:", cache);

    if (cache.getItem('countries') && cache.getItem('locale')) {
      const locale = cache.getItem('locale');
      console.debug("use locale from cache:", locale);

      this.setState({
        countries: JSON.parse(cache.getItem('countries')),
        locale: locale,
        headlines: JSON.parse(cache.getItem(locale)),
      });
    } else {
      console.time(FETCH_JSONS);
      console.timeLog(FETCH_JSONS);

      fetchJsonS(RESOURCES)
      .then(data => {
        console.timeEnd(FETCH_JSONS);

        const [headlines, countries] = data;

        cache.setItem(this.state.locale, JSON.stringify(headlines));
        cache.setItem('countries', JSON.stringify(countries));
        cache.setItem('locale', this.state.locale);
        this.setState({
          headlines: headlines,
          countries: countries,
          locale: this.state.locale
        });
      });
    }
  }

  fetchHeadlines(locale) {
    const cache = this.sessionStorage;

    if (cache.getItem(locale)) {
      console.debug("Use cache copy of headlines for: ", locale);
      cache.setItem('locale', locale);
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
        cache.setItem('locale', locale);

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

  getDir(lang) {
    const langsRTL = ['ar', 'he'];
    return langsRTL.includes(lang) ? "rtl" : "ltr";
  }

  setPageOrientation(locale) {
    const [lang, _country] = locale.split('-');

    const docElement = document.documentElement;

    docElement.lang = lang;
    docElement.dir  = this.getDir(lang);

    const cssLinkElement = document.getElementById('bootstrap');

    cssLinkElement.href = docElement.dir === 'rtl' ? URLs.RTS_CSS : URLs.LTR_CSS;
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
              <ItemSelector id="countrySelector" items={this.state.countries} onChange={this.changeHandler.bind(this)}
                defaultValue={this.state.locale} />
            </div>
          </div>
        </div>
        <main role="main">
          <Headlines
            locale={this.state.locale} headlines={this.state.headlines}
          />
        </main>
        <footer>
          This web app enables you to read news from around the world with the help of Google Translate.
        </footer>
      </React.Fragment>
    );
  }
}

App.defaultProps = {
  locale: 'en-US'
};

ReactDOM.render(<App />, document.getElementById("root"));