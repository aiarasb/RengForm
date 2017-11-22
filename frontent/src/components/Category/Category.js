import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'
import { Col, Panel, Row } from 'react-bootstrap'
import LectureList from '../Lecture/LectureList'
import LectureForm from '../Lecture/LectureForm'
import { fetchIfNeeded } from '../../actions/lectures'
import _ from 'lodash'

class Category extends Component {

  componentDidMount() {
    const { dispatch, category } = this.props
    dispatch(fetchIfNeeded(category.id))
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { dispatch, category } = this.props
      dispatch(fetchIfNeeded(category.id))
    }
  }

  render() {
    const { id, title, description } = this.props.category
    const { lectures, isFetching } = this.props
    const header = (<h3>{title}</h3>)
    return (
      <div>
        <Row>
          <Col md={4}>
            <Panel header={header}>
              <div>{description}</div>
            </Panel>
          </Col>
          <Col md={8}>
            <Panel header={(<h3>Užsiėmimai</h3>)}>
              {isFetching && (!lectures || lectures.length === 0) && <h3>Kraunama...</h3>}
              {!isFetching && (!lectures || lectures.length === 0) && <h3>Užsiėmimų nėra</h3>}
              {lectures && lectures.length > 0 &&
                <LectureList lectures={lectures}/>}
                <LectureForm categoryId={id}/>
            </Panel>
          </Col>
        </Row>
      </div>
    )
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  lectures: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const category = _.find(state.categories.items, {id: parseInt(ownProps.match.params.id, 10)})
  const {
    isFetching,
    items: lectures
  } = state.lectures[category.id] || {
    isFetching: true,
    items: []
  }

  return {
    category,
    lectures,
    isFetching
  }
}

export default withRouter(connect(mapStateToProps)(Category));