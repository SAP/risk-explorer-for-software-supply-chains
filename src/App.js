import React,{Component} from 'react'
import Attacktree from "./pages/attacktree/Attacktree";
import Home from "./pages/home/Home"
import "./app.css"
import { Route, Routes} from "react-router-dom";
import Attackvectors from './pages/attackvectors/Attackvectors';
import Safeguards from './pages/safeguards/Safeguards';
import References from './pages/references/References';
import Documentation from './pages/documentation/Documentation'


class App extends Component {
  
 
  render(){
  return (
    <div className="App">
      
     
         <Routes>
         <Route exact path="/" element={<Home/>}/>
        <Route exact path="/attacktree" element={<Attacktree/>}/>
        <Route exact path="/attackvectors" element={<Attackvectors/>}/>
        <Route exact path="/safeguards" element={<Safeguards/>}/>
        <Route exact path="/references" element={<References/>}/>
        <Route exact path="/documentation" element={<Documentation/>}/>
            
          </Routes>
    </div>
    
  );
}}

export default App;
