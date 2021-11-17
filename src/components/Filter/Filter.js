import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/contacts-actions";
import { getFiltredValue } from "../../redux/contactsSelectors";

const Filter = () => {
  const value = useSelector(getFiltredValue);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <h3 className="contacts__title-find">Find contacts by name</h3>
        <label>
          <input
            className="contacts__input"
            type="text"
            defaultValue={value}
            onChange={(e) => dispatch(actions.filtredContacts(e.target.value))}
          ></input>
        </label>
      </div>
    </>
  );
};
Filter.propTypes = {
  filtredContacts: PropTypes.func,
  value: PropTypes.string,
};
export default Filter;
