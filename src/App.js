import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Customers from './Components/Customers';
import Trainings from './Components/Trainings';
import Calendar from './Components/Calendar';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>          
          <Typography variant="h6">
             Personal Trainer
          </Typography>            
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Link to="/Customers">Customers</Link>{' '}
          <Link to="/Trainings">Trainings</Link>{' '}
          <Link to="/Calendar">Calendar</Link>{' '}
          <Switch>
            <Route exact path="/" component={Customers}/>
            <Route path="/Customers" component={Customers}/>
            <Route path="/Trainings" component={Trainings}/>
            <Route path="/Calendar" component={Calendar}/>
            <Route render={() =><h1>Page not found</h1>}/>
        </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
