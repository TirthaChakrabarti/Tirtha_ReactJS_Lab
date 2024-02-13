import React, { useEffect, useState } from "react";
import IDataList from "../model/IDataList";
import { getDataFromServer } from "../service/menu";
import { error } from "console";
import ExpenseTracker from "./ExpenseTracker";
import '../styles/ShowData.css'

function ShowData() {

    const [items, setItems] = useState<IDataList[]>([]);
    const [sum, setSum] = useState<number|null>();
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [ShowForm, setShowForm] = useState<boolean>(false);
    const [error, setError] = useState<Error|null>(null)

    useEffect(() => {
        const fetchItem = async() => {
            try {
                const data = await getDataFromServer();
                setItems(data);
                console.log(data)
                setSum(data.reduce((res, each) => (res = res + each.price), 0));
                shares(data)
            } catch (error : any) {
                setError(error)
            }
        }

        fetchItem();
    
    }, [ShowForm])

    var rahulSpent1 : number = 0;
    var rameshSpent1 : number = 0;

    const shares = (data : IDataList[]) => {
        data.map((each) =>
        each.payeeName === "Rahul" ? (rahulSpent1 = rahulSpent1 + each.price) 
        : (rameshSpent1 = rameshSpent1 + each.price)
        );
        setRahulSpent(rahulSpent1);
        setRameshSpent(rameshSpent1)
    }

    const success = () => {
        setShowForm(false);
    }

    const cancel = () => {
        setShowForm(false);
    }

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {ShowForm &&
            (<div className="form">
                <ExpenseTracker onTrue={success} onClose={cancel}></ExpenseTracker>
            </div>)
            }
            <div id="tracker-header">
                <div className="date header-details">Date</div>
                <div className="product header-details">Product Purchased</div>
                <div className="price header-details">Price</div>
                <div className="payee header-details">Payee</div>
            </div>

            {
                items &&
                items.map((user , ind) => (
                    <div id="tracker-data" key={ind}>
                        <div className="data-date data-details">{user.setDate}</div>
                        <div className="data-product data-details">{user.product}</div>
                        <div className="data-price data-details">{user.price}</div>
                        <div className={`data-payee data-details" ${user.payeeName}`}>{user.payeeName}</div>
                    </div>
                ))
            }
            <hr/>
            <div id="total-calculation">

                <div className="total-calculation-rows">
                    <div className="text">Total:</div>
                    <div className="Data sum-data">{sum}</div>
                </div>

                <div className="total-calculation-rows">
                    <div className="text">Rahul spent:</div>
                    <div className="Data Rahul-data">{rahulSpent}</div><br/>
                </div>

                <div className="total-calculation-rows">
                    <div className="text">Ramesh spent:</div>
                    <div className="Data Ramesh-data">{rameshSpent}</div><br/>
                </div>

                <div className="total-calculation-rows">
                    <div className="pay">
                        {rahulSpent > rameshSpent ? "Pay Rahul:" : "Pay Ramesh:"}    
                    </div>
                    <div className="Data pay-data">{" "}
                            {Math.abs((rahulSpent - rameshSpent)/2)}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ShowData;