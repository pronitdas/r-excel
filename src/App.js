import React, { Component } from 'react';
import './App.css';
import ReactDataGrid from 'react-data-grid';
import * as _ from 'lodash';
let data = require("./data.json");

const frozenColumns = [];
class App extends Component {

    constructor(props){
        super(props);
        this.state= {
            row:data,
            column:[]
        };
        this.rowGetter =this.rowGetter.bind(this);
        this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
        this.handleGridSort = this.handleGridSort.bind(this);
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
            let columnDef = {key: k ,name:_.startCase(k),sortable: true, resizable: true ,editable:true , filterable: true ,cellClass:"no-overflow"};
            if(_.includes(frozenColumns,k)){
                columnDef = _.assign(columnDef , {locked: true});
                columns.unshift(columnDef);
            } else if ("isActive" === k){
                console.log("do nothing");
            } else {
                columns.push(columnDef);
            }
            console.log(columnDef);
        });
        this.setState({column:columns});
    }

    rowGetter(i) {
        const { row } = this.state;
        if(row){
            return row[i];
        } else {
            return data[i];
        }

    }

    handleGridRowsUpdated({ fromRow, toRow, updated }) {
        const {row} = this.state;
        let rows = row.slice();

        console.log("updaete");
    }

    handleGridSort(sortColumn, sortDirection) {
        console.log("sortColumn" , sortColumn);
        console.log("sortDirection" , _.lowerCase(sortDirection));


        let rows = sortDirection === 'NONE' ? data : _.orderBy(data, sortColumn , _.lowerCase(sortDirection));
        if(sortDirection !== 'NONE'){
            console.log("sorted",rows);
        }
        this.setState({ row:rows });
    }

    render() {
        return  (
            <div style={{marginLeft: "auto",marginRight: "auto", marginTop:"100px",maxWidth: "1500px",float: "none"}}>
                <ReactDataGrid
                    // rowRenderer={RowRenderer}
                    onGridSort={this.handleGridSort}
                    columns={this.state.column}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.row.length}
                    minHeight={1000}
                    minColumnWidth={50}
                    // enableCellSelect={true}
                    // onGridRowsUpdated={this.handleGridRowsUpdated}
                />
            </div>
        );
    }

}

export default App;
