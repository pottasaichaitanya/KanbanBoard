import React from 'react';
import toDo from '../assets/Todo.svg';
import In_Progress from '../assets/in-progress.svg';
import Backlog from '../assets/Backlog.svg';
import Img1 from '../assets/1.svg';
import Img2 from '../assets/2.svg';
import Img3 from '../assets/3.svg';
import Img4 from '../assets/4.svg';
import Img5 from '../assets/No-priority.svg';
import UserIcon from './UserIcon';
function Ticket({ users,ticket,grouping}) {
    const user = getUserDetails(ticket.userId, users);
    return (
        <div className="ticket-card">
        
            <div className="ticket-header">
                <h4 className="ticket-id">{ticket.id}</h4>
                {
            grouping !== 'user' && (
                    <UserIcon name={user.name} available={user.available} />
                )}
            </div>

            {getTicketTitle(grouping,ticket.status,ticket.title)}
            <span>{ticket.title}</span>
            <div className='tag-container'>
            { getTicketTag(grouping,ticket.tag[0],ticket.priority)}
            <div className="ticket-tag">
                 <img 
                    src={toDo}  
                    alt="Exclamation Icon"
                    className="exclamation-icon"
                />
                <span className="tag-text">{ticket.tag[0]}</span> 
    </div>
            </div>
        </div>
    );
}


function getTicketTitle(grouping,ticket_status,ticket_title){
if(grouping==='user' || grouping==='priority'){
 let imageSrc;
 switch(ticket_status){
    case 'Todo': imageSrc = toDo; break;
    case 'In progress': imageSrc = In_Progress; break;
    case 'Backlog': imageSrc =Backlog ; break;
 }
 return (
    <span className='ticket-title'>
    <img src={imageSrc} alt="" style={{ width: '10px', marginRight: '8px' }} />
    </span>

 )
}
};
function getTicketTag(grouping,ticket_tag,ticket_priority)
{
if(grouping==='user' || grouping==='status')
{
    let imageSrc;
    switch (ticket_priority) {
        case 1: imageSrc = Img1; break;
        case 2: imageSrc = Img2; break;
        case 3: imageSrc = Img3; break;
        case 4: imageSrc = Img4; break;
        default:imageSrc=Img5;break;
    }
 return (
    <>
    <img src={imageSrc} alt="" style={{ width: '10px', marginRight: '8px' }} />
    </>

 )  
}
}
function getUserDetails(ticketUserId, users) {
    const user = users.find((user) => user.id === ticketUserId);
    return user ? { name: user.name, available: user.available } : { name: 'Unknown User', available: false };
}


export default Ticket;
