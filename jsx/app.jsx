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
    let resource =
      "https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json";

    fetch(resource)
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

    let resource =
      "https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json";

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

    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light mb-3">
          <h3 className="navbar-text" style={style}>BUSINESS HEADLINES</h3>
          <span className="navbar-text float-right"><Today locale={this.state.locale} /></span>
        </nav>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-9">
            </div>
            <div className="col-md-3">
              <ItemSelector id="countrySelector" onChange={this.changeHandler.bind(this)} />
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

const ItemSelector = ({id, onChange}) => {
  return (
    <select id={id} onChange={onChange} className="form-control">
      <option value='en-US'>US</option>
      <option value='en-GB'>Great Britain</option>
      <option value='fr-FR'>France</option>
      <option value='de-CH'>Switzerland</option>
      <option value='zh-CN'>China</option>
      <option value='zh-HK'>Hong Kong</option>
      <option value='zh-TW'>Taiwan</option>
      <option value='ja-JP'>Japan</option>
      <option value='ko-KR'>South Korea</option>
      <option value='th-TH'>Thailand</option>
      <option value='el-GR'>Greece</option>
      <option value='tr-TR'>Turkey</option>
      <option value='pl-PL'>Poland</option>
      <option value='ru-RU'>Russia</option>
      <option value='he-IL'>Israel</option>
    </select>
  );
};

ReactDOM.render(<App locale={navigator.language} />, document.getElementById("root"));
