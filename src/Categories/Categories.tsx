import {useAppDispatch, useAppSelector} from "../app/hooks";
import {fetchCategories, openCategoryModal, openModal} from "../app/finance/finance";
import {useEffect} from "react";

const Categories = () => {
    const dispatch = useAppDispatch();
    const {categoryModal, categories} = useAppSelector(state => state.finance);

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);

    return (
        <div>
            <div className="d-flex justify-content-between mt-3">
                <b className="fs-5">
                    Categories
                </b>
                <button className="btn btn-primary shadow" disabled={categoryModal} onClick={() => {
                    dispatch(openCategoryModal(true))
                    dispatch(openModal(true));
                }}>Add</button>
            </div>


            <div className="mt-5">
                {categories.map(category => (
                    <div className="row border border-2 rounded mb-2 p-3 align-items-center" key={category.id}>
                        <b className="col-6">{category.name}</b>
                        <div className="col-2">{category.type}</div>
                        <div className="col-4 d-flex">
                            <button className="ms-auto">Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;