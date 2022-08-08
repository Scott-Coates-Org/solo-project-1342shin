import Counter from './components/Counter'
import logo from './logo.svg'
import './App.css'
import Login from './components/login/Login'
import { Calender } from './components/Calendar'

function App() {
	return (
		<div className="App">
			<Calender/>
			<Login /> 
		</div>
	)
}

export default App
