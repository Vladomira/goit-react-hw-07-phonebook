import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import shortid from "shortid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { operations, contactsSelectors } from "../../redux";

function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector(contactsSelectors.getContacts);
  const dispatch = useDispatch();

  const doubleName = (name) =>
    contacts.find((el) => {
      return el.name === name;
    });
  const doubleNumber = (number) =>
    contacts.find((el) => {
      return el.number === number;
    });

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    if (doubleName(name)) {
      return alert(`This ${name} already exist in database`);
    }
    if (doubleNumber(number)) {
      return alert(`This ${number} already exist in database`);
    }
    dispatch(operations.addContact({ name, number }));

    toast.success(`${name} successfully added ;)`);
    scroll();

    return;
  };
  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      // top: 1000,
      behavior: "smooth",
    });
  };
  const reset = () => {
    setName("");
    setNumber("");
  };
  return (
    <>
      <form className="form__box" onSubmit={handleSubmit}>
        <div className="form__label-box">
          <label htmlFor={shortid.generate()} className="form__label">
            Name
          </label>
          <input
            className="form__input"
            value={name}
            onChange={handleChange}
            id={shortid.generate()}
            type="text"
            name="name"
            data-action="name"
            pattern="^[a-zA-Z??-????-??]+(([' -][a-zA-Z??-????-?? ])?[a-zA-Z??-????-??]*)*$"
            title="?????? ?????????? ???????????????? ???????????? ???? ????????, ??????????????????, ???????? ?? ????????????????. ???????????????? Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan ?? ??. ??."
            required
          />
        </div>
        <label className="form__label-box">
          <span className="form__label"> Number</span>
          <input
            className="form__input"
            onChange={handleChange}
            id={shortid.generate()}
            value={number}
            type="tel"
            name="number"
            data-action="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="?????????? ???????????????? ???????????? ???????????????? ???? ????????, ?? ?????????? ?????????????????? ??????????????, ????????, ?????????????? ????????????, ?? ?????????? ???????????????????? ?? +"
            required
          />
        </label>

        <div className="form__btn-thumb">
          <button
            className="form__addBtn"
            type="submit"
            disabled={!number || !name}
          >
            Add contact
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default ContactForm;
