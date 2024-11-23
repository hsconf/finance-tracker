import {useAppDispatch, useAppSelector} from "../app/hooks";
import {useEffect} from "react";
import {deleteTransaction, fetchCategories, fetchTransactions} from "../app/finance/finance";

const Home = () => {

    const dispatch = useAppDispatch();
    const {categories, transactions, isDeleting} = useAppSelector(state => state.finance);

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch, isDeleting]);

    const updatedTransactions = transactions.map(transaction => {
        const category = categories.find(cat => cat.id === transaction.category);

        return {
            ...transaction,
            category: category?.name || "Unknown Category",
            type: category?.type
        };
    });

    return (
        <div className="mt-5">
            {
                updatedTransactions.map((item) => (
                    <div key={item.id} className="row border border-1 border-primary rounded p-2 mb-2 align-items-center">
                        <div className="col-4">{item.date}</div>
                        <div className="col-4">{item.category}</div>
                        <div className={item.type === 'income' ? 'col-2 text-success' : 'col-2 text-danger'}>{item.type === 'income' ? `+${item.amount}` : `-${item.amount}`}</div>
                        <div className="col-2">
                            <button onClick={() => dispatch(deleteTransaction(item.id))}>Delete</button>
                            <button>Edit</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;