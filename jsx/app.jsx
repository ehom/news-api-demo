const DEFAULT_RESOURCE =
  "https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/us-headlines.json";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: this.props.locale,
      headlines: []
    };
    console.debug("ctor");
  }

  componentDidMount() {
    fetch(DEFAULT_RESOURCE)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          headlines: json
        });
      })
      .catch((error) => console.log(error));
  }

  changeHandler(event) {
    const locale = event.target.value;
    console.debug("change event:", locale);

    let resource = DEFAULT_RESOURCE;

    console.debug("debug state, locale: ", this.state.locale);

    if (event.target.value !== 'en-US') {
      const [ languageCode, countryCode ] = locale.split('-');
      console.debug("debug countryCode: ", countryCode);
      resource = `https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/${countryCode.toLowerCase()}-headlines.json`;
    }

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

    const tableOfCountries = {
      'en-US': "United States",
      'en-GB': "United Kingdom",
      'fr-FR': "France",
      'de-CH': "Switzerland",
      'zh-CN': "China",
      'zh-HK': "Hong Kong",
      'zh-TW': "Taiwan",
      'ja-JP': "Japan",
      'ko-KR': "South Korea",
      'th-TH': "Thailand",
      'el-GR': "Greece",
      'tr-TR': "Turkey",
      'pl-PL': "Poland",
      'ru-RU': "Russia",
      'he-IL': "Israel"
    };

    const hebrew = this.state.locale === 'he-IL';
    document.documentElement.lang = hebrew ? 'he'  : 'en';
    document.documentElement.dir  = hebrew ? 'rtl' : 'ltr';

    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light mb-3">
          <h3 className="navbar-text" style={style}>BUSINESS HEADLINES</h3>
          <span className="navbar-text float-right"><Today locale={this.state.locale} /></span>
        </nav>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-7">
            </div>
            <div className="col-md-5">
              <ItemSelector id="countrySelector" items={tableOfCountries} onChange={this.changeHandler.bind(this)} />
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
