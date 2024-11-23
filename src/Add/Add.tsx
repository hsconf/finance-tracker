import {useAppDispatch, useAppSelector} from "../app/hooks";
import {ChangeEvent, useState} from "react";
import {Category} from "../types";
import {createCategory} from "../app/finance/finance";

const Add = () => {
    const dispatch = useAppDispatch();
    const {modal, categoryModal} = useAppSelector((state) => state.finance);
    const [category, setCategory] = useState<Category>({
        type: '',
        name: '',
    });

    const onHandleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCategory(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (categoryModal) {
            dispatch(createCategory(category));
        } else {
            alert('Fuck you')
        }
    };

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
                <div className="form-group">
                    <label className="mb-1">
                        Type
                    </label>
                    <select name="type" id="type" onChange={onHandleChange} value={category.type} className="form-control">
                        <option value="">Select type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                {
                    categoryModal ? (
                           <div>
                               <label>Name</label>
                               <input type="text" name="name" id="name" onChange={onHandleChange} value={category.name} className="form-control"/>
                           </div>
                    ) : (
                     <div>
                             <div className="form-group">
                                 <label className="mb-1">
                                     Category
                                 </label>
                                 <select name="category" id="category" className="form-control">
                                     <option value="">Select category</option>
                                     <option value="salary">Salary</option>
                                     <option value="shopping">Shopping</option>
                                 </select>
                             </div>
                             <div className="form-group">
                                 <label>
                                     Amount
                                 </label>
                                 <input type="text" className="form-control" name="amount" id="amount"/>
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
