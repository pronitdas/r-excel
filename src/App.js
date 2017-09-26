import React, { Component } from 'react';
import './App.css';
import ReactDataGrid from 'react-data-grid';
import * as _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';

var data = require("./data.json");

class App extends Component {

    constructor(props){
        super(props);
        this.state= {
            row:[],
            column:[]
        };
        this.rowGetter =this.rowGetter.bind(this);
    }


    componentDidMount() {
        console.log(data);
        this.createHeaders();
    }

    createHeaders() {
        console.log("keys",_.keys(data[0]));
        let keys = _.keys(data[0]);
        let columns =[];
        _.forEach(keys , (k)=>{
          columns.push({"key": k ,"name":_.startCase(k), "resizable": true});
        });
        this.setState({column:columns});
    }

    rowGetter(i) {
        return data[i];
    }

    render() {
        return  (
            <ReactDataGrid
                columns={this.state.column}
                rowGetter={this.rowGetter}
                rowsCount={data.length}
                minHeight={500}
                minColumnWidth={120} />);
    }

}

export default App;
