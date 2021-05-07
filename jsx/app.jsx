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
    const storage = this.sessionStorage;

    let headlines;
    let countries;

    if (storage.getItem('countries') && storage.getItem('en-US')) {
      this.setState({
        countries: JSON.parse(storage.getItem('countries')),
        headlines: JSON.parse(storage.getItem('en-US'))
      });
    } else {
      console.time(FETCH_JSONS);
      console.timeLog(FETCH_JSONS);

      fetchJsonS(RESOURCES)
      .then(data => {
        console.timeEnd(FETCH_JSONS);

        [headlines, countries] = data;

        storage.setItem('en-US', JSON.stringify(headlines));
        storage.setItem('countries', JSON.stringify(countries));

        this.setState({
          headlines: headlines,
          countries: countries
        });
      });
    }
  }

  changeHandler(event) {
    const locale = event.target.value;
    const resource = getResource(locale);
    const storage = this.sessionStorage;
    console.debug("fetch resource: ", resource);

    if (storage.getItem(locale)) {
      console.debug("use cache copy of headlines for: ", locale);
      const json = JSON.parse(storage.getItem(locale));
      this.setState({
        locale: locale,
        headlines: json
      });
    } else {
      fetchJson(resource)
      .then((json) => {
        storage.setItem(locale, JSON.stringify(json));
        this.setState({
          locale: locale,
          headlines: json
        });
      })
      .catch((error) => console.log(error));
    }
  }

  render() {
    console.debug("about to render...");
    const style = {fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic'};

    const hebrew = this.state.locale === 'he-IL';
    document.documentElement.lang = hebrew ? 'he'  : 'en';
    document.documentElement.dir  = hebrew ? 'rtl' : 'ltr';

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
        <div className="container">
          <Headlines
            locale={this.state.locale} headlines={this.state.headlines}
          />
        </div>
      </React.Fragment>
    );
  }
}

App.defaultProps = {
  locale: navigator.language
};

ReactDOM.render(<App locale={navigator.language} />, document.getElementById("root"));
