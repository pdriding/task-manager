import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { TeamContextProvider } from "./context/TeamContext";

function App() {
  return (
    <>
      <div>
        <TeamContextProvider>
          <Header />
          <TaskList />
        </TeamContextProvider>
      </div>
    </>
  );
}

export default App;
