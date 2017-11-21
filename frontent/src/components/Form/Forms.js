import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormList from './FormList'
import { fetchIfNeeded } from '../../actions/forms'
import PropTypes from 'prop-types'

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

export default connect(mapStateToProps)(Forms)