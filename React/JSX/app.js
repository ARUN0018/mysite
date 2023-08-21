import React, { Component } from 'react';  
class App extends Component{  
   render(){  
    var i = 5;  
    var myStyle = {  
      fontSize: 80,  
      fontFamily: 'Courier',  
      color: '#003300'  
   }  
      return(  
        
         <div>  
            {/*this is a comment*/}
            <h1> Full Stack Python</h1>  
          <h2>Training Institutes</h2>  
            <p>This website contains the best CS tutorials.</p>  
            
            <h1>"hello" {25+20}</h1>;  
            <h1 style = {myStyle}>www.google.com</h1>  
            <h1>{i >= 1 ? 'True!' : 'False!'}</h1>
         </div>  
      );  
   }  
}  
export default App;  