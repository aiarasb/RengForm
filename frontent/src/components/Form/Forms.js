import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormList from './FormList'
import Form from './Form'
import { fetchIfNeeded } from '../../actions/forms'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Forms extends Component { 

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchIfNeeded())
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { dispatch } = this.props
      dispatch(fetchIfNeeded())
    }
  }

  render() {
    const { forms, isFetching } = this.props
    if (!this.props.match.params.id) {
      return (
        <div>
          <h2>Formos</h2>
          {isFetching && (!forms || forms.length === 0) && <h2>Kraunama...</h2>}
          {!isFetching && (!forms || forms.length === 0) && <h2>Formų nėra</h2>}
          {forms && forms.length > 0 &&
            <FormList forms={forms}/>}
        </div>
      )
    }

    return (
      <Form id={this.props.match.params.id}/>
    )
  }
}

Forms.propTypes = {
  forms: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  const {
    isFetching,
    items: forms
  } = state.forms || {
    isFetching: true,
    items: []
  }

  return {
    forms,
    isFetching
  }
}

export default withRouter(connect(mapStateToProps)(Forms))