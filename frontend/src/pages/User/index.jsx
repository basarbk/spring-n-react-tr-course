import { Component } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "./api";
import { Alert } from "@/shared/components/Alert";
import { Spinner } from "@/shared/components/Spinner";

export class UserClass extends Component {
  state = {
    user: null,
    apiProgress: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ apiProgress: true });
    try {
      const response = await getUser(this.props.id);
      this.setState({
        user: response.data,
      });
    } catch (axiosError) {
      this.setState({
        error: axiosError.response.data.message,
      });
    } finally {
      this.setState({ apiProgress: false });
    }
  }

  render() {
    return (
      <>
        {this.state.user && <h1>{this.state.user.username}</h1>}
        {this.state.apiProgress && (
          <Alert styleType="secondary" center>
            <Spinner />
          </Alert>
        )}
        {this.state.error && (
          <Alert styleType="danger">{this.state.error}</Alert>
        )}
      </>
    );
  }
}

export function User() {
  const { id } = useParams();
  return <UserClass id={id} />;
}
