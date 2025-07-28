import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { TeamContextProvider } from "./context/TeamContext";
import { ModalProvider } from "./store/ModalContext";

function App() {
  return (
    <TeamContextProvider>
      <ModalProvider>
        <div className="flex h-screen w-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col w-screen">
            <Header />
            <main className="flex-1 overflow-auto">
              <TaskList />
            </main>
          </div>
        </div>
      </ModalProvider>
    </TeamContextProvider>
  );
}

export default App;
