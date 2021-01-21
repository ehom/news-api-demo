class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headlines: [],
      locale: this.props.locale
    };
    console.debug("ctor");
  }

  componentDidMount() {
    console.debug("componentDidMount");

    const URL =
      "https://raw.githubusercontent.com/ehom/external-data/master/news-api-org/headlines.json";

    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          headlines: json
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.debug("about to render...");
    return (
      <React.Fragment>
        <div className="jumbotron pb-4 mb-5">
          <h5>
            <Today locale={this.state.locale} />
          </h5>
          <h1 className="title">BUSINESS HEADLINES</h1>
        </div>
        <div className="container">
          <Headlines
            headlines={this.state.headlines}
            locale={this.state.locale}
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
