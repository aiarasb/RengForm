import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { withRouter, Redirect } from 'react-router-dom'
import { Col, Panel, Row, Button, ButtonGroup } from 'react-bootstrap'
import LectureList from '../Lecture/LectureList'
import LectureForm from '../Lecture/LectureForm'
import CategoryForm from '../Category/CategoryForm'
import { fetchIfNeeded } from '../../actions/lectures'
import { remove } from '../../actions/categories'
import _ from 'lodash'

class Category extends Component {
  state = {
    navigate: false
  }

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

  delete = () => {
    const { dispatch, category } = this.props
    dispatch(remove(category))
    this.setState({navigate: true})
  }

  openForm = () => {
    this.refs.formModal.getWrappedInstance().open()
  }

  openLectureForm = () => {
    this.refs.lectureFormModal.getWrappedInstance().open()
  }

  render() {
    const { id, title, description, event } = this.props.category
    const { lectures, isFetching } = this.props
    const header = (<h3>{title}</h3>)
    const { navigate } = this.state

    if (navigate) {
      return <Redirect to={"/events/"+event.id} push={true} />
    }

    return (
      <div>
        <Row>
          <Col md={4}>
            <Panel header={header} footer={(
              <div>
                <ButtonGroup>
                  <Button bsStyle="primary" onClick={this.openForm}>Redaguoti</Button>
                  <Button bsStyle="danger" onClick={this.delete}>Pašalinti</Button>
                </ButtonGroup>
              </div>
            )}>
              <div>{description}</div>
            </Panel>
          </Col>
          <Col md={8}>
            <Panel header={(<h3>Užsiėmimai</h3>)} footer={(<Button bsStyle="primary" onClick={this.openLectureForm}>Naujas Užsiėmimas</Button>)}>
              {isFetching && (!lectures || lectures.length === 0) && <h3>Kraunama...</h3>}
              {!isFetching && (!lectures || lectures.length === 0) && <h3>Užsiėmimų nėra</h3>}
              {lectures && lectures.length > 0 &&
                <LectureList lectures={lectures}/>}
            </Panel>
          </Col>
        </Row>
        <CategoryForm eventId={this.props.category.event.id} category={this.props.category} ref="formModal"/>
        <LectureForm categoryId={id} ref="lectureFormModal"/>
      </div>
    )
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
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