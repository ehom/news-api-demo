const TITLE = "World Headlines";

const URL = (url) => {
  return `https://cors.bridged.cc/${url}`;
};

const RESOURCES = [
  URL('https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/us-headlines.json'),
  URL('https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/countries.json')
];

const getResource = (locale) => {
  const [notUsed, countryCode] = locale.split('-');
  return URL(`https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/${countryCode.toLowerCase()}-headlines.json`);
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

  componentDidMount() {
    console.debug("componentDidMount()");

    fetchResources(RESOURCES)
    .then(data => {
      console.debug("debug:", data[0]);
      console.debug("debug:", data[1]);

        const [headlines, countries] = data;
        this.setState({
          headlines: headlines,
          countries: countries
        });
    });
  }

  changeHandler(event) {
    const locale = event.target.value;
    const resource = getResource(locale);

    console.log("fetch resource: ", resource);

    fetch(resource)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          locale: locale,
          headlines: json
        });
      })
      .catch((error) => console.log(error));
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

const ItemSelector = ({id, items, onChange}) => {
  return (
    <select id={id} onChange={onChange} className="form-control">
    {
      Object.entries(items).map(([key, value]) => <option value={key}>{value}</option>)
    }
    </select>
  );
};

ReactDOM.render(<App locale={navigator.language} />, document.getElementById("root"));
