import React from 'react';
import Ticket from './Ticket';
import Todo from '../assets/Todo.svg';
import Img1 from '../assets/1.svg';
import Img2 from '../assets/2.svg';
import Img3 from '../assets/3.svg';
import Img4 from '../assets/4.svg';
import Img5 from '../assets/No-priority.svg';
import In_Progress from '../assets/in-progress.svg';
import Backlog from '../assets/Backlog.svg';
import add from '../assets/add.svg';
import dotmenu from '../assets/3 dot menu.svg';
import UserIcon from './UserIcon';

function KanbanBoard({ tickets, users, grouping, sorting }) {
    const groupedTickets = groupTickets(tickets, grouping);
    const sortedGroupedTickets = sortGroupedTickets(groupedTickets, sorting);

    return (
        <div className="kanban-board">
            {Object.keys(sortedGroupedTickets).map(group => (
                <div key={group} className="kanban-column">
                    <div className="kanban-header">
                        <h3>
                            {getGroupTitle(group, grouping, users,tickets)} 
                        </h3>
                        <div>
                            <span><img src={add} alt="Add" /></span>
                            <span><img src={dotmenu} alt="Options" /></span>
                        </div>
                    </div>
                    {sortedGroupedTickets[group].map(ticket => (
                        <Ticket key={ticket.id} users={users} ticket={ticket} grouping={grouping} />
                    ))}
                </div>
            ))}
        </div>
    );
}

function groupTickets(tickets, grouping) {
    return tickets.reduce((acc, ticket) => {
        let key;
        if (grouping === 'user') {
            key = ticket.userId;  
        } else if (grouping === 'status') {
            key = ticket.status; 
        } else if (grouping === 'priority') {
            key = ticket.priority;  
        }
        
        if (!acc[key]) acc[key] = [];
        acc[key].push(ticket);
        return acc;
    }, {});
}

function sortGroupedTickets(groupedTickets, sorting) {
    const sorted = {};
    for (let key in groupedTickets) {
        sorted[key] = groupedTickets[key].sort((a, b) => {
            if (sorting === 'priority') return b.priority - a.priority;
            if (sorting === 'title') return a.title.localeCompare(b.title);
            return 0;
        });
    }
    return sorted;
}

function getGroupTitle(group, grouping, users,tickets) {
        let ticketCount = 0;
        if (grouping === 'user') {
        ticketCount = tickets.filter(ticket => ticket.userId === group).length;
    } else if (grouping === 'status') {
        ticketCount = tickets.filter(ticket => ticket.status === group).length;
    } else if (grouping === 'priority') {
        ticketCount = tickets.filter(ticket => ticket.priority === group).length;
    }
    if (grouping === 'user') {
        const user = users.find(user => user.id === group);
        if (user) {
            return (
                <div className="group-title-container">
                    <UserIcon name={user.name} available={user.available} />
                    <span className="user-name">{user.name}</span>
                    <span style={{color: 'gray', marginLeft: '5px'}}>{ticketCount}</span>

                </div>
            );
        } else {
            return 'Unknown User';
        }
    }

    if (grouping === 'status') {
        let imageSrc;
        switch (group) {
            case 'Todo': imageSrc = Todo; break;
            case 'In progress': imageSrc = In_Progress; break;
            case 'Backlog': imageSrc = Backlog; break;
            default: imageSrc = Todo; break;
        }
        return (
            <div className="group-title-container">
                <img src={imageSrc} alt={group} style={{ width: '20px', marginRight: '8px' }} />
                <span>{group.charAt(0).toUpperCase() + group.slice(1)}</span>
                <span style={{color: 'gray', marginLeft: '5px'}}>{ticketCount}</span>
            </div>
        );
    }

    if (grouping === 'priority') {
        let imageSrc;
        switch (group) {
            
            case '1': imageSrc = Img1; break;
            case '2': imageSrc = Img2; break;
            case '3': imageSrc = Img3; break;
            case '4': imageSrc = Img4; break;
            default: imageSrc = Img5; break;
        }

        return (
            <div className="group-title-container">
                <img src={imageSrc} alt={`Priority ${group}`} style={{ width: '20px', marginRight: '8px' }} />
                <span>{priorityName(group)}</span>
                <span style={{color: 'gray', marginLeft: '5px'}}>{ticketCount}</span>
            </div>
        );
    }

    return null;
}
function priorityName(group) {
    if (group === '0') {
        return 'None'; 
    } else if (group === '1') {
        return 'Low';
    } else if (group === '2') {
        return 'Medium';
    } else if (group === '3') {
        return 'High';
    } else {
        return 'Urgent';
    }
}


export default KanbanBoard;
