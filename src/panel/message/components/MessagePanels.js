import React from 'react'
import { formattedDateTime } from '../shared/formatter'
import styles from '../../styles.module.css'


// IncomingMessage.js

// const IncomingMessage = ({ message }) => {
//     // Format the message date as a human-readable string
//     const messageDate = new Date(message.date).toLocaleString();
//
//     return (
//         <div className="flex items-end justify-start">
//             <img src="https://via.placeholder.com/50" alt="avatar" className="h-10 w-10 rounded-full object-cover mr-2" />
//             <div className="bg-gray-300 p-2 m-2 rounded-lg">
//                 <div className="text-sm text-black max-w-xs">{message.text}</div>
//                 <div className="text-xs text-right text-gray-500">{messageDate}</div>
//             </div>
//         </div>
//     );
// };
//
// export default IncomingMessage;

export function IncomingMessage(props) {
  return (


<div>
    <div style={{float: 'left'}}>



    <div className='flex items-end justify-end flex-row-reverse space-x-2 space-x-reverse mt-4 mb-4'>


        <img src="https://via.placeholder.com/50" alt="avatar" className="h-10 w-10 rounded-full object-cover"/>

      <div className='bg-blue-500 p-2 rounded-lg text-white'>
          <div className="p-4">
          <div className="text-sm text-black max-w-xs">{props.message}</div>
          <div className="text-xs text-right text-gray-500">
          {' '}
          {formattedDateTime(props.time)}{' '}
          </div>
        </div>
      </div>
    </div>

    </div>
    <div style={{clear:"both"}}></div>
</div>
    //
    // <div className={styles.incoming_msg}>
    //   <div className={styles.incoming_msg_img}>
    //
    //   </div>
    //   <div className={styles.incoming_msg_text}>
    //     <div className={styles.received_withd_msg}>
    //       <p>{props.message}</p>
    //       <span className={styles.time_date}>
    //         {' '}
    //         {formattedDateTime(props.time)}{' '}
    //       </span>
    //     </div>
    //   </div>
    // </div>
  )
}



export function OutGoingMessage(props) {
  return (



      <div>
          <div style={{float: 'right'}}>



      <div className='flex  items-start justify-start flex-row space-x-2 space-x-reverse mt-4  mb-4' >




          <div className='bg-blue-500 p-4 rounded-lg text-white'>

                  <div className="text-sm text-black max-w-xs p-2">{props.message}</div>
                  <div className="text-xs text-right text-gray-50">
                      {' '}
                      {formattedDateTime(props.time)}{' '}
                  </div>

          </div>
          <img src="https://via.placeholder.com/50" alt="avatar" className="h-10 w-30 rounded-full object-cover"/>
      </div>
          </div>
          <div style={{clear:"both"}}></div>
      </div>
  )
}

//
//
// <div className="flex items-end justify-end">
//     <div className="bg-blue-500 p-2 m-2 rounded-lg text-white">
//         <div className="text-sm max-w-xs">{props.message}</div>
//         <div className="text-xs text-right">
//             {' '}
//             {formattedDateTime(props.time)}
//         </div>
//     </div>
//     <img src="https://via.placeholder.com/50" alt="avatar" className="h-10 w-10 rounded-full object-cover ml-2" />
// </div>