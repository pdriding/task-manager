import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { TeamContextProvider } from "./context/TeamContext";
import { ModalProvider } from "./store/ModalContext";

function App() {
  return (
    <>
      <div>
        {" "}
        <TeamContextProvider>
          <ModalProvider>
            <Header />
            <TaskList />
          </ModalProvider>
        </TeamContextProvider>
      </div>
    </>
  );
}

export default App;
