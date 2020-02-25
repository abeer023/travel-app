import React, { Component } from "react";
import Layout from "../shared/Layout";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DataTable } from 'react-data-components';
import 'bootstrap' ;
import 'fontawesome';
import { fetchCities, fetchCitiesVisited, addCityVisited, deleteCityVisited } from '../../actions/cityActions';

const classes = {
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
    },
    backButton: {
        marginTop: 10
    },
    createButton: {
        float: 'right!important',
        marginBottom: 3
    },
    header: {
        marginBottom: 20,
        backgroundColor: '#F0F3F5'
    }
};

// const renderMapUrl = props => {
//     return (
//         <Button>Add</Button>
//     )
// }

const CitiesCard = props => {
    console.log(props.data);
    return (
        <div>
            <Card style={classes.root}>
                <b>Cities to visit</b>
                <DataTable
                    keys="_id"
                    initialData={props.data}
                    initialPageLength={5}
                    columns={[
                        { title: 'City', prop: 'city' },
                        { title: 'Country', prop: 'country' },
                        { title: 'Continent', prop: 'continent' }
                        // { title: 'Map', render: renderMapUrl, className: 'text-center' },
                    ]}
                />
            </Card>
        </div>
    );
};


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            _id: '',
            city: ''
        }
    }

    componentWillMount() {
        this.props.fetchCities();
        this.props.fetchCitiesVisited();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newCityVisit) {
            this.props.citiesVisited.push(nextProps.newCityVisit);
        }
    }

    updateVal = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            _id: '',
            city: ''
        });
    };

    deleteCityVisited = (id) => {
        this.props.deleteCityVisited(id)
    }

    handleSave = (e) => {
        e.preventDefault();
        if (!this.state._id) {
            const cityVisited = {
                city: this.state._id,
                userId: this.props.user._id
            };
            this.props.addCityVisited(cityVisited);
        }
        this.setState({
            open: false,
            _id: '',
            city: ''
        });
    }

    render() {
        let initialCities = [{ city: "Loading", country: "Loading", continent: "Loading" }];
        let { citiesVisited, user, cities } = this.props
        let citiesVisitedByUser = citiesVisited.filter(item => item.userId === user._id);
        return (
            <Layout>
                <CitiesCard data={cities} add={this.handleClickOpen} />
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title">Add City</DialogTitle>
                    <DialogContent>
                        Have you visited {this.state.city}?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">No</Button>
                        <Button onClick={this.handleSave} color="primary">Yes</Button>
                    </DialogActions>
                </Dialog>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    cities: state.cities.items,
    citiesVisited: state.cities.visited,
    newCityVisted: state.cities.item,
    user: state.auth.user
});

export default connect(mapStateToProps, { fetchCities, fetchCitiesVisited, addCityVisited, deleteCityVisited })(withRouter(Home));
