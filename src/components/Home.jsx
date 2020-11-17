import React from "react";
import { Form, Navbar, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Cardlist from "./Cardlist";
import SearchBox from "./SearchBox";
import Scroll from "./Scroll";
import ErrorBoundry from "./ErrorBoundry";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchfield: "",
      isLoginActive: true,
      route: "home",
      isSignIn: true,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/list")
      .then((response) => response.json())
      .then((user) => this.setState({ users: user }));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { users, searchfield } = this.state;
    const filterUsers = users.filter((user) => {
      return user.name
        .toLocaleLowerCase()
        .includes(searchfield.toLocaleLowerCase());
    });
    return (
      <>
        <Navbar
          sticky="top"
          bg="secondary"
          variant="dark"
          className="container-fluid"
        >
          <Form inline className="mr-auto">
            <Form.Control as="select" style={{ width: "15em" }}>
              <option>All Catagories</option>
            </Form.Control>

            <SearchBox searchChange={this.onSearchChange} />

            <div
              style={{
                marginLeft: "5px",
                color: "white",
              }}
            >
              {`Logged in as ${this.props.name}`}
            </div>
          </Form>
          <Button
            onClick={() => this.props.onRouteChange("submit")}
            style={{
              marginRight: "5px",
              borderRadius: "25px",
              color: "white",
              borderColor: "white",
              width: "7em",
              float: "right",
            }}
            variant="outline-info"
          >
            Suggetions
          </Button>
          <Button
            onClick={() => this.props.onRouteChange("signin")}
            style={{
              marginRight: "5px",
              borderRadius: "25px",
              color: "white",
              borderColor: "white",
              width: "7em",
            }}
            variant="outline-info"
          >
            Sign Out
          </Button>
        </Navbar>
        <div className="tc">
          <Scroll>
            <ErrorBoundry>
              <Cardlist users={filterUsers} />
            </ErrorBoundry>
          </Scroll>
        </div>
      </>
    );
  }
}

export default Home;
