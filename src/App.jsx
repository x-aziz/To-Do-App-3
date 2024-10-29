import { useState } from "react";
import sun from "./assets/images/icon-sun.svg";
import moon from "./assets/images/icon-moon.svg";
import Delete from "./assets/images/icon-cross.svg";

function App() {
  const [Tache, setTache] = useState("");
  const [Taches, setTaches] = useState([]);
  const [Counter, setCounter] = useState(0);
  const [filter, setFilter] = useState("All");
  const [isLightTheme, setIsLightTheme] = useState(false); // New state for theme
  const [icon, setIcon] = useState(sun);

  const updateTache = (e) => {
    setTache(e.target.value);
  };

  const addTache = (e) => {
    if (e.key === "Enter" && Tache.trim()) {
      setTaches([...Taches, { text: Tache, completed: false }]);
      setTache("");
      setCounter(Counter + 1);
    }
  };

  const handleBlur = (e) => {
    if (Tache.trim()) {
      setTaches([...Taches, { text: Tache, completed: false }]);
      setTache("");
      setCounter(Counter + 1);
    }
  };

  const deleteTache = (index) => {
    const newTaches = Taches.filter((_, i) => i !== index);
    setTaches(newTaches);
    setCounter(newTaches.filter((t) => !t.completed).length);
  };

  const toggleCompletion = (index) => {
    const newTaches = Taches.map((tache, i) =>
      i === index ? { ...tache, completed: !tache.completed } : tache
    );
    setTaches(newTaches);
    setCounter(newTaches.filter((t) => !t.completed).length);
  };

  const clearCompleted = () => {
    const newTaches = Taches.filter((tache) => !tache.completed);
    setTaches(newTaches);
  };

  const filteredTaches = Taches.filter((tache) => {
    if (filter === "Active") return !tache.completed;
    if (filter === "Completed") return tache.completed;
    return true;
  });

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
    document.body.classList.toggle("light-theme");
    setIcon(!isLightTheme ? moon : sun);
  };

  return (
    <div className={`body ${isLightTheme ? "light-theme" : "dark-theme"}`}>
      <div className="view"></div>
      <div className="container1">
        <section>
          <div className="nav_section">
            <h1>T O D O</h1>
            <img
              src={icon}
              alt="sun icon"
              className="sun"
              onClick={toggleTheme}
            />
          </div>
          <div className="To-do-List">
            <div>
              <form className="mainTache" onSubmit={(e) => e.preventDefault()}>
                <label className="container">
                  <input type="checkbox" checked={false} readOnly />
                  <div className="checkmark"></div>
                </label>
                <input
                  type="text"
                  value={Tache}
                  onChange={updateTache}
                  onKeyDown={addTache}
                  onBlur={handleBlur}
                />
              </form>
            </div>
            <div className="parentOfSubTaches">
              {filteredTaches.map((tache, index) => (
                <div className="subTaches" key={index}>
                  <div className="checkbox_paragraph">
                    <label className="container">
                      <input
                        type="checkbox"
                        checked={tache.completed}
                        onChange={() => toggleCompletion(index)}
                      />
                      <div className="checkmark"></div>
                    </label>
                    <p className={tache.completed ? "completed" : ""}>
                      {tache.text}
                    </p>
                  </div>
                  <button onClick={() => deleteTache(index)}>
                    <img src={Delete} alt="delete icon" />
                  </button>
                </div>
              ))}
              <div className="control">
                <p>{Counter} items left</p>
                <button onClick={() => setFilter("All")}>All</button>
                <button onClick={() => setFilter("Active")}>Active</button>
                <button onClick={() => setFilter("Completed")}>
                  Completed
                </button>
                <button onClick={clearCompleted}>Clear Completed</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
