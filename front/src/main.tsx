
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./main.css"
import {BrowserRouter as Router} from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Mobile from "@/Mobile.tsx";
ReactDOM.createRoot(document.getElementById('root')!).render(
    <>{isMobile===false?
    <Router>
    <App />
    </Router>:<><Mobile/></>}</>
)
