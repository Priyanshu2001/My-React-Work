import React, {useState} from 'react';
import Card from "../UI/Card";
import ExpensesList from './ExpensesList';
import ExpensesFilter from '../ExpenseFilter/ExpensesFilter';
import "./Expenses.css";
import ExpensesChart from './ExpensesChart';

function Expenses(props){
  const[selectedFilter, setSelectedFilter] = useState("2022");

  const changeFilterHandler = (year) =>{
    setSelectedFilter(year);
  }

  const filteredExpenses = props.items.filter(expense =>{
    return expense.date.getFullYear().toString() === selectedFilter;
  });


 return(
    <Card className="expenses">
    <ExpensesFilter selected={selectedFilter}   onChangeFilter = {changeFilterHandler}/>
    <ExpensesChart expenses = {filteredExpenses} />
    <ExpensesList items = {filteredExpenses}/>
    </Card>
 );
}

export default Expenses;