import React, { ChangeEvent, FormEvent } from "react";
import { Component, ReactNode } from "react";
import { pushDataIntoServer } from "../service/menu";
import '../styles/ExpenseTracker.css'

type Props = {
    onTrue: any,
    onClose: any
}

type State = {
    payeeName: string,
    product: string,
    price: number,
    setDate: string
}

class ExpenseTracker extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            payeeName: "",
            product: "",
            price: 0,
            setDate: this.setDefaultDate()
        }

    this.setPayee = this.setPayee.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.loggedDate = this.loggedDate.bind(this);
    }

    setPayee = (event : ChangeEvent<HTMLSelectElement>) => {
        this.setState(
            {
                payeeName: event.target.value
            }
        )
    }

    setProduct = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {
                product: event.target.value
            }
        )
    }

    setPrice = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {
                price: parseInt(event.target.value)
            }
        )
    }

    loggedDate = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {
                setDate: event.target.value
            }
        )
    }

    setDefaultDate = () => {
        const today = new Date();
        return (
            today.getFullYear()+
            "-"+("0"+today.getMonth()+1).slice(-2)+
            "-"+("0"+today.getDate()).slice(-2)
        )
    }

    submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const finalData = {
            ...this.state,
        }
        const data = await pushDataIntoServer(finalData)
        console.log(data)
        this.props.onTrue();
    }

    render(): ReactNode {
        const element = (
            <div id="form-overlay">
                <section id="form">
                    <header className="section" id="header">
                        <h1>Add New Item</h1>
                        <p>
                            <span id="instruction">Read the below instructions before proceeding:</span>
                            <br/>
                            Make sure you fill all the fields where * is provided
                        </p>
                    </header>
                    <form onSubmit={this.submitHandler}>

                        <article className="section form-section">
                            <p className="section-text">Names<span className="star">*</span></p>
                            <select name="Name" id="name" required 
                                value={this.state.payeeName} onChange={this.setPayee}
                            >
                                <option value="" defaultChecked>Choose</option>
                                <option value="Rahul">Rahul</option>
                                <option value="Ramesh">Ramesh</option>
                            </select>
                        </article>

                        <article className="section form-section">
                            <p className="section-text">Product Purchased<span className="star">*</span></p>
                            <input className="blank-space" type="text" required value={this.state.product} onChange={this.setProduct}/>
                        </article>

                        <article className="section form-section">
                            <p className="section-text">Price<span className="star">*</span></p>
                            <input className="blank-space" type="number" required value={this.state.price} onChange={this.setPrice}/>
                        </article>

                        <article className="section form-section">
                            <p className="section-text">Date<span className="star">*</span></p>
                            <input type="date" className="blank-space" required value={this.state.setDate} onChange={this.loggedDate}/>
                        </article>

                        <button type="button" className="form-button" onClick={this.props.onClose}>Close</button>
                        <button className="form-button">Submit</button>
                    </form>
                </section>
            </div>
        )

        return element
    }
}

export default ExpenseTracker