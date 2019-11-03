import React, { Component } from 'react';
import { Card,CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

export default class DishDetail extends Component {
    renderDish(dish){
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
    renderComments(dish){
        if(dish != null) {
            return this.props.selectedDish.comments.map((comment) => {
                return (
                    <div className="container">
                        <div key={comment.id} >
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    </div>
                )
            });
        } else {
            return (<div></div>);
        }
    }
    render() {
        
        return (
            <div className="row">
                {this.renderDish(this.props.selectedDish)}
                <div className="col-12 col-md-5 m-1 list-unstyled">
                <div><h4>Comments</h4></div>
                    {this.renderComments(this.props.selectedDish)}
                </div>
            </div>
        );
    };
}