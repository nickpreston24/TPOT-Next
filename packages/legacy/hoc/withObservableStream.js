
export const withObservableStream = (observable, triggers) => Component => {

    return class extends React.Component {

        componentDidMount() {
            this.subscription = observable.subscribe(newState =>
                this.setState({ ...newState }),
            );
        }

        componentWillMount() {
            this.subscription.unsubscribe();
        }

        render() {
            return (
                <Component {...this.props} {...this.state} {...triggers} />)
        }
    }
}

