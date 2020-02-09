import React, { Component } from 'react';
import { Card,CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Row, Col, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
    }
    toggleCommentModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleCommentForm(values) {
        alert('submitted form' + JSON.stringify(values));
        this.toggleCommentModal();
        this.props.addComment(this.props.dishId, values.rating, values.yourname, values.comment);
    }
    render() {
        return (
            <div>
                <div className="ml-auto">
                    <Button outline onClick={this.toggleCommentModal}>
                        <span className="fas fa-pencil-alt">Submit Comment</span>
                    </Button>
                </div>
                <div className="col-md-12">
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleCommentModal} >
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentForm(values)}>
                            <Row className="form-group">
                                <Label className="ml-3" htmlFor="rating">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" 
                                            className="form-control"
                                            name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label className="ml-3" htmlFor="yourname">Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" name="yourname" className="form-control"
                                    validators={{
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors model=".yourname" className="text-danger" show="touched"
                                        messages={{
                                            minLength: 'Should be greater than or equal to 3 Characters. ',
                                            maxLength: 'Should be less than or equal to 15 Characters. '
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label className="ml-3" htmlFor="comment">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment" 
                                    className="form-control" Rows="6" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Button className="ml-3" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            </div>
        );
    }
} 

    function RenderDish({dish}){
        if(dish != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText> 
                        </CardBody>
                    </Card>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
    function RenderComments({comments,addComment,dishId}){
        if(comments != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
                        <CommentForm dishId={dishId} addComment={addComment} />
                    </ul>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
    const DishDetail = (props) => {
        if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id} />
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
        
    };

export default DishDetail;