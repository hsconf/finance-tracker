import {useAppDispatch, useAppSelector} from "../app/hooks";
import {ChangeEvent, useEffect, useState} from "react";
import {Category, Transaction} from "../types";
import {createCategory, createTransaction, fetchCategories, openCategoryModal, openModal} from "../app/finance/finance";
import Loader from "../components/Loader/Loader";

const Add = () => {
    const dispatch = useAppDispatch();
    const {modal, categoryModal, categories, isLoading} = useAppSelector((state) => state.finance);
    const [category, setCategory] = useState<Category>({
        type: '',
        name: '',
    });

    const date = new Date();

    const [transactions, setTransactions] = useState<Transaction>({
        category: '',
        amount: '',
        date: `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`,
    });

    const onHandleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (categoryModal) {
            setCategory(prev => ({...prev, [event.target.name]: event.target.value}));
        } else {
            setTransactions(prev => ({...prev, [event.target.name]: event.target.value}));
        }
    }

    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (categoryModal) {
            dispatch(createCategory(category));
            dispatch(openCategoryModal(false))
            dispatch(openModal(false))
        } else {
            dispatch(createTransaction(transactions));
            dispatch(openModal(false));
        }
    };

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    return modal && (
        <div
            className="border border-1 border-primary rounded p-5 fw-medium fs-5"
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#89bc92',
            }}
        >
            <form onSubmit={onSubmit} className="d-flex flex-column mx-auto justify-content-center py-3">

                {
                    categoryModal ? (
                        <>
                            <div className="form-group">
                                <label className="mb-1">
                                    Type
                                </label>
                                <select name="type" id="type" onChange={onHandleChange} value={category.type} className="form-control" required >
                                    <option value="">Select type</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                           <div>
                               <label>Name</label>
                               <input type="text" name="name" id="name" onChange={onHandleChange} value={category.name} className="form-control" required />
                           </div>
                        </>
                    ) : (
                     <div>
                             <div className="form-group">
                                 <label className="mb-1">
                                     Category
                                 </label>
                                 <select name="category" id="category" className="form-control" onChange={onHandleChange} value={transactions.category} required>
                                     <option value="">Select category</option>
                                     {categories.map(category => (
                                         <option key={category.id} value={category.id} className={category.type === 'expense' ? 'text-danger' : 'text-success'}>{category.name}</option>
                                     ))}
                                 </select>
                             </div>
                             <div className="form-group">
                                 <label>
                                     Amount
                                 </label>
                                 <input type="number" className="form-control" name="amount" id="amount" onChange={onHandleChange} value={transactions.amount} required/>
                             </div>
                     </div>
                    )
                }

                <button className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    );
};

export default Add;
