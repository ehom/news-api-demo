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

    const resource =
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

  render() {
    console.debug("about to render...");
    const style = {fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic'};

    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light mb-5">
          <h3 className="navbar-text" style={style}>BUSINESS HEADLINES</h3>
          <a href="#" className="badge badge-pill badge-primary">US</a>
          <a href="#" className="badge badge-pill badge-primary">Japan</a>
          <a href="#" className="badge badge-pill badge-primary">Hong Kong</a>
          <a href="#" className="badge badge-pill badge-primary">South Korea</a>
          <a href="#" className="badge badge-pill badge-primary">France</a>
          <a href="#" className="badge badge-pill badge-primary">Israel</a>
          <a href="#" className="badge badge-pill badge-primary">Egypt</a>
          <span className="navbar-text float-right" style={style}><Today locale={this.state.locale} /></span>
        </nav>
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
