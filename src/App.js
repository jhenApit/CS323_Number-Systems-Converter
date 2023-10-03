import './App.css';
import FormConverter from './form/FormConverter';

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#B4B4B3",
      }}
    >
      <FormConverter />
    </div>
    
  );
}

export default App;
