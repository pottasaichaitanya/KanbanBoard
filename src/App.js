import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import DropdownMenu from './components/DropdownMenu';

function App() {
    
    const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'status');
    const [sorting, setSorting] = useState(() => localStorage.getItem('sorting') || 'priority');
    const [tickets, setTickets] = useState([]);
    const [users,setUsers]=useState([{}]);
    
    useEffect(() => {
      fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
          .then((response) => {
              return response.json(); 
          })
          .then((data) => {
              if (data && data.tickets && data.users) {
                  setTickets(data.tickets);
                  setUsers(data.users);
              } 

              else {
                  setTickets([]); 
                  setUsers([]);
              }
          })
          .catch((error) => {
              console.error('Error fetching tickets:', error);
              setTickets([]); 
          });
  }, []);
  
   

    useEffect(() => {
        localStorage.setItem('grouping', grouping);
    }, [grouping]);

    useEffect(() => {
        localStorage.setItem('sorting', sorting);
    }, [sorting]);

    return (
        <div className="App">
            <DropdownMenu
                grouping={grouping} 
                setGrouping={setGrouping} 
                sorting={sorting} 
                setSorting={setSorting} 
            />
            <KanbanBoard tickets={tickets} users={users} grouping={grouping} sorting={sorting} />
        </div>
    );
}

export default App;