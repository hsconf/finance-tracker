import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {openCategoryModal, openModal} from "../../app/finance/finance";

const ToolBar = () => {
    const {} = useAppSelector(state => state.finance);
    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(openModal(false));
    }

    return (
        <nav className="navbar bg-body-tertiary border-bottom border-2">
            <div className="container">
                <NavLink to="/" onClick={closeModal} className="navbar-brand fw-bold">Finance tracker</NavLink>

                <NavLink to="/categories" onClick={closeModal} className="nav-link ms-auto me-2">Categories</NavLink>
                |
                <a onClick={() => {
                    dispatch(openModal(true));
                    dispatch(openCategoryModal(false))
                }} className="nav-link ms-2" style={{cursor: 'pointer'}}>Add</a>
            </div>
        </nav>
    );
};

export default ToolBar;