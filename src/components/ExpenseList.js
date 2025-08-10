import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses } from '../services/expenses';
import ExpenseForm from './ExpenseForm';
import { useMsal } from '@azure/msal-react';

const ExpenseList = ({ expense, setIsEditing }) => {
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expensesReducer.expenses);
    const { instance, accounts } = useMsal();

    useEffect(() => {
        if (accounts.length > 0) {
            console.log("About to call GetExpenses with authentication");
            GetExpenses(dispatch, instance, accounts);
        }
    }, [dispatch, instance, accounts]);

    console.log("Current expenses from Redux:", expenses);

    return (
        <div>
            {/* Display expenses from Redux store */}
            {expenses && expenses.length > 0 ? (
                expenses.map(e => 
                    <div key={e.id} style={{ marginBottom: '1rem' }}>
                        <ListRow expense={e} setIsEditing={setIsEditing} />
                    </div>
                )
            ) : (
                <div>No expenses found</div>
            )}
        </div>
    );
};

export default ExpenseList;

const ListRow = ({ expense }) => {
    const [isEditing, setIsEditing] = useState(false);

    return isEditing
        ? <ExpenseForm expense={expense} setIsEditing={setIsEditing} />
        : <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>{expense.description}</span>
                <span>${expense.amount}</span>
                <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            </div>
            <hr />
        </div>
};