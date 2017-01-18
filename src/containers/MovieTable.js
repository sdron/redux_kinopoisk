import React from 'react'
import Table from '../components/Table'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { filterBy , sortBy } from '../actions'

const MovieTable = (props) => {
    return (
        <div>
            <legend>Список фильмов</legend>
            <Table {...props} />
        </div>
    )
};

const mapStateToProps = (state) => {
    const tableFilter = state.tableFilter;
    return {
        data: state.movies,
        ...tableFilter
    }};
const mapDispatchToProps = (dispatch) => bindActionCreators({filterBy, sortBy}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)